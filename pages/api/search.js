import { promises as fs } from 'fs';
import path from 'path';

function parseCSV(text){
  const rows = []
  let i = 0, len = text.length
  let cur = ''
  let row = []
  let inQuotes = false
  while(i < len){
    const ch = text[i]
    if(inQuotes){
      if(ch === '"'){
        if(i+1 < len && text[i+1] === '"'){ cur += '"'; i += 2; continue }
        inQuotes = false
        i++; continue
      } else {
        cur += ch; i++; continue
      }
    } else {
      if(ch === '"'){ inQuotes = true; i++; continue }
      if(ch === ','){ row.push(cur); cur = ''; i++; continue }
      if(ch === '\r'){ i++; continue }
      if(ch === '\n'){ row.push(cur); rows.push(row); row = []; cur = ''; i++; continue }
      cur += ch; i++; continue
    }
  }
  if(cur !== '' || row.length>0){ row.push(cur); rows.push(row) }
  return rows
}

export default async function handler(req, res){
  const num = req.query.num || req.query.number
  if(!num) return res.status(400).json({ error: 'Missing num parameter. Use ?num=9971920491' })

  try{
    const filePath = path.join(process.cwd(), 'sample.csv')
    const txt = await fs.readFile(filePath, 'utf8')
    const rows = parseCSV(txt)
    const target = (num||'').replace(/[^0-9]/g,'')
    const found = rows.find(r => {
      if(!r || r.length===0) return false
      const first = (r[0]||'').replace(/[^0-9]/g,'')
      return first === target || first.endsWith(target) || ('91'+first) === target || ('91'+first) === ('91'+target)
    })

    if(!found) return res.status(404).json({ error: 'Number not found' })

    const [number,name,father,address,linked_number,circle,aadhar,email] = found
    return res.status(200).json({ number, name, father, address, linked_number, circle, aadhar, email })
  }catch(err){
    console.error(err)
    return res.status(500).json({ error: 'Server error' })
  }
}
