'use client'

import Header from "@/components/Header";
import BookQuotes from "@/components/Quotes";
import DragNDrop from "@/components/DragNDrop";
import useCreateUser from "@/app/hooks/useCreateUser";
import useUpdateNotes from "@/app/hooks/useUpdateNotes";
import useNotesStore from "@/app/stores/notes-store";
import KindleNotesViewer from "./KindleNotesViewer";
import Instructions from "./Instructions";
import Footer from './Footer'

function HomePage() {
  useCreateUser()
  useUpdateNotes()
  const notes = useNotesStore(state => state.notes)
  return (
    <>
      <Header/>
      <BookQuotes/>
      <DragNDrop/>
      <Instructions/>
      {notes && <KindleNotesViewer/>}
      <Footer/>
    </>
  )
}

export default HomePage