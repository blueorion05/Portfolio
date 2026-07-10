import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import hytgloballandingpage from '../assets/projects/hytgloballandingpage.png'
import connectme from '../assets/projects/connectme.png'
import hytech from '../assets/projects/hytech.png'
import smartgrade from '../assets/projects/smartgrade.png'
import semarec from '../assets/projects/semarec.png'
import obbybutyouresonic from '../assets/projects/obbybutyouresonic.png'
import localloan from '../assets/projects/localloan.jpg'
import productease from '../assets/projects/productease.png'

const getConciseDescription = (description) => description.split(/(?<=\.)\s+/)[0] || description

const projectImages = {
  'HYT Global Landing Page': hytgloballandingpage,
  ConnectMe: connectme,
  'HYTech Learning Management System': hytech,
  'Smart Grade': smartgrade,
  SemaREC: semarec,
  'Obby But You’re Sonic': obbybutyouresonic,
  LocalLoan: localloan,
  ProductEase: productease,
}

const getProjectImage = (title) => projectImages[title] || hytgloballandingpage

export default function Projects({ projects = [] }) {
  const sectionRef = useRef(null)

  return (
    <section ref={sectionRef} id="projects" className="mx-auto max-w-6xl space-y-10 border-b border-base-300/30 px-4 py-20 sm:px-6 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <p className="badge badge-outline mb-3 uppercase tracking-[0.35em]">Projects</p>
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Selected work</h2>
        </div>
      </motion.div>
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((project, index) => (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <article
              key={`${project.title}`}
              className="project-card group overflow-hidden rounded-3xl border border-base-300/40 bg-base-200/65 shadow-xl backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-2xl"
              style={{ '--reveal-delay': `${index * 140}ms` }}
            >
              <figure className="relative aspect-[16/10] overflow-hidden border-b border-base-300/30">
                <img
                  src={getProjectImage(project.title)}
                  alt={`${project.title} preview`}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-slate-950/0 transition duration-300 group-hover:bg-slate-950/45" />
                <div className="absolute inset-0 flex items-center justify-center gap-3 p-4 opacity-0 transition duration-300 group-hover:opacity-100">
                  {project.siteUrl ? (
                    <a
                      href={project.siteUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn bg-pink-700 btn-sm sm:btn-md"
                    >
                      Launch
                    </a>
                  ) : null}
                  {project.repoUrl ? (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-outline btn-sm sm:btn-md bg-base-100/90 backdrop-blur"
                    >
                      Repository
                    </a>
                  ) : null}
                </div>
              </figure>
              <div className="space-y-4 p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-2xl font-bold leading-tight tracking-tight">{project.title}</h3>
                  <span className="badge badge-outline badge-secondary whitespace-nowrap">{project.category}</span>
                </div>
                <p className="text-sm font-medium uppercase tracking-[0.25em] text-base-content/55">{project.stack}</p>
                <p className="text-sm leading-6 text-base-content/75">
                  {getConciseDescription(project.description)}
                </p>
              </div>
            </article>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
