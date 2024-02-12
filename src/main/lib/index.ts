import { homedir } from 'os'
import { appDirName, fileEncoding, welcomeFileName } from '@shared/constants'
import { ensureDir, readdir, readFile, remove, stat, writeFile } from 'fs-extra'
import { NoteInfo } from '@shared/models'
import { GetNotes, ReadNote, WriteNote, CreateNote, DeleteNote } from '@shared/types'
import path from 'path'
import { dialog } from 'electron'
import welcomeNoteFile from '../../../resources/welcomeNote.md?asset'

export const getRootDir = () => {
  return `${homedir}/${appDirName}`
}

export const getNotes: GetNotes = async () => {
  const root = getRootDir()

  await ensureDir(root)

  const notesFileNames = await readdir(root, {
    encoding: fileEncoding,
    withFileTypes: false
  })

  const notes = notesFileNames.filter((fileName) => fileName.endsWith('.md'))

  if (notes.length === 0) {
    console.info('No notes found')

    const content = await readFile(welcomeNoteFile, { encoding: fileEncoding })

    await writeFile(`${root}/${welcomeFileName}`, content, { encoding: fileEncoding })

    notes.push(welcomeFileName)
  }

  return Promise.all(notes.map(getNoteInfoFromFileName))
}

export const getNoteInfoFromFileName = async (fileName: string): Promise<NoteInfo> => {
  const fileStats = await stat(`${getRootDir()}/${fileName}`)

  return {
    title: fileName.replace(/\.md$/, ''),
    lastEditTime: fileStats.mtimeMs
  }
}

export const readNote: ReadNote = async (fileName) => {
  const root = getRootDir()

  return readFile(`${root}/${fileName}.md`, { encoding: fileEncoding })
}

export const writeNote: WriteNote = async (fileName, content) => {
  const root = getRootDir()

  console.info(`Writing note ${fileName}`)
  return writeFile(`${root}/${fileName}.md`, content, { encoding: fileEncoding })
}

export const createNote: CreateNote = async () => {
  const root = getRootDir()

  await ensureDir(root)

  const { filePath, canceled } = await dialog.showSaveDialog({
    title: 'New Note',
    defaultPath: `${root}/Untitled.md`,
    buttonLabel: 'Create',
    properties: ['showOverwriteConfirmation'],
    showsTagField: false,
    filters: [{ name: 'Markdown', extensions: ['md'] }]
  })

  if (!filePath || canceled) {
    console.info('Creation canceled')
    return false
  }

  const { name: filename, dir: parentDir } = path.parse(filePath)

  if (parentDir !== root) {
    await dialog.showMessageBox({
      type: 'error',
      title: 'Creation failed',
      message: `All notes must be saved under ${root}.`
    })

    return false
  }

  console.info(`Creating note: ${filePath}`)
  await writeFile(filePath, '')

  return filename
}

export const deleteNote: DeleteNote = async (fileName) => {
  const root = getRootDir()

  const { response } = await dialog.showMessageBox({
    type: 'warning',
    title: 'Delete Note',
    message: `Are you sure you want to delete ${fileName}?`,
    buttons: ['Delete', 'Cancel'],
    defaultId: 1,
    cancelId: 1
  })

  if (response === 1) {
    console.info('Deletion canceled')
    return false
  }

  console.info(`Deleting note: ${fileName}`)
  await remove(`${root}/${fileName}.md`)

  return true
}
