'use client'
import React, { useState } from 'react'
import { Atom } from '../../payload-types'
import { AtomAssignButton } from './AtomAssignButton'

type TabType = 'summary' | 'details' | 'quote'

const AtomCard: React.FC<{
  atom: Atom
  onAssign: any
  isAtomAssigned: boolean
  title: string
}> = ({ atom, onAssign, isAtomAssigned, title }) => {
  const [activeTab, setActiveTab] = useState<TabType>('summary')

  const tabs: { type: TabType; label: string }[] = [
    { type: 'summary', label: 'Summary' },
    { type: 'details', label: 'Details' },
    { type: 'quote', label: 'Source Quote' },
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'summary':
        return (
          <div
            dangerouslySetInnerHTML={{ __html: atom.shortSummary_html || '' }}
            className="[&>ul]:list-disc [&>ul]:list-inside"
          />
        )
      case 'details':
        return (
          <div
            dangerouslySetInnerHTML={{ __html: atom.mediumSummary_html || '' }}
            className="[&>ul]:list-disc [&>ul]:list-inside"
          />
        )
      case 'quote':
        // @ts-ignore
        return <p>{atom?.source?.title}</p>
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden w-full max-w-2xl mx-auto">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="flex mb-6 space-x-2">
          {tabs.map((tab) => (
            <button
              key={tab.type}
              className={`px-3 py-1 rounded-full text-sm ${
                activeTab === tab.type ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
              }`}
              onClick={() => setActiveTab(tab.type)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="mt-4 prose prose-sm w-full overflow-x-auto">{renderTabContent()}</div>
      </div>
      <div className="flex justify-center p-4 border-t border-gray-100">
        <AtomAssignButton atom={atom} onAssign={onAssign} isAtomAssigned={isAtomAssigned} />
      </div>
    </div>
  )
}

export default AtomCard
