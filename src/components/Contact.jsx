import { useState } from 'react'
import emailjs from '@emailjs/browser'

export default function Contact({ profile }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitState, setSubmitState] = useState('idle')
  const handleChange = (event) => setFormData((previous) => ({ ...previous, [event.target.name]: event.target.value }))
  const handleSubmit = async (event) => {
    event.preventDefault()
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const adminTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_ADMIN
    const autoreplyTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_AUTOREPLY
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    if (!serviceId || !adminTemplateId || !autoreplyTemplateId || !publicKey) { setSubmitState('error'); return }
    setSubmitState('sending')
    try {
      await Promise.all([emailjs.send(serviceId, adminTemplateId, formData, publicKey), emailjs.send(serviceId, autoreplyTemplateId, formData, publicKey)])
      setSubmitState('success'); setFormData({ name: '', email: '', message: '' })
    } catch (error) { console.error('EmailJS submission failed:', error); setSubmitState('error') }
  }
  return <section id="contact" className="content-section contact-section"><div className="contact-grid"><div><p className="eyebrow">07 / Contact</p><h2>Have a good<br /><em>problem?</em></h2><p className="contact-intro">I&apos;m open to opportunities in web development, intelligent systems, software engineering, and project-based roles.</p><div className="contact-links"><a href={`mailto:${profile.email}`}>{profile.email} <span>↗</span></a><a href="https://github.com/blueorion05" target="_blank" rel="noreferrer">GitHub <span>↗</span></a><a href="https://www.linkedin.com/in/gerald-jhudiel-atienza/" target="_blank" rel="noreferrer">LinkedIn <span>↗</span></a></div></div><form className="contact-form" onSubmit={handleSubmit}><label htmlFor="contact-name">Your name</label><input id="contact-name" type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Jane Smith" /><label htmlFor="contact-email">Your email</label><input id="contact-email" type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="jane@company.com" /><label htmlFor="contact-message">What are you thinking about?</label><textarea id="contact-message" name="message" value={formData.message} onChange={handleChange} required rows="4" placeholder="A project, an opportunity, a question..." /><button className="button button--accent" type="submit" disabled={submitState === 'sending'}>{submitState === 'sending' ? 'Sending...' : 'Send message ↗'}</button>{submitState === 'success' && <p className="form-feedback form-feedback--success" role="status">Thanks, your message is on its way.</p>}{submitState === 'error' && <p className="form-feedback form-feedback--error" role="alert">Message delivery failed. Please check the form setup and try again.</p>}</form></div></section>
}
