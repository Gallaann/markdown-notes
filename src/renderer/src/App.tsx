import { Content, DraggableTopBar, RootLayout, Sidebar, ActionButtonsRow } from '@/components'
import { NotePreviewList } from '@/components'

const App = () => {
  return (
    <>
      <DraggableTopBar></DraggableTopBar>
      <RootLayout>
        <Sidebar className="p-2 pt-8 bg-zinc-800/80">
          <ActionButtonsRow className="flex justify-between mt-1" />
          <NotePreviewList className="mt-3 space-y-1"></NotePreviewList>
        </Sidebar>
        <Content className="border-l border-white/20 bg-zinc-900/80">Content</Content>
      </RootLayout>
    </>
  )
}

export default App
