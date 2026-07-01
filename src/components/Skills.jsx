import React from 'react'

export default function Skills({ skills = [], interests = [] }) {
  return (
    <section id="skills" className="w-full border-b border-base-300/30 px-4 py-20 sm:px-6 lg:px-10">
      <div className="mb-8">
        <p className="badge badge-outline mb-3 uppercase tracking-[0.35em]">Skills & Interests</p>
        <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Technical strengths and personal interests</h2>
      </div>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <span key={skill} className="badge badge-lg badge-outline border-base-300/50 bg-base-200/70 px-4 py-3 text-base-content/80">{skill}</span>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        {interests.map((interest) => (
          <span key={interest} className="badge badge-lg badge-secondary badge-outline px-4 py-3">{interest}</span>
        ))}
      </div>
    </section>
  )
}
