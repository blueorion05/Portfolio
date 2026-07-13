import React from 'react'
import lspuLogo from '../assets/lspulogo.png'
import sciHighLogo from '../assets/scihighlogo.png'
import { motion } from 'framer-motion'

const educationAssets = {
  'Laguna State Polytechnic University': {
    logo: lspuLogo,
    logoAlt: 'Laguna State Polytechnic University logo',
  },
  'San Pablo City Science Integrated High School': {
    logo: sciHighLogo,
    logoAlt: 'San Pablo City Science Integrated High School logo',
  },
}

export default function Education({ education = [] }) {
  return (
    <section id="education" className="w-full border-b border-base-300/30 px-4 py-20 sm:px-6 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="mb-8 max-w-3xl space-y-3">
          <p className="badge badge-outline uppercase tracking-[0.35em]">Education</p>
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Academic background</h2>
          <p className="max-w-2xl text-base-content/65">
            A quick look at the schools that shaped my foundation in computer science and STEM, with the achievements I carried through each stage.
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="grid items-stretch gap-5 md:grid-cols-2 xl:gap-6">
          {education.map((item) => {
            const asset = educationAssets[item.school]

            return (
              <article
                key={item.school}
                className="group h-full w-full overflow-hidden rounded-[2rem] border border-base-300/40 bg-base-200/70 shadow-xl backdrop-blur-sm transition duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl"
              >
                <div className="relative h-full p-6 sm:p-7">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.12),transparent_26%)] opacity-80" />
                  <div className="relative z-10 flex h-full flex-col gap-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex min-w-0 items-center gap-4">
                        <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-2xl border border-base-300/50 bg-base-100/80 p-2 shadow-lg transition duration-300 group-hover:scale-105">
                          <img src={asset?.logo} alt={asset?.logoAlt ?? `${item.school} logo`} className="h-full w-full rounded-full object-contain" />
                        </div>
                        <div className="min-w-0 space-y-1">
                          <div className="min-h-[4.5rem] sm:min-h-[5rem]">
                            <h3 className="max-w-[30ch] text-2xl font-black leading-tight tracking-tight text-base-content sm:text-[1.7rem]">{item.school}</h3>
                          </div>
                          <p className="text-sm font-medium uppercase tracking-[0.22em] text-base-content/55">{item.place}</p>
                        </div>
                      </div>
                      <span className="badge badge-secondary badge-outline shrink-0 px-4 py-3 text-xs uppercase tracking-[0.25em]">{item.date}</span>
                    </div>

                    <div className="grid gap-3">
                      <p className="min-h-[3.5rem] text-base font-semibold text-base-content/85 sm:min-h-[4rem] sm:text-lg">{item.degree}</p>
                    </div>

                    {item.highlights?.length > 0 && (
                      <div className="mt-auto flex flex-wrap gap-2 pt-1">
                        {item.highlights.map((highlight) => (
                          <span key={highlight} className="badge badge-outline border-sky-400/30 bg-sky-400/10 px-3 py-3 text-[0.68rem] uppercase tracking-[0.2em] text-sky-100">
                            {highlight}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}
