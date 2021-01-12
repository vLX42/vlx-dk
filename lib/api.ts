import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const cvsDirectory = join(process.cwd(), '_cv')

export function getCVSlugs() {
  return fs.readdirSync(cvsDirectory)
}

export function getCVBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(cvsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  type Items = {
    [key: string]: string
  }

  const items: Items = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'content') {
      items[field] = content
    }

    if (data[field]) {
      items[field] = data[field]
    }
  })

  return items
}

export function getAllCvs(fields: string[] = []) {
  const slugs = getCVSlugs()
  const cvs = slugs
    .map((slug) => getCVBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((cv1, cv2) => (cv1.date > cv2.date ? -1 : 1))
  return cvs
}