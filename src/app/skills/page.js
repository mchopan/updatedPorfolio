"use client"

import { useEffect, useState } from "react"

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
import AdminSkillsFormEdit from "@/components/SkillFormEdit"

const SkillPage = () => {

    const [allSkills, setAllSkills] = useState([]);

    const [editSkillName, setEditSkillName] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [editProficiency, setEditProficiency] = useState();

    const [userExist, setUserExist] = useState()

    const getSkills = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/skills", {
                cache: "no-store",
            });

            if (!res.ok) {
                throw new Error("Failed to get Skills");
            }

            const data = await res.json();
            setAllSkills(data.allSkills);
        } catch (error) {
            console.error("Error fetching skills:", error);
        }
    };

    // Function to handle skill deletion
    const handleDelete = async (id) => {
        try {
            const res = await fetch(`http://localhost:3000/api/skills/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                throw new Error("Failed to delete Skill");
            }
            setAllSkills((prevSkills) => prevSkills.filter((skill) => skill._id !== id));
        } catch (error) {
            console.error("Error deleting skill:", error.message);
        }
    };

    const handleEdit = async (id) => {
        try {
            const res = await fetch(`http://localhost:3000/api/skills/${id}`, { method: "GET" })
            const data = await res.json()
            console.log(data, "edit data")
            setEditSkillName(data.skill.name)
            setEditDescription(data.skill.description)
            setEditProficiency(data.skill.proficiency)
        } catch (error) {
            console.log(error)
        }
    }

    // let storedUser;

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("PortFolioUser"));
        setUserExist(storedUser)
        getSkills();
    }, []);


    return (
        <div className="h-[calc(100vh-80px)] bg-[#ADA1EC] flex justify-evenly items-center gap-2 flex-wrap p-2 overflow-y-scroll">
            {
                allSkills.map(({ _id, name, description, proficiency }) => {
                    return (
                        <div key={name} className="w-[400px] cursor-pointer bg-opacity-70 bg-blur p-6 rounded-lg shadow-md hover:shadow-2xl transition duration-300 ease-in-out">
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-semibold text-white mb-2">{name}</h2>
                                {
                                    userExist ? <div className="flex gap-1">
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
                                                        <AdminSkillsFormEdit
                                                            _id={_id}
                                                            editSkillName={editSkillName}
                                                            setEditSkillName={setEditSkillName}
                                                            editDescription={editDescription}
                                                            setEditDescription={setEditDescription}
                                                            editProficiency={editProficiency}
                                                            setEditProficiency={setEditProficiency}
                                                        />
                                                    </DialogDescription>
                                                </DialogHeader>
                                            </DialogContent>
                                        </Dialog>
                                    </div> : null
                                }
                            </div>
                            <p className="text-gray-900 mb-4">{description}</p>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <svg
                                        className="w-6 h-6 text-green-400 mr-2"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span className="text-green-400 font-semibold">{proficiency}%</span>
                                </div>
                                <button className="text-gray-700 hover:text-white focus:outline-none">
                                    Learn More
                                </button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default SkillPage