import { useState } from 'react'

export default function SearchBar({ onSearch }){
  const [q,setQ] = useState('')
  return (
    <div className="card">
      <h2 className="header-title">Hexor</h2>
      <p className="small-muted">Search for public information linked to any phone number.</p>
      <div className="mt-4 flex gap-3">
        <input value={q} onChange={e=>setQ(e.target.value)} className="search-input flex-1" placeholder="Enter phone number" />
        <button onClick={()=>onSearch(q)} className="px-4 py-2 rounded bg-blue-600 text-white">Search</button>
      </div>
    </div>
  )
}
