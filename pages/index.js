import { useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar'
import RecordCard from '../components/RecordCard'

export default function Home(){
  const [data,setData] = useState([])
  const [results,setResults] = useState([])
  const [loading,setLoading] = useState(false)

  useEffect(()=>{
    // load demo data from public folder with the real example number
    fetch('/sample-data.json').then(r=>r.json()).then(d=>setData(d))
  },[])

  function onSearch(q){
    if(!q) return setResults([])
    setLoading(true)
    // simple search - find entries where any phone field contains q
    setTimeout(()=>{
      const res = data.filter(item=>{
        return (item.mobile && item.mobile.includes(q)) || (item.alt_mobile && item.alt_mobile.includes(q))
      })
      setResults(res)
      setLoading(false)
    },150) // small delay to show spinner illusion
  }

  function downloadResults(){
    const blob = new Blob([JSON.stringify(results, null, 2)], {type:'application/json'})
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'results.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen">
      <div className="container">
        <header className="flex justify-between items-center mb-6">
          <div className="header-title">Hexor</div>
          <div className="small-muted">Channel &nbsp; | &nbsp; Contact</div>
        </header>

        <SearchBar onSearch={onSearch} />

        <div className="mt-6 grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <div className="card mb-4 flex justify-between items-center">
              <div>
                <div className="font-semibold text-sky-300">Search Complete</div>
                <div className="small-muted">{results.length} record(s) found.</div>
              </div>
              <div>
                <button onClick={downloadResults} className="px-3 py-1 bg-blue-600 rounded text-white">Download</button>
              </div>
            </div>

            <div>
              {loading && <div className="card">Searching...</div>}
              {!loading && results.length===0 && <div className="card">No results yet. Try searching the example number (eg: 919876543210)</div>}
              {!loading && results.map((r,i)=> <RecordCard key={i} r={r} index={i+1} />)}
            </div>
          </div>

          <div>
            <div className="card">
              <div className="font-semibold text-sky-300">Location Map</div>
              <div className="mt-3">
                {/* static google map iframe for demo */}
                <iframe src="https://maps.google.com/maps?q=delhi&t=&z=13&ie=UTF8&iwloc=&output=embed" width="100%" height="200" frameBorder="0"></iframe>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
