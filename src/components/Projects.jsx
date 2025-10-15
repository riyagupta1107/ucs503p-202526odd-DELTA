import React from 'react'
import ProjectCard from './ProjectCard'

const projects = [
    {
        id: 1,
        title: 'AI-Driven Robotics for Sustainable Agriculture',
        prof: 'Dr. ABC',
        desc: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque est facilis omnis, porro fugiat provident. Dicta eaque doloremque quo modi aliquid tempore ratione a accusamus eligendi assumenda. Sed, amet enim?',
        tags: ['Robotics','AI']
    },
    {
        id: 2,
        title: 'Emotion aware virtual assistants for Indic Languages',
        prof: 'Dr. ABC',
        desc: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque est facilis omnis, porro fugiat provident. Dicta eaque doloremque quo modi aliquid tempore ratione a accusamus eligendi assumenda. Sed, amet enim?',
        tags: ['AI','ML']
    }
]

function Projects() {
  return (
    <div className='bg-gray-50 p-8'>
        <h1 className='text-3xl font-bold mb-8'>PROJECTS</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {projects.map((p) => (
                <ProjectCard
                    key={p.id} title={p.title}
                    prof={p.prof}
                    desc={p.desc}
                    tags={p.tags}
                />
            ))}
        </div>
    </div>
  )
}

export default Projects