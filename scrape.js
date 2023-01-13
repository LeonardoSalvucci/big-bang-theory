import { writeFile } from 'fs/promises'
import * as cheerio from 'cheerio'
const response = await fetch('https://www.imdb.com/title/tt0898266/fullcredits/?ref_=tt_cl_sm')
const page = await response.text()

const $ = cheerio.load(page)
const characters = $('.cast_list tr')

// Making a research of urls from the characters photos, we can access to a bigger photo changing last portion of the url with UX266...
function recreatePhotoURL (url) {
  if (!url) return null
  return url.substring(0, url.lastIndexOf('_V1_') + 4) + 'UX266.jpg'
}

// Get link of character to get the episodes
/*
from --> toggleSeeMoreEpisodes(this,'nm0301959','tt0898266','actor','ttfc_fc_cl_i1',0,0,'#episodes-tt0898266-nm0301959-actor', toggleSpan); return false;
to -->   https://www.imdb.com/name/nm0301959/episodes/_ajax?title=tt0898266&category=actor&ref_marker=ttfc_fc_cl_i1&start_index=0
*/
function getEpisodesLink (link) {
  const aux = link.split(',')

  const name = aux[1].replace(/'/g, '').trim()
  const title = aux[2].replace(/'/g, '').trim()
  const category = aux[3].replace(/'/g, '').trim()
  const refMarker = aux[4].replace(/'/g, '').trim()
  const startIndex = aux[5]
  return `https://www.imdb.com/name/${name}/episodes/_ajax?title=${title}&category=${category}&ref_marker=${refMarker}&start_index=${startIndex}`
}

function cleanText (text) {
  return text
    .replace(/\t|\n/g, '') // Remove tabs and new lines
    .replace(/-\s/g, '') // Remove initial "- "
    .replace(/\s{2,}/g, ' ') // Replace multiple spaces with one
    .trim()
}

async function processEpisodesLink (url) {
  const response = await fetch(url)
  const episodesHtml = await response.text()
  const $ = cheerio.load(episodesHtml)
  const episodes = $('.filmo-episodes')
  const episodesResp = []
  episodes.each((_, el) => {
    const episode = $(el)
    episodesResp.push({
      text: cleanText(episode.text()),
      url: `https://www.imdb.com${episode.find('a')[0].attribs.href}`
    })
  })
  return episodesResp
}

const chars = []
for (const char of characters) { // Use a for...of loop to iterate over the characters and prevent to be blocked by the server
  const aux = {}

  // Retrieve the photo and the actor name
  const img = $(char).find('.primary_photo img')[0]
  if (img) {
    aux.name = img.attribs.title || img.attribs.alt
    aux.photo = recreatePhotoURL(img.attribs.loadlate) ?? null
  }

  // Char name
  const charName = $(char).find('.character a')[0]
  if (charName) aux.charName = charName.children[0].data

  // Episodes of the actor
  const episodes = $(char).find('.character .toggle-episodes')
  if (episodes.length > 0) {
    aux.episodesLink = getEpisodesLink(episodes[0].attribs.onclick)
    aux.episodes = await processEpisodesLink(aux.episodesLink)
  }
  if (aux.name && aux.charName) chars.push(aux)
}

await writeFile('./db/characters.json', JSON.stringify(chars, null, 2))
