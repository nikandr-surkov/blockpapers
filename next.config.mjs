import createMDX from '@next/mdx'
 
/** @type {import('next').NextConfig} */
const nextConfig = {
 
  // Optional: Change the output directory `out` -> `dist`
   distDir: 'dist',
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // Optionally, add any other Next.js config below
}
 
const withMDX = createMDX({
  // Add markdown plugins here, as desired
})
 
// Merge MDX config with Next.js config
export default withMDX(nextConfig)