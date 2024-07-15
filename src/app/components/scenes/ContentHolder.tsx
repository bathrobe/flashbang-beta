import React from 'react'

interface ContentHolderProps {
  content: string
}

const ContentHolder: React.FC<ContentHolderProps> = ({ content }) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: content }}
      className="mx-auto prose w-[65ch] prose-lg "
    />
  )
}

export default ContentHolder
