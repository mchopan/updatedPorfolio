"use client"
import AdminProjectsForm from '@/components/ProjectForm';
import AdminSkillsForm from '@/components/SkillForm';
import { useToast } from '@/components/ui/use-toast';
import { useAppContext } from '@/context';
import { redirect, useRouter } from 'next/navigation';
import React, { useLayoutEffect, useState } from 'react';

const AdminPage = () => {


    const { user, setUser } = useAppContext()

    const router = useRouter();
    const { toast } = useToast();

    useLayoutEffect(() => {
        const userDetails = localStorage.getItem("PortFolioUser")
        const loggedInUser = JSON.parse(userDetails);
        console.log(loggedInUser, "uere in admin")
        if (!loggedInUser) {
            redirect("/login")
        }
    }, [])

    const [showSkillsForm, setShowSkillsForm] = useState(true);

    const handleLogout = async () => {
        await localStorage.removeItem("PortFolioUser");
        setUser();
        toast({
            title: `Logout Successfully😃`,
            description: ``,
        });
        router.push('/');
    };

    return (
        <div className="h-[calc(100vh-90px)] bg-[#ADA1EC] flex flex-col p-2 overflow-y-scroll">
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col items-center mb-4">
                    <div className="flex space-x-4 mb-4">
                        <button
                            onClick={() => setShowSkillsForm(true)}
                            className={`px-4 py-2 font-semibold rounded ${showSkillsForm ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
                                }`}
                        >
                            Skills
                        </button>
                        <button
                            onClick={() => setShowSkillsForm(false)}
                            className={`px-4 py-2 font-semibold rounded ${!showSkillsForm ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
                                }`}
                        >
                            Projects
                        </button>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 font-semibold rounded bg-orange-400 hover:bg-orange-200"
                    >
                        Logout
                    </button>
                </div>
                <div className="w-full">
                    {showSkillsForm ? <AdminSkillsForm /> : <AdminProjectsForm />}
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
