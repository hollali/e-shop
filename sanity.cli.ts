import { defineCliConfig } from 'sanity/cli'
import * as fs from 'node:fs'

const env = fs.readFileSync('.env', 'utf-8')
for (const line of env.split('\n')) {
  const trimmed = line.trim()
  if (!trimmed || trimmed.startsWith('#')) continue
  const eqIdx = trimmed.indexOf('=')
  if (eqIdx === -1) continue
  const key = trimmed.slice(0, eqIdx).trim()
  let val = trimmed.slice(eqIdx + 1).trim()
  if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
    val = val.slice(1, -1)
  }
  if (!process.env[key]) {
    process.env[key] = val
  }
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-07-05'

export default defineCliConfig({
  api: { projectId, dataset },
  studioHost: "stylehive",
  vite: (prev: Record<string, any>) => ({
    ...prev,
    define: {
      ...(prev.define || {}),
      'process.env.NEXT_PUBLIC_SANITY_PROJECT_ID': JSON.stringify(projectId),
      'process.env.NEXT_PUBLIC_SANITY_DATASET': JSON.stringify(dataset),
      'process.env.NEXT_PUBLIC_SANITY_API_VERSION': JSON.stringify(apiVersion),
    },
  }),
})
