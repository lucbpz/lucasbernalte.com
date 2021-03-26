import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
const readingTime = require('reading-time');

const postsDirectory = join(process.cwd(), 'data/blog')

export function getPostSlugs(locale) {
  return fs.readdirSync(`${postsDirectory}/${locale}`)
}

export function getPostBySlug(slug, fields = [], locale) {
  const realSlug = slug.replace(/\.mdx$/, '')
  const fullPath = join(`${postsDirectory}/${locale}`, `${realSlug}.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const items = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'content') {
      items[field] = content
      items.readingTime = readingTime(content);
    }

    if (data[field]) {
      items[field] = data[field]
    }
  })

  return items
}

export function getAllPosts(fields = [], locale) {
  const slugs = getPostSlugs(locale)
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields, locale))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? '-1' : '1'))
  return posts
}
