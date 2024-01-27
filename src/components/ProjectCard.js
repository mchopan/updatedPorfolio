"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import AdminProjectsFormEdit from "./ProjectFormEdit";
import { useState } from "react";



const ProjectCard = ({ setProjects, _id, title, description, technologies, link }) => {


    const storedUser = JSON.parse(localStorage.getItem("PortFolioUser"));

    const [editTitle, setEditTitle] = useState('');
    const [editLink, setEditLink] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [editTechnologies, setEditTechnologies] = useState([]);

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`http://localhost:3000/api/projects/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                throw new Error("Failed to delete Skill");
            }
            setProjects((prevProjects) => prevProjects.filter((project) => project._id !== id));
        } catch (error) {
            console.error("Error deleting skill:", error.message);
        }
    };

    const handleEdit = async (id) => {
        try {
            const res = await fetch(`http://localhost:3000/api/projects/${id}`, { method: "GET" })
            const data = await res.json()
            console.log(data, "edit data")
            setEditTitle(data.project.title)
            setEditLink(data.project.link)
            setEditTechnologies(data.project.technologies.join(', '))  // Convert array to string
            console.log(editTechnologies, "edit tech")
            setEditDescription(data.project.description)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className=" w-[400px] cursor-pointer bg-opacity-70 bg-blur p-6 rounded-lg shadow-md hover:shadow-2xl transition duration-300 ease-in-out">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-white mb-2">{title}</h2>
                {
                    storedUser ? <div className="flex gap-1">
                        <AlertDialog>
                            <AlertDialogTrigger className="bg-red-300 p-1 rounded-sm text-white hover:bg-red-400">Delete</AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently be deleted
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDelete(_id)}>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                        <Dialog >
                            <DialogTrigger onClick={() => { handleEdit(_id) }} className="bg-blue-300 p-1 rounded-sm text-white hover:bg-blue-400">Edit</DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Edit</DialogTitle>
                                    <DialogDescription>
                                        <AdminProjectsFormEdit
                                            _id={_id}
                                            editTitle={editTitle}
                                            setEditTitle={setEditTitle}
                                            editLink={editLink}
                                            setEditLink={setEditLink}
                                            editDescription={editDescription}
                                            setEditDescription={setEditDescription}
                                            editTechnologies={editTechnologies}
                                            setEditTechnologies={setEditTechnologies}
                                        />
                                    </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    </div> : null
                }
            </div>
            <p className="text-gray-600 mb-4">{description}</p>
            <div className="mb-4">
                <span className="text-gray-700 font-semibold">Technologies:</span>{' '}
                {technologies.join(', ')}
            </div>
            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
            >
                View Project
            </a>
        </div>
    );
};

export default ProjectCard;
