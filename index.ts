import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.headers.authorization || req.query.token
  if (token !== `Bearer ${process.env.ADMIN_TOKEN}` && token !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  if (req.method === 'POST') {
    try {
      const data = req.body
      const category = await prisma.category.upsert({
        where: { slug: data.category.slug },
        create: { slug: data.category.slug, name: data.category.name },
        update: {}
      })
      const publisher = data.publisher ? await prisma.publisher.upsert({
        where: { id: data.publisher.id || 0 },
        create: { name: data.publisher.name, site: data.publisher.site || null },
        update: { name: data.publisher.name, site: data.publisher.site || null }
      }) : null

      const app = await prisma.app.create({
        data: {
          slug: data.slug,
          title: data.title,
          shortDesc: data.shortDesc,
          longDesc: data.longDesc,
          version: data.version,
          sizeMB: data.sizeMB,
          minAndroid: data.minAndroid,
          playLink: data.playLink,
          screenshots: data.screenshots || [],
          tags: data.tags || [],
          categoryId: category.id,
          publisherId: publisher ? publisher.id : null
        }
      })
      return res.json(app)
    } catch (e:any) {
      return res.status(400).json({ error: e.message })
    }
  }

  if (req.method === 'GET') {
    const apps = await prisma.app.findMany({ orderBy: { createdAt: 'desc' } })
    return res.json(apps)
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
