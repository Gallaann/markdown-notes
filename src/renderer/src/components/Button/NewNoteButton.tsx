import { ActionButton, ActionButtonProps } from '@/components'
import { LuFileSignature } from 'react-icons/lu'
import { createEmptyNoteAtom } from '@/store'
import { useSetAtom } from 'jotai'

export const NewNoteButton = ({ ...props }: ActionButtonProps) => {
  const createNewNote = useSetAtom(createEmptyNoteAtom)

  const handleCreation = async () => {
    await createNewNote()
  }

  return (
    <ActionButton onClick={handleCreation} {...props}>
      <LuFileSignature className="w-4 h-4 text-zinc-300" />
    </ActionButton>
  )
}
