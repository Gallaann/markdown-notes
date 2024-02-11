import { NoteInfo } from '@shared/models'
import { ComponentProps } from 'react'
import { cn, formatDate } from '@renderer/utils'

export type NotePreviewProps = NoteInfo & {
  isActive?: boolean
} & ComponentProps<'div'>
export const NotePreview = ({
  title,
  content,
  lastEditTime,
  isActive = false,
  className,
  ...props
}: NotePreviewProps) => {
  const noteDate = formatDate(lastEditTime)

  return (
    <div
      className={cn(
        'cursor-pointer px-2.5 py-3 rounded-md transition-colors duration-75',
        { 'bg-zinc-400/75': isActive, 'hover:bg-zinc-500/75': !isActive },
        className
      )}
      {...props}
    >
      <h3 className="mb-1 font-bold truncate">{title}</h3>
      <span className="mb-2 inline-block w-full text-xs font-light text-left">{noteDate}</span>
    </div>
  )
}
