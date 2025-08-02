"use client"

export default function Component() {
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 animated-gradient"></div>

      {/* Grain overlay */}
      <div className="grain-overlay"></div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white text-center max-w-4xl leading-tight">
          Want to be part of <span className="italic font-light">FF</span>?
        </h1>
      </div>

      {/* Optional navigation elements */}
      <div className="absolute top-8 left-8 z-20">
        <div className="text-white font-medium text-lg">FF</div>
      </div>

      <div className="absolute top-8 right-8 z-20">
        <button className="text-white">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M3 12H21M3 6H21M3 18H21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
