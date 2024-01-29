import axios from 'axios';
import React, { useState } from 'react';
import { useToast } from "@/components/ui/use-toast"


const AdminProjectsForm = ({
    projectTitle,
    setProjectTitle,
    projectDescription,
    setProjectDescription,
    technologies,
    setTechnologies,
    projectLink,
    setProjectLink,
}) => {

    const { toast } = useToast()

    const addProject = async () => {
        const data = {
            title: projectTitle,
            description: projectDescription,
            technologies: technologies.split(',').map((tech) => tech.trim()),
            link: projectLink
        };

        try {
            const res = await axios.post("https://manzoor-chopan.vercel.app/api/projects", data);
            toast({
                title: "Project Added 😃",
                description: res.statusText,
            })
        } catch (error) {
            console.error("Error adding project:", error);
            toast({
                title: "Error While Adding Project 😔",
                description: "",
            })
        }
    };

    const handleAddProject = (e) => {
        e.preventDefault();
        addProject();
        setProjectTitle("");
        setProjectDescription("")
        setTechnologies("")
        setProjectLink("")

    };

    return (
        <div>
            {/* <h2 className="text-2xl font-semibold mb-4">Add New Project</h2> */}
            <form onSubmit={handleAddProject} className="space-y-2">
                <div>
                    <label htmlFor="projectTitle" className="block text-gray-700 font-semibold mb-2">
                        Project Title
                    </label>
                    <input
                        type="text"
                        id="projectTitle"
                        value={projectTitle}
                        onChange={(e) => setProjectTitle(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="projectDescription" className="block text-gray-700 font-semibold mb-2">
                        Project Description
                    </label>
                    <textarea
                        id="projectDescription"
                        value={projectDescription}
                        onChange={(e) => setProjectDescription(e.target.value)}
                        rows="2"
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        required
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="projectTitle" className="block text-gray-700 font-semibold mb-2">
                        Technalogies Used
                    </label>
                    <input
                        type="text"
                        id="technologies"
                        value={technologies}
                        onChange={(e) => setTechnologies(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="projectTitle" className="block text-gray-700 font-semibold mb-2">
                        Project Link
                    </label>
                    <input
                        type="text"
                        id="projectLink"
                        value={projectLink}
                        onChange={(e) => setProjectLink(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                >
                    Add Project
                </button>
            </form>
        </div>
    );
};

export default AdminProjectsForm;
