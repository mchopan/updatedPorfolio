import axios from 'axios';
import React, { useState } from 'react';


import { useToast } from "@/components/ui/use-toast"

const AdminSkillsForm = () => {

    const { toast } = useToast()

    const [skillName, setSkillName] = useState('');
    const [description, setDescription] = useState('');
    const [proficiency, setProficiency] = useState(70);

    const addSkill = async () => {
        const data = { name: skillName, proficiency, description, }
        try {
            const res = await axios.post("https://manzoor-chopan.vercel.app/api/skills", data);
            toast({
                title: "Skill Added 😃",
                description: `Status:${res.statusText}`,
            })

        } catch (error) {
            toast({
                title: "Error in Adding Skill 😔",
                description: "",
            })
        }
    }

    const handleAddSkill = (e) => {
        e.preventDefault()
        addSkill()
        setSkillName('')
        setDescription('');
        setProficiency(70)
    };

    return (
        <div >
            <form onSubmit={handleAddSkill} className="space-y-2">
                <div>
                    <label htmlFor="skillName" className="block text-gray-700 font-semibold mb-2">
                        Skill Name
                    </label>
                    <input
                        type="text"
                        id="skillName"
                        value={skillName}
                        onChange={(e) => setSkillName(e.target.value)}
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
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
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
                        value={proficiency}
                        onChange={(e) => setProficiency(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                >
                    Add Skill
                </button>
            </form>
        </div>
    );
};

export default AdminSkillsForm;
