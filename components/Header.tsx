'use client'

import { useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'

type NavItem = {
    name: string, href: string
}

const navigation: NavItem[] = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  

  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Kindle Notes</span>
              <p className='text-teal-600 text-3xl font-bold tracking-tight'>Kindle Notes</p>
            </a>
          </div>

          {/* Using Clerk's signin and signout utils to display user */}  

          <div className='flex items-center justify-center gap-2'>
            <SignedOut>
              <SignInButton>
                <button className='px-2 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm text-teal-600 font-semibold hover:bg-teal-600 hover:text-white transition-all duration-200 border border-2 border-teal-600 rounded-md flex items-center justify-center'>
                  <span className="hidden sm:inline">Log In</span>
                  <span className="sm:hidden">Login</span>
                </button>
              </SignInButton>
              
              <SignUpButton>
                <button className='px-2 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm text-white bg-teal-600 font-semibold hover:bg-white hover:text-teal-600 transition-all duration-200 border border-2 border-teal-600 rounded-md flex items-center justify-center'>
                  <span className="hidden sm:inline">Create Account</span>
                  <span className="sm:hidden">Sign Up</span>
                </button>
              </SignUpButton>
            </SignedOut>

            <SignedIn>
              <UserButton/>
            </SignedIn>

          </div>

        </nav>
      
      

      </header>

      <div className="relative isolate">
        <svg
          aria-hidden="true"
          className="absolute inset-0 -z-10 size-full mask-[radial-gradient(100%_100%_at_top_right,white,transparent)] stroke-gray-200"
        >
          <defs>
            <pattern
              x="50%"
              y={-1}
              id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
              width={200}
              height={200}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)" width="100%" height="100%" strokeWidth={0} />
        </svg>
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
            <div className="flex">
              <div className="relative flex items-center gap-x-4 rounded-full bg-white px-4 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                <span className="font-semibold text-teal-600">Simply Follow</span>
                <span aria-hidden="true" className="h-4 w-px bg-gray-900/10" />
                <a href="#" className="flex items-center gap-x-1">
                  <span aria-hidden="true" className="absolute inset-0" />
                  The Steps Below
                  <ChevronDownIcon aria-hidden="true" className="-mr-2 size-5 text-gray-400" />
                </a>
              </div>
            </div>
            <h1 className="mt-10 text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-7xl">
              All your Kindle notes. In one place.
            </h1>
            <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
                The quotes that moved you. The ideas you wanted to remember.
                Now gathered, searchable, and ready whenever you are.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <a
                href="#"
                className="transition-all duration-200 rounded-md bg-teal-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-teal-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
              >
                Get started
              </a>
              <a href="#" className="text-sm/6 font-semibold text-gray-900">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          <div className="mt-16 sm:mt-24 lg:mt-0 lg:shrink-0 lg:grow flex items-center justify-center">
            <Image
                src={'/kindle-image.png'}
                width={516}
                height={1084}
                alt='Image of kindle base model'
            />
          </div>
        </div>
      </div>
    </div>
  )
}