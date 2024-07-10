import React from 'react'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { Source } from '../../../payload-types'

const SourceCard: React.FC<{ source: Source }> = ({ source }) => (
  <div className="bg-white shadow-md rounded-lg p-4 mb-4">
    <h2 className="text-xl font-bold mb-2">{source.title}</h2>
    {source.author && <p className="text-sm text-gray-600 mb-1">Author: {source.author}</p>}
    {source.institution && (
      <p className="text-sm text-gray-600 mb-1">Institution: {source.institution}</p>
    )}
    {source.description && <p className="text-sm text-gray-700 mb-2">{source.description}</p>}
    {source.url && (
      <a
        href={source.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        View Source
      </a>
    )}
  </div>
)

const SourcesPage: React.FC = async () => {
  const payload = await getPayloadHMR({ config: configPromise })
  const { docs: sources } = await payload.find({ collection: 'sources' })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Sources</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sources.map((source) => (
          <SourceCard key={source.id} source={source as Source} />
        ))}
      </div>
    </div>
  )
}

export default SourcesPage
