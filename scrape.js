import { writeFile } from 'fs/promises';
import * as cheerio from 'cheerio';
const response = await fetch('https://www.imdb.com/title/tt0898266/fullcredits/?ref_=tt_cl_sm');
const page = await response.text();

const $ = cheerio.load(page);
const characters = $('.cast_list tr')

// Making a research of urls from the characters photos, we can access to a bigger photo changing last portion of the url with UX266... 
function recreatePhotoURL(url) {
  if(!url) return null
  return url.substring(0, url.lastIndexOf('_V1_') + 4) + 'UX266.jpg'
}

let chars = []
characters.each( (_,char) => {
  let aux = {} 
  const img =$(char).find('.primary_photo img')[0]
  if(img) {
    aux.name = img.attribs.title || img.attribs.alt,
    aux.photo = recreatePhotoURL(img.attribs.loadlate) ?? null
  }
  const charName = $(char).find('.character a')[0]
  if(charName) aux.charName = charName.children[0].data
  if(Object.keys(aux).length > 0) chars.push(aux)
})

await writeFile('./db/characters.json', JSON.stringify(chars, null, 2))