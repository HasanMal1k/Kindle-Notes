'use client'

import { useCallback, useEffect, useState } from "react"
import { useDropzone, type FileRejection } from "react-dropzone"
import { FilePlus2 } from "lucide-react"
import extractAllBookNotes from "@/app/utils/extract-notes"
import useNotesStore from "@/app/stores/notes-store"

export default function DragNDrop() {
  const [isDragOver, setIsDragOver] = useState(false)
  const { updateNotes } = useNotesStore()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log("Accepted files:", acceptedFiles)
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()
      
      reader.onload = () => {
        const result = reader.result
        if (typeof result === "string") {
          const notes = extractAllBookNotes(result)
          updateNotes(notes)

          console.log("Parsed notes:", notes)
        } else {
          console.error("Unexpected file content format", result)
        }
      }
      
      reader.readAsText(file)
    })
  }, [])
  
  const onDropRejected = useCallback((fileRejections: FileRejection[]) => {
    console.warn("Rejected files:", fileRejections)
    fileRejections.forEach(({ file, errors }) => {
      console.log(`File ${file.name} rejected:`, errors)
    })
  }, [])
  
  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    onDropRejected,
    accept: {
      'text/plain': ['.txt'],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false,
    noClick: true,
    onDragEnter: () => setIsDragOver(true),
    onDragLeave: () => setIsDragOver(false),
  })
  
  useEffect(() => {
    let dragCounter = 0;
    
    const handleDragEnter = (e: DragEvent) => {
      e.preventDefault()
      dragCounter++
      setIsDragOver(true)
    }
    
    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault()
      dragCounter--
      if (dragCounter === 0) {
        setIsDragOver(false)
      }
    }
    
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault()
    }
    
    const handleDrop = (e: DragEvent) => {
      e.preventDefault()
      dragCounter = 0
      setIsDragOver(false)
    }
    
    document.addEventListener('dragenter', handleDragEnter)
    document.addEventListener('dragleave', handleDragLeave)
    document.addEventListener('dragover', handleDragOver)
    document.addEventListener('drop', handleDrop)
    
    return () => {
      document.removeEventListener('dragenter', handleDragEnter)
      document.removeEventListener('dragleave', handleDragLeave)
      document.removeEventListener('dragover', handleDragOver)
      document.removeEventListener('drop', handleDrop)
    }
  }, [])
  
  return (
    <>
      {isDragOver && (
        <div 
          {...getRootProps()}
          className="fixed inset-0 z-50 bg-white/80 dark:bg-gray-900/80 flex items-center justify-center border-4 border-dashed m-8 rounded-2xl"
        >
          <input {...getInputProps()} />
          <div className="text-center pointer-events-none">
            <FilePlus2 className="mx-auto h-24 w-24 text-gray-400 mb-6" />
            <p className="text-4xl font-medium text-gray-500 mb-2">
              {isDragReject ? 'Invalid File Type - TXT Only' : 'Drop Your TXT File Here'}
            </p>
            <p className="text-lg text-gray-400">
              {isDragReject ? 'Please select a .txt file' : 'Release to upload'}
            </p>
          </div>
        </div>
      )}
    </>
  )
}