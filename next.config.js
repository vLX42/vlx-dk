// next.config.js
/** @type {import('next').NextConfig} */
module.exports = {
  // Pin the project root so the parent folder's stray lockfile isn't picked up,
  // and provide an (empty) Turbopack config now that it's the default in Next 16.
  turbopack: {
    root: __dirname,
  },
}
