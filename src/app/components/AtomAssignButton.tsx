'use client'
import { assignAtom } from '@/app/lib/flashcards/flashcardActions'
import { useRouter } from 'next/navigation'

export const AtomAssignButton = ({
  atom,
  isAtomAssigned,
  onAssign,
}: {
  atom: any
  isAtomAssigned: boolean
  onAssign: () => void
}) => {
  let disabled = false
  if (isAtomAssigned) {
    disabled = true
  }

  const router = useRouter()
  return (
    <button
      onClick={async () => {
        const newCards = await assignAtom(atom.id)
        onAssign()
        router.refresh()
      }}
      disabled={disabled}
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background ${
        disabled
          ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          : 'bg-primary text-primary-foreground hover:bg-primary/90'
      } h-10 py-2 px-4`}
    >
      {disabled ? 'Assigned' : 'Assign atom'}
    </button>
  )
}
