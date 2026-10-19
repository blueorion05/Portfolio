const groups = [
  ['Build', ['JavaScript', 'React', 'HTML5', 'CSS3', 'Vite', 'Tailwind CSS', 'DaisyUI']],
  ['Program', ['Python', 'Java', 'C#', 'Lua', 'SQL', 'Firebase']],
  ['Think', ['UI/UX Design', 'Machine Learning', 'Computer Vision', 'System Testing', 'Troubleshooting', 'Project Management']],
  ['Work with', ['Git', 'GitHub', 'Figma', 'Android Studio', 'Roblox Studio']],
]

export default function Skills({ skills = [] }) {
  const available = new Set(skills)
  return <section id="tech" className="content-section skills-section"><div className="section-heading"><div><p className="eyebrow">05 / The toolkit</p><h2>Many tools.<br /><em>One approach.</em></h2></div><p>I choose technology around the problem, not the other way around. These are the tools and disciplines I return to most often.</p></div><div className="skill-index">{groups.map(([title, items]) => <div className="skill-group" key={title}><h3>{title}</h3><div>{items.filter((item) => available.has(item) || ['HTML5', 'CSS3', 'Tailwind CSS', 'DaisyUI', 'SQL', 'Git', 'GitHub', 'Figma'].includes(item)).map((item) => <span key={item}>{item}</span>)}</div></div>)}</div></section>
}
