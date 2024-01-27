"use client"
import React, { useState } from 'react';
import { useToast } from "@/components/ui/use-toast"


const AdminProjectsFormEdit = (
    {
        _id,
        setEditTitle, editTitle,
        setEditLink, editLink,
        setEditDescription, editDescription,
        setEditTechnologies, editTechnologies }
) => {

    const { toast } = useToast()


    const handleUpdateProject = async (e, id) => {
        e.preventDefault();

        const updatedData = {
            title: editTitle,
            link: editLink,
            description: editDescription,
            technologies: editTechnologies.split(',').map((tech) => tech.trim()),
        };

        console.log(updatedData);

        try {
            const updateRes = await fetch(`https://manzoor-chopan.vercel.app/api/projects/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData),
            });

            if (!updateRes.ok) {
                toast({
                    title: `Failed To Update Project`,
                    description: ``,
                })
                throw new Error("Failed to update project");
            }

            toast({
                title: `Project Updated Successfully😃`,
                description: `To see the changes, please refresh the page. `,
            })
            // Handle success, update UI or perform other actions

        } catch (error) {
            console.error("Error updating project:", error.message);
        }
    };


    return (
        <div>
            {/* <h2 className="text-2xl font-semibold mb-4">Add New Project</h2> */}
            <form onSubmit={(e) => handleUpdateProject(e, _id)} className="space-y-2">
                <div>
                    <label htmlFor="projectTitle" className="block text-gray-700 font-semibold mb-2">
                        Project Title
                    </label>
                    <input
                        type="text"
                        id="projectTitle"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
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
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
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
                        value={editTechnologies}
                        onChange={(e) => setEditTechnologies(e.target.value)}
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
                        value={editLink}
                        onChange={(e) => setEditLink(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                >
                    Update Project
                </button>
            </form>
        </div>
    );
};

export default AdminProjectsFormEdit;
