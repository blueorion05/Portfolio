import React from 'react'

export default function Projects({ projects = [] }) {
  return (
    <section id="projects" className="w-full border-b border-base-300/30 px-4 py-20 sm:px-6 lg:px-10">
      <div className="mb-8">
        <p className="badge badge-outline mb-3 uppercase tracking-[0.35em]">Projects</p>
        <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Selected work</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <article key={project.title} className="card border border-base-300/40 bg-base-200/65 shadow-xl backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-2xl">
            <div className="card-body gap-4 p-6">
              <div className="flex items-start justify-between gap-3">
                <h3 className="card-title text-2xl leading-tight">{project.title}</h3>
                <span className="badge badge-outline badge-secondary whitespace-nowrap">{project.category}</span>
              </div>
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-base-content/55">{project.stack}</p>
              <p className="text-base-content/80">{project.description}</p>
              <div className="space-y-2 text-sm text-base-content/70">
                {project.details.map((detail) => (
                  <p key={detail}>{detail}</p>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
