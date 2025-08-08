'use client'

import Header from "@/components/Header";
import BookQuotes from "@/components/Quotes";
import DragNDrop from "@/components/DragNDrop";
import useCreateUser from "@/app/hooks/useCreateUser";
import useUpdateNotes from "@/app/hooks/useUpdateNotes";
import useNotesStore from "@/app/stores/notes-store";
import KindleNotesViewer from "./KindleNotesViewer";

function HomePage() {
  useCreateUser()
  useUpdateNotes()
  const notes = useNotesStore(state => state.notes)
  return (
    <>
      <Header/>
      <BookQuotes/>
      <DragNDrop/>
      {notes && <KindleNotesViewer/>}
    </>
  )
}

export default HomePage