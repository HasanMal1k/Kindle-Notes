import React from 'react'
import { Github, Linkedin } from 'lucide-react'

function Footer() {
  return (
    <footer className='bg-gray-50 border-t border-gray-200 py-6'>
      <div className='max-w-7xl mx-auto px-6 lg:px-8'>
        <div className='flex items-center justify-center gap-6 text-sm text-gray-600'>
          <span>Developed by Hasan Malik</span>
          <div className='flex items-center gap-4'>
            <a 
              href="https://github.com/HasanMal1k/" 
              target="_blank" 
              rel="noopener noreferrer"
              className='hover:text-teal-600 transition-colors duration-200'
            >
              <Github className="h-5 w-5" />
            </a>
            <a 
              href="https://www.linkedin.com/in/hasan-mal1k/" 
              target="_blank" 
              rel="noopener noreferrer"
              className='hover:text-teal-600 transition-colors duration-200'
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer