import React from 'react'

export default function Education({ education = [] }) {
  return (
    <section id="education" className="w-full border-b border-base-300/30 px-4 py-16 sm:px-6 lg:px-10">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="badge badge-outline mb-3 uppercase tracking-[0.35em]">Education</p>
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Academic background</h2>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {education.map((item) => (
          <article key={item.school} className="card border border-base-300/40 bg-base-200/65 shadow-xl backdrop-blur-sm">
            <div className="card-body gap-4 p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="card-title text-2xl leading-tight">{item.school}</h3>
                  <p className="text-base-content/65">{item.place}</p>
                </div>
                <span className="badge badge-secondary badge-outline">{item.date}</span>
              </div>
              <p className="text-base-content/80">{item.degree}</p>
              <p className="text-base-content/65">{item.note}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
