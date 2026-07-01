import React from 'react'

export default function Experience({ experience = [] }) {
  if (!experience.length) return null
  const item = experience[0]
  return (
    <section id="experience" className="w-full border-b border-base-300/30 px-4 py-16 sm:px-6 lg:px-10">
      <div className="mb-8">
        <p className="badge badge-outline mb-3 uppercase tracking-[0.35em]">Experience</p>
        <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Professional experience</h2>
      </div>
      <div className="card border border-base-300/40 bg-base-200/65 shadow-xl backdrop-blur-sm">
        <div className="card-body gap-5 p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h3 className="card-title text-2xl">{item.title}</h3>
              <p className="text-base-content/65">{item.role} • {item.place}</p>
            </div>
            <span className="badge badge-secondary badge-outline w-fit">{item.date}</span>
          </div>
          <ul className="grid gap-3 pl-5 text-base-content/80 list-disc">
            {item.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
