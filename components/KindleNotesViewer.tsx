import React, { useState, useRef, useEffect } from 'react';
import { Book, Calendar, Clock, MapPin, Quote, Search } from 'lucide-react';
import useNotesStore from '@/app/stores/notes-store';

export type Note = {
  content: string;
  date: string | null;
  time: string | null;
  location: string | null;
};

export type BookNotes = {
  title: string;
  author: string;
  notes: Note[];
};

export default function KindleNotesViewer() {
  const notes = useNotesStore(state => state.notes);
  
  const [selectedBook, setSelectedBook] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [bookSearchTerm, setBookSearchTerm] = useState<string>('');
  const [leftWidth, setLeftWidth] = useState<number>(60); 
  const [isDragging, setIsDragging] = useState<boolean>(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Use actual notes from store, fallback to empty object if null
  const allNotes = notes || {};
  const books: BookNotes[] = Object.values(allNotes);
  
  // Set initial selected book when notes are loaded
  useEffect(() => {
    const bookKeys = Object.keys(allNotes);
    if (bookKeys.length > 0 && !selectedBook) {
      setSelectedBook(bookKeys[0]);
    }
  }, [allNotes, selectedBook]);
  
  const selectedBookData: BookNotes | undefined = allNotes[selectedBook];

  // Filter books based on search term - Fixed to handle undefined values
  const filteredBooks: [string, BookNotes][] = Object.entries(allNotes).filter(([key, book]) => {
    const title = book.title || '';
    const author = book.author || '';
    const searchLower = bookSearchTerm.toLowerCase();
    
    return title.toLowerCase().includes(searchLower) || 
           author.toLowerCase().includes(searchLower);
  });

  // Filter notes based on search term - Fixed to handle undefined values
  const filteredNotes: Note[] = selectedBookData?.notes.filter(note => {
    const content = note.content || '';
    return content.toLowerCase().includes(searchTerm.toLowerCase());
  }) || [];

  // Handle resizing
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const newLeftWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;
    
    // Constrain between 20% and 80%
    if (newLeftWidth >= 20 && newLeftWidth <= 80) {
      setLeftWidth(newLeftWidth);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  return (
    <div className="bg-white border-b-2 border-b-gray-400 pb-10">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-4 w-full flex items-center justify-center flex-col">
        <h2 className="text-base/7 font-semibold text-teal-600">Notes Processed</h2>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Your Kindle Notes</h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">Browse and search through your highlights and notes</p>
      </div>

      {/* Main Content */}
      {Object.keys(allNotes).length === 0 ? (
        <div className="flex items-center justify-center h-[calc(100vh-120px)] text-gray-500">
          <div className="text-center">
            <Book className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium mb-2">No books found</h3>
            <p>Upload your Kindle notes file to get started</p>
          </div>
        </div>
      ) : (
        <div 
          ref={containerRef}
          className="flex h-[calc(100vh-120px)] relative"
          style={{ cursor: isDragging ? 'col-resize' : 'default' }}
        >
          {/* Notes Panel - Left */}
          <div 
            className="flex flex-col bg-white border-r border-gray-200"
            style={{ width: `${leftWidth}%` }}
          >
            {/* Search Bar */}
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search notes..."
                  value={searchTerm}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                />
              </div>
            </div>

            {/* Notes List */}
            <div className="flex-1 overflow-y-auto">
              {filteredNotes.length === 0 ? (
                <div className="flex items-center justify-center h-32 text-gray-500">
                  {searchTerm ? 'No notes found matching your search' : 'No notes available'}
                </div>
              ) : (
                <div className="p-4 space-y-4">
                  {filteredNotes.map((note, index) => (
                    <div key={index} className="group border border-gray-200 rounded-lg p-4 hover:border-teal-300 hover:shadow-sm transition-all duration-200">
                      <div className="flex items-start gap-3">
                        <Quote className="text-teal-500 h-5 w-5 mt-1 flex-shrink-0 rotate-180" />
                        <div className="flex-1 min-w-0">
                          <blockquote className="text-gray-800 leading-relaxed mb-3">
                            "{note.content || 'No content available'}"
                          </blockquote>
                          
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>{note.date || 'Unknown date'}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{note.time || 'Unknown time'}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              <span>Page {note.location || 'Unknown'}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Resizer */}
          <div
            className="w-1 bg-gray-200 hover:bg-teal-300 cursor-col-resize relative group transition-colors duration-200"
            onMouseDown={handleMouseDown}
          >
            <div className="absolute inset-y-0 -left-1 -right-1 group-hover:bg-teal-100 transition-colors duration-200" />
          </div>

          {/* Books Panel - Right */}
          <div 
            className="flex flex-col bg-gray-50"
            style={{ width: `${100 - leftWidth}%` }}
          >
            {/* Books Header */}
            <div className="p-4 border-b border-gray-200 bg-white">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-3">
                <Book className="h-5 w-5 text-teal-600" />
                Your Library ({filteredBooks.length} of {books.length} books)
              </h2>
              
              {/* Book Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search books by title or author..."
                  value={bookSearchTerm}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBookSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                />
              </div>
            </div>

            {/* Books List */}
            <div className="flex-1 overflow-y-auto p-4">
              {filteredBooks.length === 0 ? (
                <div className="flex items-center justify-center h-32 text-gray-500">
                  No books found matching your search
                </div>
              ) : (
                <div className="grid gap-3">
                  {filteredBooks.map(([bookKey, book]) => {
                    const isSelected = selectedBook === bookKey;
                    
                    return (
                      <div
                        key={bookKey}
                        onClick={() => setSelectedBook(bookKey)}
                        className={`
                          cursor-pointer p-4 rounded-lg border-2 transition-all duration-200
                          ${isSelected 
                            ? 'border-teal-500 bg-teal-50 shadow-sm' 
                            : 'border-gray-200 bg-white hover:border-teal-300 hover:shadow-sm'
                          }
                        `}
                      >
                        <div className="flex items-start gap-3">
                          <Book className={`h-5 w-5 mt-1 flex-shrink-0 ${isSelected ? 'text-teal-600' : 'text-gray-400'}`} />
                          <div className="flex-1 min-w-0">
                            <h3 className={`font-semibold text-sm mb-1 ${isSelected ? 'text-teal-900' : 'text-gray-900'}`}>
                              {book.title || 'Untitled Book'}
                            </h3>
                            <p className="text-gray-600 text-xs mb-2">
                              by {book.author || 'Unknown Author'}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                isSelected 
                                  ? 'bg-teal-100 text-teal-700' 
                                  : 'bg-gray-100 text-gray-600'
                              }`}>
                                {book.notes?.length || 0} note{(book.notes?.length || 0) !== 1 ? 's' : ''}
                              </span>
                              {isSelected && (
                                <div className="text-teal-600 text-xs font-medium">
                                  Currently viewing
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}