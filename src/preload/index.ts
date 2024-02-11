import { contextBridge, ipcRenderer } from 'electron'
import { GetNotes, ReadNote, WriteNote, CreateNote, DeleteNote } from '@shared/types'

// Custom APIs for renderer
const api = {
  locale: navigator.language,
  getNotes: (...args: Parameters<GetNotes>) => ipcRenderer.invoke('getNotes', ...args),
  readNote: (...args: Parameters<ReadNote>) => ipcRenderer.invoke('readNote', ...args),
  writeNote: (...args: Parameters<WriteNote>) => ipcRenderer.invoke('writeNote', ...args),
  createNote: (...args: Parameters<CreateNote>) => ipcRenderer.invoke('createNote', ...args),
  deleteNote: (...args: Parameters<DeleteNote>) => ipcRenderer.invoke('deleteNote', ...args)
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('context', api)
  } catch (error) {
    console.error(error)
  }
} else {
  throw new Error('ContextIsolated must be enabled')
}
