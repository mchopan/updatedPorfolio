"use client"
import Cloader from '@/assets/loader'
import ProjectCard from '@/components/ProjectCard'
import { useEffect, useState } from 'react'



const Page = () => {

    const [projects, setProjects] = useState([])

    const getProjects = async () => {
        try {
            const res = await fetch("https://manzoor-chopan.vercel.app/api/projects", {
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
                projects?.length == 0 ? <Cloader /> : (
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
                )
            }
        </div>
    )
}

export default Page