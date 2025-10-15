import React from 'react'

function ProjectCard({title, prof, desc, tags}) {
  return (
    <div className='bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer'>
        <div className='flex justify-end gap-x-2 mb-4'>
            {tags.map((tag) => (
            <span key={tag} className='px-3 py-1 text-xs font-semibold text-white bg-blue-500 rounded-full'>
                {tag}
            </span>
            ))}
        </div>

        <div>
            <h3 className='text-lg font-bold text-gray-900'>{title}</h3>
            <p className='text-sm text-gray-500 mt-1'>Professor: {prof}</p>
            <p className='text-gray-700 mt-3 text-sm'>{desc}</p>
        </div>
    </div>
  )
}

export default ProjectCard