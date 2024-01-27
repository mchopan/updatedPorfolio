"use client"
import ProjectCard from '@/components/ProjectCard'
import { useEffect, useState } from 'react'



const page = () => {

    const [projects, setProjects] = useState([])

    const getProjects = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/projects", {
                cache: "no-store",
            });

            if (!res.ok) {
                throw new Error("Failed to get Projects");
            }

            const data = await res.json();
            setProjects(data.allProjects);
        } catch (error) {
            console.error("Error fetching skills:", error);
        }
    };

    useEffect(() => {
        getProjects()
    }, [])

    return (
        <div className="h-[calc(100vh-80px)] bg-[#ADA1EC] flex justify-evenly items-center gap-3 flex-wrap overflow-y-scroll p-3">
            {
                projects.map(({ title, description, link, technologies, _id }) => {
                    return (
                        <ProjectCard
                            key={_id}
                            setProjects={setProjects}
                            title={title}
                            description={description}
                            link={link}
                            technologies={technologies}
                            _id={_id}

                        />
                    )
                })
            }
        </div>
    )
}

export default page