import Link from 'next/link'

export default function AppCard({ app }: { app: any }) {
  return (
    <Link href={`/apps/${app.slug}`} className="card p-4 block">
      <div className="flex gap-4">
        <img src={app.screenshots?.[0] || '/placeholder.png'} alt="" className="w-16 h-16 rounded object-cover border" />
        <div className="flex-1">
          <h3 className="font-semibold">{app.title}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{app.shortDesc}</p>
          <div className="flex gap-2 mt-2">
            <span className="badge">v{app.version}</span>
            <span className="badge">{app.sizeMB} MB</span>
            <span className="badge">{app.minAndroid}+</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
