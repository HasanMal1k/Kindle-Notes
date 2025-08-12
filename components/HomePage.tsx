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
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function HomePage() {
  useCreateUser()
  useUpdateNotes()
  const [routeState, setRouteState ] = useState(false)
  const notes = useNotesStore(state => state.notes)
  const router = useRouter()

  useEffect(()=> {
    if(notes && !routeState){
      router.push('/#notes')
      setRouteState(true)
    }
  }, [notes])

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