import React from "react"
import { Quote } from 'lucide-react'

type BookQuote = {
  quote: string,
  book: string,
  author: string
}

const bookQuotes: BookQuote[] = [
  {
    quote: "It is our choices, Harry, that show what we truly are, far more than our abilities.",
    book: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling"
  },
  {
    quote: "The only way out of the labyrinth of suffering is to forgive.",
    book: "Looking for Alaska",
    author: "John Green"
  },
  {
    quote: "So we beat on, boats against the current, borne back ceaselessly into the past.",
    book: "The Great Gatsby",
    author: "F. Scott Fitzgerald"
  },
  {
    quote: "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness.",
    book: "A Tale of Two Cities",
    author: "Charles Dickens"
  },
  {
    quote: "All we have to decide is what to do with the time that is given us.",
    book: "The Fellowship of the Ring",
    author: "J.R.R. Tolkien"
  }
]

export default function BookQuotes() {
  const [centerQuote, ...sideQuotes] = bookQuotes

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-base/7 font-semibold text-teal-600">Literary Wisdom</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-700 sm:text-5xl">
            Words that <span className="text-teal-500">inspire</span>
          </p>
        </div>

        {/* Center Quote - Featured */}
        <div className="mx-auto max-w-4xl text-center mb-20">
          <div className="relative">
            
            <blockquote className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-700 leading-tight relative z-10">
              <Quote className="inline -rotate-180 -translate-y-6 -translate-x-2 text-teal-500 text-center"/>
                {centerQuote.quote}
              <Quote className="inline text-teal-500 -translate-y-6"/>
            </blockquote>
           
          </div>
          <div className="mt-12 text-center ">
            <div className="text-xl font-semibold text-gray-700">{centerQuote.book}</div>
            <div className="text-lg text-gray-600 mt-1">by {centerQuote.author}</div>
          </div>
        </div>

        {/* Side Quotes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {sideQuotes.map((quote, index) => (
            <div key={index} className="relative">
              <blockquote className="text-lg font-bold text-gray-700 leading-tight relative z-10 mb-6 text-center">
                <Quote className="inline -rotate-180 -translate-y-2 text-teal-500"/>{'  '}{quote.quote}{'  '}<Quote className="inline text-teal-500"/>
              </blockquote>
              <div className="text-center">
                <div className="font-semibold text-gray-700 text-sm">{quote.book}</div>
                <div className="text-gray-600 text-xs mt-1">by {quote.author}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
