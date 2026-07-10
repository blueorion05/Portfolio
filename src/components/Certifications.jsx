import React from 'react'
import { motion } from 'framer-motion'
import itSpecialistCybersecurity from '../assets/it-specialist-cybersecurity.png'
import webDevelopmentFundamentals from '../assets/web-development-fundamentals.png'
import javascriptEssentials2 from '../assets/javascript-essentials-2.png'
import pythonEssentials2 from '../assets/python-essentials-2.png'
import artificialIntelligenceFundamentals from '../assets/artificial-intelligence-fundamentals.png'
import projectManagementFundamentals from '../assets/project-management-fundamentals.png'

const certificationBadgeMap = {
  'IT Specialist Cybersecurity': itSpecialistCybersecurity,
  'Web Development Fundamentals': webDevelopmentFundamentals,
  'Javascript Essentials 2': javascriptEssentials2,
  'Python Essentials 2': pythonEssentials2,
  'Artificial Intelligence Fundamentals': artificialIntelligenceFundamentals,
  'Project Management Fundamentals': projectManagementFundamentals,
}

const normalizeCertification = (certification) => {
  if (typeof certification === 'string') {
    const [titlePart, issuerPart = '', datePart = ''] = certification.split(' - ')

    return {
      title: titlePart,
      issuer: issuerPart.replace(/,\s*$/, ''),
      date: datePart,
    }
  }

  return certification
}

export default function Certifications({ certifications = [] }) {
  const certificationItems = certifications.map((certification) => {
    const item = normalizeCertification(certification)

    return {
      ...item,
      badge: certificationBadgeMap[item.title],
    }
  })

  return (
    <section id="certifications" className="w-full border-b border-base-300/30 px-4 py-20 sm:px-6 lg:px-10">
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-2xl space-y-3">
            <p className="badge badge-outline uppercase tracking-[0.35em]">Certifications</p>
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Learning milestones and verified credentials</h2>
            <p className="max-w-xl text-base-content/70">
              Some set of badges earned through focused training and assessment in the subject area.
            </p>
          </div>
        </motion.div> 
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {certificationItems.map((item) => (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <article
              key={item.title}
              className="group overflow-hidden rounded-[1.75rem] border border-base-300/40 bg-base-200/70 shadow-xl transition duration-300 hover:-translate-y-1 hover:border-secondary/40 hover:shadow-2xl"
            >
              <div className="flex h-full flex-col">
                <div className="relative flex items-center justify-center bg-gradient-to-br from-base-100 via-base-200 to-base-300 p-6">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_45%)] opacity-70" />
                  <div className="relative overflow-hidden rounded-3xl border border-base-300/50 bg-base-100/80 p-4 shadow-lg backdrop-blur-sm transition duration-300 group-hover:scale-[1.02]">
                    <img
                      src={item.badge}
                      alt={`${item.title} badge`}
                      className="h-48 w-full max-w-[18rem] object-contain sm:h-52"
                      loading="lazy"
                    />
                  </div>
                </div>

                <div className="flex flex-1 flex-col gap-4 p-6">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="badge badge-secondary badge-outline">{item.issuer}</span>
                      <span className="badge badge-outline border-base-300/60 text-base-content/70">{item.date}</span>
                    </div>
                    <h3 className="text-xl font-bold leading-tight text-base-content sm:text-2xl">{item.title}</h3>
                  </div>
                </div>
              </div>
            </article>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
