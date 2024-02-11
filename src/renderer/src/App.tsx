import { Content, DraggableTopBar, RootLayout, Sidebar, ActionButtonsRow } from '@/components'
import { NotePreviewList } from '@/components'
import { FloatingNoteTitle, MarkdownEditor } from './components'
import { useRef } from 'react'

const App = () => {
  const contentContainerRef = useRef<HTMLDivElement>(null)

  const resetScroll = () => {
    contentContainerRef.current?.scrollTo(0, 0)
  }

  return (
    <>
      <DraggableTopBar></DraggableTopBar>
      <RootLayout>
        <Sidebar className="p-2 pt-8 bg-zinc-800/80">
          <ActionButtonsRow className="flex justify-between mt-1" />
          <NotePreviewList className="mt-3 space-y-1" onSelect={resetScroll}></NotePreviewList>
        </Sidebar>
        <Content className="border-l border-white/20 bg-zinc-900/80">
          <FloatingNoteTitle className="pt-2"></FloatingNoteTitle>
          <MarkdownEditor></MarkdownEditor>
        </Content>
      </RootLayout>
    </>
  )
}

export default App
