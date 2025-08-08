'use client'

import Header from "@/components/Header";
import BookQuotes from "@/components/Quotes";
import DragNDrop from "@/components/DragNDrop";
import useCreateUser from "@/app/hooks/useCreateUser";
import useUpdateNotes from "@/app/hooks/useUpdateNotes";

function HomePage() {
  useCreateUser()
  useUpdateNotes()
  
  return (
    <>
      <Header/>
      <BookQuotes/>
      <DragNDrop/>
    </>
  )
}

export default HomePage