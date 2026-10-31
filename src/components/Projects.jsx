import { useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'motion/react'
import { FaArrowUpRightFromSquare } from 'react-icons/fa6'
import { FaTimes } from 'react-icons/fa'
import hytgloballandingpage from '../assets/projects/hytgloballandingpage.png'
import connectme from '../assets/projects/connectme.png'
import hytech from '../assets/projects/hytech.png'
import smartgrade from '../assets/projects/smartgrade.png'
import semarec from '../assets/projects/semarec.png'
import obbybutyouresonic from '../assets/projects/obbybutyouresonic.png'
import localloan from '../assets/projects/localloan.png'
import productease from '../assets/projects/productease.png'

const projectImages = { 'HYT Global Landing Page': hytgloballandingpage, ConnectMe: connectme, 'HYTech Learning Management System': hytech, 'Smart Grade': smartgrade, SemaREC: semarec, 'Obby But You’re Sonic': obbybutyouresonic, LocalLoan: localloan, ProductEase: productease }
const getProjectImage = (title) => projectImages[title] || hytgloballandingpage

function ProjectLinks({ project }) {
  return <div className="project-links">
    {project.siteUrl && <a href={project.siteUrl} target="_blank" rel="noreferrer">Live site <FaArrowUpRightFromSquare aria-hidden="true" /></a>}
    {project.repoUrl && <a href={project.repoUrl} target="_blank" rel="noreferrer">Source <FaArrowUpRightFromSquare aria-hidden="true" /></a>}
  </div>
}

export default function Projects({ projects = [] }) {
  const [selectedProject, setSelectedProject] = useState(null)
  const [activeFilter, setActiveFilter] = useState('All')
  const featured = projects[3] || projects[0]
  const categories = ['All', ...new Set(projects.map((project) => project.category))]
  const filteredProjects = activeFilter === 'All' ? projects : projects.filter((project) => project.category === activeFilter)
  const visibleProjects = filteredProjects.filter((project) => project.title !== featured?.title)
  const supporting = visibleProjects.slice(0, 4)
  const additional = visibleProjects.slice(4)

  return <section id="projects" className="content-section projects-section">
    <div className="section-heading"><div><p className="eyebrow"><span className="status-dot" /> 06 / Experience discovery</p><h2>Built to be<br /><em>explored.</em></h2></div><p>Real applications, intelligent systems, and one game. Browse the work by what it does, not by imaginary numbers.</p></div>
    <div className="project-filters" aria-label="Filter projects">{categories.map((category) => <button type="button" className={activeFilter === category ? 'project-filter project-filter--active' : 'project-filter'} key={category} onClick={() => setActiveFilter(category)}>{category}</button>)}</div>
    <AnimatePresence mode="popLayout" initial={false}>
      {activeFilter === 'All' && featured && <motion.article className="featured-project" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: .28, ease: 'easeOut' }} layout><div className="featured-project__image"><img src={getProjectImage(featured.title)} alt={`${featured.title} preview`} loading="lazy" /><span className="featured-project__badge">Featured build</span></div><div className="featured-project__copy"><p className="project-number">01 / {featured.category}</p><h3>{featured.title}</h3><p>{featured.description}</p><p className="project-detail">{featured.details?.[0]}</p><div className="project-meta">{featured.stack.split(', ').map((item) => <span key={item}>{item}</span>)}</div><div className="project-actions"><ProjectLinks project={featured} />      <button type="button" className="detail-button" onClick={() => setSelectedProject(featured)}>Read case notes <FaArrowUpRightFromSquare aria-hidden="true" /></button></div></div></motion.article>}
      <div className="project-list" key={activeFilter}>{supporting.map((project, index) => <motion.article className="project-row" key={project.title} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: .24, delay: index * .055, ease: 'easeOut' }} layout><div className="project-row__number">{String(index + 2).padStart(2, '0')}</div><div className="project-row__image"><img src={getProjectImage(project.title)} alt={`${project.title} preview`} loading="lazy" /></div><div className="project-row__copy"><p className="project-number">{project.category}</p><h3>{project.title}</h3><p>{project.description}</p><div className="project-meta">{project.stack.split(', ').slice(0, 4).map((item) => <span key={item}>{item}</span>)}</div></div><div className="project-row__action"><button type="button" className="icon-button" onClick={() => setSelectedProject(project)}       aria-label={`Read details about ${project.title}`}><FaArrowUpRightFromSquare aria-hidden="true" /></button></div></motion.article>)}</div>
    </AnimatePresence>
    {additional.length > 0 && <div className="additional-work"><p className="eyebrow">Also in the archive</p>{additional.map((project) => <button type="button" key={project.title} onClick={() => setSelectedProject(project)}>{project.title} <span>{project.category}</span>     <b><FaArrowUpRightFromSquare aria-hidden="true" /></b></button>)}</div>}
    <AnimatePresence>
      {selectedProject && <motion.div className="project-dialog-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setSelectedProject(null)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><motion.section className="project-dialog" role="dialog" aria-modal="true" aria-labelledby="project-dialog-title" initial={{ opacity: 0, scale: .96, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: .97, y: 8 }} transition={{ type: 'spring', stiffness: 420, damping: 30 }}><button type="button" className="dialog-close" onClick={() => setSelectedProject(null)}       aria-label="Close project details"><FaTimes aria-hidden="true" /></button><p className="eyebrow">{selectedProject.category}</p><h3 id="project-dialog-title">{selectedProject.title}</h3><p>{selectedProject.description}</p><div className="dialog-notes">{selectedProject.details?.map((detail) => <p key={detail}>{detail}</p>)}</div><ProjectLinks project={selectedProject} /></motion.section></motion.div>}
    </AnimatePresence>
  </section>
}
