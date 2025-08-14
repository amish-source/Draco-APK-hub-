import Layout from '../components/Layout'
import AppCard from '../components/AppCard'
import { prisma } from '../lib/prisma'

export async function getServerSideProps() {
  const [apps, categories] = await Promise.all([
    prisma.app.findMany({
      orderBy: { createdAt: 'desc' },
      take: 9,
      include: { Category: true }
    }),
    prisma.category.findMany()
  ])
  return { props: { apps: JSON.parse(JSON.stringify(apps)), categories } }
}

export default function Home({ apps, categories }: any) {
  return (
    <Layout>
      <section className="my-6">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">Find safe, legit Android apps</h1>
          <p className="text-gray-600 mt-2">Browse by category, read details, and download from official sources only.</p>
        </div>
        <form action="/apps" className="max-w-xl mx-auto">
          <input
            name="q"
            placeholder="Search apps (e.g., WhatsApp, VLC, F-Droid)…"
            className="w-full border rounded px-4 py-3"
          />
        </form>
      </section>

      <section className="my-8">
        <h2 className="font-semibold mb-3">Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {categories.map((c:any)=> (
            <a key={c.id} href={`/apps?cat=${c.slug}`} className="card p-3 text-center">{c.name}</a>
          ))}
        </div>
      </section>

      <section className="my-8">
        <h2 className="font-semibold mb-3">Latest Apps</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {apps.map((app:any)=> <AppCard key={app.id} app={app} />)}
        </div>
      </section>
    </Layout>
  )
}
