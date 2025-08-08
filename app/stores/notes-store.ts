import { create } from 'zustand'
import { BookNotes } from '../utils/extract-notes'

type Store = {
  notes: Record<string, BookNotes> | null
  updateNotes: (newNotes: Record<string, BookNotes>) => void
}

const useNotesStore = create<Store>((set) => ({
  notes: null,
  updateNotes: (newNotes) => set({ notes: newNotes }),
}))

export default useNotesStore
