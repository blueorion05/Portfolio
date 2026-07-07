import React from 'react'

export default function Contact({ profile }) {
  return (
    <section id="contact" className="mx-auto max-w-6xl space-y-10 px-4 py-16 sm:px-6 lg:px-10">
      <div className="card overflow-hidden border border-base-300/40 bg-base-200/70 shadow-2xl backdrop-blur-xl">
        <div className="card-body gap-6 p-6 sm:p-8 lg:p-10">
          <div className="max-w-3xl space-y-4">
            <p className="badge badge-outline uppercase tracking-[0.35em]">Contact</p>
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Let’s connect</h2>
            <p className="text-base-content/75">I’m open to opportunities in web development, intelligent systems, software engineering, and project-based roles.</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a href={`mailto:${profile.email}`} className="btn btn-primary rounded-full">{profile.email}</a>
            <a href={`tel:${profile.phone}`} className="btn btn-outline rounded-full border-base-content/20 text-base-content hover:bg-base-content/10">{profile.phone}</a>
          </div>
        </div>
      </div>
    </section>
  )
}
