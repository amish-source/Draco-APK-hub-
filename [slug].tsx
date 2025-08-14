import Layout from '../../components/Layout'
import { prisma } from '../../lib/prisma'
import Head from 'next/head'

export async function getServerSideProps({ params }: any) {
  const app = await prisma.app.findUnique({
    where: { slug: params.slug },
    include: { Category: true, Publisher: true }
  })
  if (!app) return { notFound: true }
  return { props: { app: JSON.parse(JSON.stringify(app)) } }
}

export default function AppDetail({ app }: any) {
  return (
    <Layout>
      <Head>
        <title>{app.title} — {process.env.NEXT_PUBLIC_SITE_NAME || 'AppHub'}</title>
        <meta name="description" content={app.shortDesc} />
      </Head>
      <article className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 card p-6">
          <div className="flex items-start gap-4">
            <img src={app.screenshots?.[0] || '/placeholder.png'} alt="" className="w-20 h-20 rounded object-cover border" />
            <div>
              <h1 className="text-2xl font-bold">{app.title}</h1>
              <p className="text-gray-600">{app.shortDesc}</p>
              <div className="flex gap-2 mt-2">
                <span className="badge">v{app.version}</span>
                <span className="badge">{app.sizeMB} MB</span>
                <span className="badge">Android {app.minAndroid}+</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 my-4">
            {app.screenshots?.slice(0,6).map((src:string, i:number)=>(
              <img key={i} src={src} className="rounded border object-cover w-full h-36" alt="" />
            ))}
          </div>

          <h2 className="font-semibold mt-4 mb-2">About this app</h2>
          <p className="whitespace-pre-wrap leading-relaxed">{app.longDesc}</p>
        </div>

        <aside className="card p-6 h-fit">
          <h3 className="font-semibold mb-2">App Info</h3>
          <ul className="text-sm space-y-1">
            <li><strong>Version:</strong> {app.version}</li>
            <li><strong>Updated:</strong> {new Date(app.updatedAt).toLocaleDateString()}</li>
            <li><strong>Size:</strong> {app.sizeMB} MB</li>
            <li><strong>Min Android:</strong> {app.minAndroid}+</li>
            <li><strong>Category:</strong> {app.Category?.name}</li>
            {app.Publisher?.name && <li><strong>Publisher:</strong> {app.Publisher.name}</li>}
          </ul>
          <a href={app.playLink} target="_blank" rel="noreferrer" className="btn btn-primary w-full mt-4 text-center">
            Download from Official Source
          </a>
          <p className="text-xs text-gray-600 mt-2">We never host APK/mod/cracked files. Links go to the official website or Play Store.</p>
        </aside>
      </article>
    </Layout>
  )
}
