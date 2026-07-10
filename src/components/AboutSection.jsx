import Education from './Education'
import Experience from './Experience'
import Certifications from './Certifications'
import { motion } from "framer-motion"

export default function AboutSection({ profile, education = [], experience = [], certifications = [] }) {
  return (
    <section id="about" className="w-full border-b border-base-300/30 px-4 py-20 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid gap-8 rounded-[2rem] border border-base-300/40 bg-base-200/70 p-6 shadow-xl backdrop-blur-sm sm:p-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:p-10">
            <div className="space-y-4">
              <p className="badge badge-outline uppercase tracking-[0.35em]">About Me</p>
              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">{profile.name}</h2>
              <p className="max-w-3xl text-base leading-8 text-base-content/75 sm:text-lg">
                I am a computer science graduate specialized in intelligent systems, focused on building practical solutions across web, mobile, and desktop development.
                My work blends clean interfaces, useful functionality, and problem-solving that supports real-world outcomes.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-base-300/40 bg-base-100/80 p-5">
                <p className="text-sm uppercase tracking-[0.28em] text-base-content/45">Role</p>
                <p className="mt-2 text-xl font-bold text-base-content">{profile.role}</p>
              </div>
              <div className="rounded-3xl border border-base-300/40 bg-base-100/80 p-5">
                <p className="text-sm uppercase tracking-[0.28em] text-base-content/45">Thesis</p>
                <p className="mt-2 text-xl font-bold text-base-content">{profile.thesis}</p>
              </div>
              <div className="rounded-3xl border border-base-300/40 bg-base-100/80 p-5 sm:col-span-2">
                <p className="text-sm uppercase tracking-[0.28em] text-base-content/45">Focus</p>
                <p className="mt-2 text-base leading-7 text-base-content/75">
                  I enjoy turning ideas into systems that are easy to use, maintain, and improve. My interests include UI/UX, software quality, and intelligent systems.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <Education education={education} />
        <Experience experience={experience} />
        <Certifications certifications={certifications} />
      </div>
    </section>
  )
}