import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from 'react-icons/fa'

export default function Contact({ profile }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [submitState, setSubmitState] = useState('idle')

  const contactDetails = [
    {
      icon: <FaEnvelope />,
      title: 'Email',
      content: profile.email,
      href: `mailto:${profile.email}`,
    },
    {
      icon: <FaPhone />,
      title: 'Phone',
      content: profile.phone,
      href: `tel:${profile.phone}`,
    },
    {
      icon: <FaMapMarkerAlt />,
      title: 'Address',
      content: profile.address,
    },
    {
      icon: <FaClock />,
      title: 'Availability',
      content: 'Open for inquiries and project discussions during weekdays and weekends.',
    },
  ]

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const adminTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_ADMIN
    const autoreplyTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_AUTOREPLY
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    if (!serviceId || !adminTemplateId || !autoreplyTemplateId || !publicKey) {
      setSubmitState('error')
      return
    }

    setSubmitState('sending')

    const templateParams = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
    }

    try {
      await Promise.all([
        emailjs.send(serviceId, adminTemplateId, templateParams, publicKey),
        emailjs.send(serviceId, autoreplyTemplateId, templateParams, publicKey),
      ])

      setSubmitState('success')
      setFormData({
        name: '',
        email: '',
        message: '',
      })
    } catch (error) {
      console.error('EmailJS submission failed:', error)
      setSubmitState('error')
    }
  }

  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-10">
      <div className="absolute inset-x-4 top-10 -z-10 h-40 rounded-full bg-primary/15 blur-3xl sm:inset-x-12" />

      <div className="card overflow-hidden border border-base-300/40 bg-base-200/70 shadow-2xl backdrop-blur-xl">
        <div className="card-body gap-8 p-6 sm:p-8 lg:p-10">
          <div className="max-w-3xl space-y-4">
            <p className="badge badge-outline uppercase tracking-[0.35em]">Contact</p>
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Let’s connect</h2>
            <p className="text-base-content/75">
              I’m open to opportunities in web development, intelligent systems, software engineering, and project-based roles.
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div className="space-y-4">
              {contactDetails.map((item) => (
                <div key={item.title} className="flex items-start gap-4 rounded-2xl border border-base-300/50 bg-base-100/70 p-5 shadow-lg shadow-black/10">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/15 text-2xl">
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-base-content">{item.title}</h3>
                    {item.href ? (
                      <a href={item.href} className="mt-1 block break-words text-base-content/70 transition hover:text-primary">
                        {item.content}
                      </a>
                    ) : (
                      <p className="mt-1 text-base-content/70">{item.content}</p>
                    )}
                  </div>
                </div>
              ))}

              <div className="rounded-2xl border border-base-300/50 bg-gradient-to-br from-base-100 to-base-200 p-5 shadow-lg shadow-black/10">
                <p className="text-sm font-semibold uppercase tracking-[0.3em]">Quick Links</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a href={`mailto:${profile.email}`} className="btn bg-pink-700 rounded-full">
                    Email Me
                  </a>
                  <a
                    href={`tel:${profile.phone}`}
                    className="btn btn-outline rounded-full border-base-content/20 text-base-content hover:bg-base-content/10"
                  >
                    Call Me
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-base-300/50 bg-base-100/80 p-5 shadow-2xl shadow-black/10 sm:p-6">
              <h3 className="text-2xl font-bold text-base-content">Send a message</h3>
              <p className="mt-2 text-sm text-base-content/70">
                Share your project details, questions, or collaboration ideas and I’ll get back to you.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-base-content/80">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="input input-bordered w-full border-base-300/60 bg-base-200/70 focus:border-primary focus:outline-none"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-base-content/80">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input input-bordered w-full border-base-300/60 bg-base-200/70 focus:border-primary focus:outline-none"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-base-content/80">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="textarea textarea-bordered w-full border-base-300/60 bg-base-200/70 focus:border-primary focus:outline-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button type="submit" className="btn bg-pink-700 w-full rounded-full text-base" disabled={submitState === 'sending'}>
                  {submitState === 'sending' ? 'Sending...' : 'Send Message'}
                </button>

                {submitState === 'success' && (
                  <p className="text-sm text-success">Your message was sent successfully.</p>
                )}

                {submitState === 'error' && (
                  <p className="text-sm text-error">
                    Message delivery failed. Check your EmailJS and environment values, then try again.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
