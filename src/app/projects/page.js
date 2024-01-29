"use client"
import Cloader from '@/assets/loader'
import ProjectCard from '@/components/ProjectCard'
import { useEffect, useState } from 'react'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import AdminProjectsForm from '@/components/ProjectForm'
import { useAppContext } from '@/context'

const Page = () => {

    const { user, setUser } = useAppContext()

    const [projectTitle, setProjectTitle] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [technologies, setTechnologies] = useState('');
    const [projectLink, setProjectLink] = useState('');

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
        <div className="bg-[#ADA1EC]">
            {
                user ? <div className="static shadow-md flex justify-end items-center">
                    <Dialog >
                        <DialogTrigger className="shadow-lg p-1 m-1 rounded-md text-white w-32">Add Project</DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Edit</DialogTitle>
                                <DialogDescription>
                                    <AdminProjectsForm
                                        projectTitle={projectTitle}
                                        setProjectTitle={setProjectTitle}
                                        projectDescription={projectDescription}
                                        setProjectDescription={setProjectDescription}
                                        technologies={technologies}
                                        setTechnologies={setTechnologies}
                                        projectLink={projectLink}
                                        setProjectLink={setProjectLink}
                                    />
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div> : null
            }
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
        </div >
    )
}

export default Page