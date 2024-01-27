import axios from 'axios';
import React, { useState } from 'react';


import { useToast } from "@/components/ui/use-toast"

const AdminSkillsFormEdit = ({
    editSkillName,
    setEditSkillName,
    editDescription,
    setEditDescription,
    editProficiency,
    setEditProficiency,
    _id
}) => {

    const { toast } = useToast()

    const handleUpdateSkill = async (e, id) => {
        e.preventDefault();

        // Initial state
        let success = false;
        let errorMessage = '';

        const data = {
            name: editSkillName,
            proficiency: editProficiency,
            description: editDescription,
        };

        try {
            const res = await axios.put(`https://manzoor-chopan.vercel.app/api/skills/${id}`, data);
            success = res.status === 200;

            if (success) {
                toast({
                    title: 'Skill Updated Successfully 😃',
                    description: 'To see the changes, please refresh the page.',
                });
            }
        } catch (error) {
            errorMessage = 'Failed to update skill 😔';
        }
        if (!success && errorMessage) {
            toast({
                title: errorMessage,
                description: '',
            });
        }
    };

    return (
        <div >
            <form onSubmit={(e) => handleUpdateSkill(e, _id)} className="space-y-2">
                <div>
                    <label htmlFor="skillName" className="block text-gray-700 font-semibold mb-2">
                        Skill Name
                    </label>
                    <input
                        type="text"
                        id="skillName"
                        value={editSkillName}
                        onChange={(e) => setEditSkillName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">
                        Description
                    </label>
                    <textarea
                        id="description"
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        rows="2"
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        required
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="skillName" className="block text-gray-700 font-semibold mb-2">
                        Proficiency (%)
                    </label>
                    <input
                        type="number"
                        id="skillName"
                        value={editProficiency}
                        onChange={(e) => setEditProficiency(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                >
                    Update Skill
                </button>
            </form>
        </div>
    );
};

export default AdminSkillsFormEdit;
