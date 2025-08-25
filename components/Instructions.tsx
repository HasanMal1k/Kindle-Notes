import React from 'react'
import { CircleCheck, Smartphone, FolderOpen, Upload, CheckCircle, UserRound } from 'lucide-react'

function Instructions() {
  return (
    <div className="bg-white py-24 sm:py-32" id="instructions">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-base/7 font-semibold text-teal-600">How It Works</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Incredibly Simple To Use
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Get your Kindle notes organized in just four easy steps. No complicated setup required.
          </p>
        </div>

        {/* Video + Steps Grid */}
        <div className="mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Video Showcase */}
            <div className="order-2 lg:order-1 flex justify-center">
              <div className="relative rounded-2xl bg-gray-100 aspect-video w-full max-w-2xl border border-gray-200 shadow-lg overflow-hidden">
                <video
                  className="w-full h-full object-cover"
                  src="/guide.mp4"
                  controls
                  autoPlay
                  loop
                  muted
                />
              </div>
            </div>

            {/* Steps */}
            <div className="order-1 lg:order-2">
              <div className="space-y-6">
                
                {/* Step 1 */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 border border-teal-200 rounded-full flex items-center justify-center">
                    <Smartphone className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      1. Connect Your Kindle
                    </h3>
                    <p className="text-gray-600">
                      Connect your Kindle to your PC using the USB cable that came with your device.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 border border-teal-200 rounded-full flex items-center justify-center">
                    <FolderOpen className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      2. Go to Documents
                    </h3>
                    <p className="text-gray-600">
                      Navigate to your Kindle's documents folder to find your saved highlights and notes.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 border border-teal-200 rounded-full flex items-center justify-center">
                    <Upload className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      3. Drag 'My Clippings' File
                    </h3>
                    <p className="text-gray-600">
                      Simply drag and drop the 'My Clippings.txt' file onto this website. We'll handle the rest.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 border border-teal-200 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      4. Done!
                    </h3>
                    <p className="text-gray-600">
                      Your notes are now organized, searchable, and ready to inspire your next great idea.
                    </p>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="mt-10 pt-8 border-t border-gray-200">
                <div className="flex flex-col gap-4 text-teal-600/80">
                  <div className="flex items-center gap-2">
                    <CircleCheck className="w-5 h-5" />
                    <span className="font-medium">
                      Ready to get started? Upload your file now!
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <UserRound className="w-5 h-5" />
                    <span className="font-medium">
                      Sign up free to access your notes anywhere.
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>        
      </div>
    </div>
  )
}

export default Instructions
