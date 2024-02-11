import { contextBridge } from 'electron'

// Custom APIs for renderer
const api = {}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('context', api)
  } catch (error) {
    console.error(error)
  }
} else {
  throw new Error('ContextIsolated must be enabled')
}
