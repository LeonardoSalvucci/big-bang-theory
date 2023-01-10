import { writeFile } from 'fs/promises';
import * as cheerio from 'cheerio';
const response = await fetch('https://www.imdb.com/title/tt0898266/fullcredits/?ref_=tt_cl_sm');
const page = await response.text();

const $ = cheerio.load(page);
const characters = $('.cast_list tr')
let chars = []
for(let char of characters) {
  let aux = {}
  const img =$(char).find('img')[0]
  if(img) {
    aux.name = img.attribs.title || img.attribs.alt,
    aux.photo = img.attribs.src
  }
  const charName = $(char).find('.character a')[0]
  if(charName) aux.charName = charName.children[0].data
  if(Object.keys(aux).length > 0) chars.push(aux)
}
chars = chars.filter(char => char.name && char.charName)
await writeFile('./db/characters.json', JSON.stringify(chars, null, 2))