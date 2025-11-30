import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'nr02pur8'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

const client = createClient({
  projectId,
  dataset,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2025-11-29',
})

async function uploadImage(filePath: string, datasetName: string) {
  const buffer = fs.readFileSync(filePath)
  const filename = path.basename(filePath)

  const asset = await client.assets.upload('image', buffer, {
    filename,
    source: { name: `dataset-${datasetName}`, id: datasetName },
  })

  console.log(`✓ Uploaded: ${filename} -> ${asset._id}`)
  return asset
}

async function main() {
  const datasets = ['ddad', 'drift', 'synthesized-control']

  for (const datasetName of datasets) {
    const assetsDir = path.join(process.cwd(), 'public', 'assets', datasetName)

    if (!fs.existsSync(assetsDir)) {
      console.log(`Skipping ${datasetName} - directory not found`)
      continue
    }

    const files = fs.readdirSync(assetsDir).filter(f => /\.(jpg|jpeg|png|gif)$/i.test(f))

    console.log(`\nMigrating ${files.length} images from ${datasetName}...`)

    for (const file of files) {
      await uploadImage(path.join(assetsDir, file), datasetName)
    }
  }

  console.log('\n✓ Migration complete!')
}

main()
