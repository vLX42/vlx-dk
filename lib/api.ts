import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { load as yamlLoad } from 'js-yaml'

const cvsDirectory = join(process.cwd(), '_cv')
const articlesDirectory = join(process.cwd(), '_articles')

// gray-matter ships an old js-yaml that calls the removed safeLoad. Use js-yaml 4's
// load (safe by default) via a custom engine so we can stay on the patched version.
const matterOptions = {
  engines: { yaml: (s: string) => yamlLoad(s) as object },
}

export function getCVSlugs() {
  return fs.readdirSync(cvsDirectory)
}

export function getCVBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(cvsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents, matterOptions)

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

// _articles/ holds long-form posts. Same frontmatter+markdown format as _cv,
// sorted newest first by the `date` field.
export function getAllArticles(fields: string[] = []) {
  if (!fs.existsSync(articlesDirectory)) return []
  return fs
    .readdirSync(articlesDirectory)
    .filter((f) => f.endsWith('.md'))
    .map((file) => {
      const fileContents = fs.readFileSync(join(articlesDirectory, file), 'utf8')
      const { data, content } = matter(fileContents, matterOptions)
      const items: { [key: string]: string } = {}
      fields.forEach((field) => {
        if (field === 'slug') items[field] = file.replace(/\.md$/, '')
        if (field === 'content') items[field] = content
        if (data[field]) items[field] = data[field]
      })
      return items
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1))
}

export function getAllCvs(fields: string[] = []) {
  const slugs = getCVSlugs()
  const cvs = slugs
    .map((slug) => getCVBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((cv1, cv2) => (cv1.date > cv2.date ? -1 : 1))
  return cvs
}