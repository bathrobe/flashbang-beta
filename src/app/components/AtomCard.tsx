'use client'
import React, { useState } from 'react'
import { Atom, Flashcard } from '../../payload-types'
import { AtomAssignButton } from './AtomAssignButton'

type TabType = 'summary' | 'details' | 'quote' | 'flashcards'

const AtomCard: React.FC<{ atom: Atom; disabled: boolean }> = ({ atom, disabled }) => {
  const [activeTab, setActiveTab] = useState<TabType>('summary')

  const tabs: { type: TabType; label: string }[] = [
    { type: 'summary', label: 'Summary' },
    { type: 'details', label: 'Details' },
    { type: 'quote', label: 'Source Quote' },
    { type: 'flashcards', label: 'Flashcards' },
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'summary':
        return <p>{atom.summary}</p>
      case 'details':
        return (
          <div
            dangerouslySetInnerHTML={{ __html: atom.details_html || '' }}
            className="[&>ul]:list-disc [&>ul]:list-inside"
          />
        )
      case 'quote':
        return <p>{atom.sourceQuote}</p>
      case 'flashcards':
        return (
          <>
            {atom.flashcards &&
              atom.flashcards.map((flashcard, index) => (
                <div key={index} className="p-4">
                  <h3 className="text-lg font-semibold">{(flashcard as Flashcard).title}</h3>
                  <p className="mt-2 text-md">{(flashcard as Flashcard).question}</p>
                  <p className="mt-1 text-sm text-gray-700">{(flashcard as Flashcard).answer}</p>
                </div>
              ))}
          </>
        )
    }
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{atom.title}</h2>
        {atom.subtitle && <h3 className="text-md text-gray-600 mb-4">{atom.subtitle}</h3>}
        <div className="flex mb-4">
          {tabs.map((tab) => (
            <button
              key={tab.type}
              className={`mr-2 px-3 py-1 rounded ${
                activeTab === tab.type ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
              onClick={() => setActiveTab(tab.type)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="mt-4">{renderTabContent()}</div>
      </div>
      <div className="flex justify-center p-4">
        <AtomAssignButton atom={atom} />
      </div>
    </div>
  )
}

export default AtomCard
