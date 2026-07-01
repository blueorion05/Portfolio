import React from 'react'

export default function Certifications({ certifications = [] }) {
  return (
    <section id="certifications" className="w-full border-b border-base-300/30 px-4 py-20 sm:px-6 lg:px-10">
      <div className="mb-8">
        <p className="badge badge-outline mb-3 uppercase tracking-[0.35em]">Certifications</p>
        <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Learning and credentials</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {certifications.map((item) => (
          <div key={item} className="rounded-3xl border border-base-300/40 bg-base-200/65 p-5 shadow-xl backdrop-blur-sm">
            <p className="text-base font-semibold text-base-content/85">{item}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
