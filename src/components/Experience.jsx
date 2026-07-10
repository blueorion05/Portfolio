import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import ojt1 from '../assets/ojt1.jpg'
import ojt2 from '../assets/ojt2.jpg'
import ojt3 from '../assets/ojt3.jpg'
import ojt5 from '../assets/ojt5.jpg'
import ojt6 from '../assets/ojt6.jpg'

export default function Experience({ experience = [] }) {
  if (!experience.length) return null
  const item = experience[0]
  const slides = [ojt1, ojt2, ojt3, ojt5, ojt6]
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    if (slides.length <= 1) return undefined

    const intervalId = window.setInterval(() => {
      setActiveSlide((currentSlide) => (currentSlide + 1) % slides.length)
    }, 5000)

    return () => window.clearInterval(intervalId)
  }, [slides.length])

  const goToPreviousSlide = () => {
    setActiveSlide((currentSlide) => (currentSlide - 1 + slides.length) % slides.length)
  }

  const goToNextSlide = () => {
    setActiveSlide((currentSlide) => (currentSlide + 1) % slides.length)
  }

  return (
    <section id="experience" className="w-full border-b border-base-300/30 px-4 py-20 sm:px-6 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <p className="badge badge-outline mb-3 uppercase tracking-[0.35em]">Experience</p>
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Professional experience</h2>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid gap-6 overflow-hidden rounded-3xl border border-base-300/40 bg-base-200/65 shadow-xl backdrop-blur-sm lg:grid-cols-[1.05fr_0.95fr]">
          <div className="p-6 sm:p-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-2">
                <h3 className="text-2xl font-black tracking-tight sm:text-3xl">{item.title}</h3>
                <p className="text-base-content/65">
                  {item.role} • {item.place}
                </p>
              </div>
              <span className="badge badge-secondary badge-outline w-fit whitespace-nowrap">
                {item.date}
              </span>
            </div>
            <ul className="mt-6 grid gap-3 pl-5 text-base-content/80 list-disc">
              {item.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>

          <div className="relative overflow-hidden border-t border-base-300/30 lg:border-l lg:border-t-0 lg:self-start">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950/40 via-base-300/10 to-transparent" />
            <div
              className="flex h-[260px] sm:h-[280px] lg:h-[400px] transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
              {slides.map((slide, index) => (
                <div key={slide} className="relative h-full min-w-full">
                  <img
                    src={slide}
                    alt={`Internship photo ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>

            <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
              <button
                type="button"
                onClick={goToPreviousSlide}
                aria-label="Previous internship photo"
                className="btn btn-circle border-0 bg-base-100/80 text-base-content shadow-lg backdrop-blur-sm hover:bg-base-100">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>

              <button
                type="button"
                onClick={goToNextSlide}
                aria-label="Next internship photo"
                className="btn btn-circle border-0 bg-base-100/80 text-base-content shadow-lg backdrop-blur-sm hover:bg-base-100">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m9 6 6 6-6 6" />
                </svg>
              </button>
            </div>

            <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
              {slides.map((slide, index) => (
                <button
                  key={slide}
                  type="button"
                  onClick={() => setActiveSlide(index)}
                  aria-label={`Go to internship photo ${index + 1}`}
                  aria-current={index === activeSlide}
                  className={`h-2.5 rounded-full transition-all duration-300 ${index === activeSlide ? 'w-8 bg-white' : 'w-2.5 bg-white/45 hover:bg-white/70'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
