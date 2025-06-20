const fs = require('fs')
const path = require('path')

const ICONS_DIR = path.join(__dirname, './public/assets/icons')
const OUTPUT_FILE = path.join(__dirname, './src/shared/model/icons.types.ts')

/**
 * Recursively reads all `.svg` files in the provided directory, including nested folders.
 *
 * @param {string} dir - The directory to scan for SVG files.
 * @returns {string[]} - An array of SVG file paths relative to ICONS_DIR.
 */
function getAllSvgIcons(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })

  const files = entries
    .filter(file => !file.isDirectory() && file.name.endsWith('.svg'))
    .map(file => path.relative(ICONS_DIR, path.join(dir, file.name)))

  const folders = entries.filter(folder => folder.isDirectory())
  for (const folder of folders) {
    files.push(...getAllSvgIcons(path.join(dir, folder.name)))
  }

  return files
}

/**
 * Generates TypeScript types and an interface for available icons.
 */
function generateIconTypes() {
  const svgFiles = getAllSvgIcons(ICONS_DIR)

  // Map file paths to TypeScript-safe strings and create a union type
  const iconTypes = svgFiles
    .map(file => {
      return `"${file.replace(/\.svg$/, '').replace(/\\/g, '/')}"`
    })
    .join(' | ')

  const typeDefinition = `// This file is auto-generated. Do not edit manually.
export type IconName = ${iconTypes};

`

  // Write the generated file to the output path
  fs.writeFileSync(OUTPUT_FILE, typeDefinition, 'utf-8')
  console.log('Icon types have been successfully generated!')
}

generateIconTypes()
