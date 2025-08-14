import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const cats = [
    { slug: 'communication', name: 'Communication' },
    { slug: 'media', name: 'Media' },
    { slug: 'productivity', name: 'Productivity' },
    { slug: 'tools', name: 'Tools' }
  ]
  for (const c of cats) {
    await prisma.category.upsert({
      where: { slug: c.slug },
      update: {},
      create: c
    })
  }

  const pub = await prisma.publisher.create({
    data: { name: 'F-Droid / Open Source', site: 'https://f-droid.org' }
  })

  const sampleApps = [
    {
      slug: 'signal-private-messenger',
      title: 'Signal Private Messenger',
      shortDesc: 'Fast, simple, secure messaging.',
      longDesc: 'Signal is a privacy focused messenger with end-to-end encryption. This listing links to the official site.',
      version: '6.50.0',
      sizeMB: '120',
      minAndroid: '8.0',
      playLink: 'https://signal.org/android/apk/',
      screenshots: [
        'https://upload.wikimedia.org/wikipedia/commons/8/8d/Signal-Android-screenshot.png'
      ],
      tags: ['privacy', 'messaging'],
      categorySlug: 'communication'
    },
    {
      slug: 'vlc-android',
      title: 'VLC for Android',
      shortDesc: 'Open-source cross-platform media player.',
      longDesc: 'VLC plays most multimedia files as well as discs, devices, and network streaming protocols.',
      version: '3.6.0',
      sizeMB: '40',
      minAndroid: '7.0',
      playLink: 'https://play.google.com/store/apps/details?id=org.videolan.vlc',
      screenshots: [
        'https://upload.wikimedia.org/wikipedia/commons/3/30/VLC_Icon.svg'
      ],
      tags: ['player', 'media'],
      categorySlug: 'media'
    }
  ]

  for (const a of sampleApps) {
    const cat = await prisma.category.findUnique({ where: { slug: a.categorySlug } })
    if (!cat) continue
    await prisma.app.upsert({
      where: { slug: a.slug },
      update: {},
      create: {
        slug: a.slug,
        title: a.title,
        shortDesc: a.shortDesc,
        longDesc: a.longDesc,
        version: a.version,
        sizeMB: a.sizeMB,
        minAndroid: a.minAndroid,
        playLink: a.playLink,
        screenshots: a.screenshots,
        tags: a.tags,
        categoryId: cat.id,
        publisherId: pub.id
      }
    })
  }
}

main().catch(e=>{
  console.error(e)
  process.exit(1)
}).finally(async ()=>{
  await prisma.$disconnect()
})
