const TAG_COLORS = {
  'React': 'bg-blue-100 text-blue-700',
  'Python': 'bg-yellow-100 text-yellow-700',
  'AI': 'bg-purple-100 text-purple-700',
  'LLM': 'bg-purple-100 text-purple-700',
  'Data Analysis': 'bg-green-100 text-green-700',
  'Automation': 'bg-orange-100 text-orange-700',
  'CI/CD': 'bg-red-100 text-red-700',
  'default': 'bg-slate-100 text-slate-600',
}

export default function Tag({ label }) {
  const color = TAG_COLORS[label] ?? TAG_COLORS.default
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
      {label}
    </span>
  )
}
