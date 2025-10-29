export default function RecordCard({ r, index }){
  return (
    <div className="record-card mb-4">
      <div className="flex justify-between items-start">
        <div>
          <div className="text-sm text-sky-300 font-semibold">Record {index}</div>
          <div className="text-lg font-bold mt-2">{r.name}</div>
          <div className="text-sm small-muted">Father Name: {r.fname}</div>
        </div>
        <div className="text-sm small-muted">{r.circle}</div>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
        <div>
          <div className="small-muted">Alt. Mobile</div>
          <div>{r.alt_mobile || '-'}</div>
        </div>
        <div>
          <div className="small-muted">Aadhaar No</div>
          <div>{r.aadhaar || '-'}</div>
        </div>
        <div className="col-span-2 mt-2">
          <div className="small-muted">Address</div>
          <div className="whitespace-pre-wrap text-xs">{r.address}</div>
        </div>
      </div>
    </div>
  )
}
