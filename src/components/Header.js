"use client"

import { useAppContext } from "@/context"
import Link from "next/link"
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from "next/navigation";


export default function Header() {


    const router = useRouter();
    const { toast } = useToast();

    const { user, setUser } = useAppContext();
    const [activeLink, setActiveLink] = useState(null);

    const handleLinkClick = (index) => {
        setActiveLink(index);
        localStorage.setItem("activeLink", index);
    };

    const handleLogout = async (index) => {
        setActiveLink(index);
        localStorage.setItem("activeLink", index);
        await localStorage.removeItem("PortFolioUser");
        setUser();
        toast({
            title: `Logout Successfully😃`,
            description: ``,
        });
        router.push('/login');
    }

    useEffect(() => {
        const storedActiveLink = localStorage.getItem("activeLink");
        if (storedActiveLink !== null) {
            setActiveLink(parseInt(storedActiveLink));
        }
    }, [activeLink]);


    return (
        <div className="bg-[#ADA1EC] text-white h-auto p-2 flex justify-around items-center">
            <div className="">
                <Link
                    href={'/'}
                    className={`p-1 rounded hover:bg-purple-800 ${activeLink === 0 ? 'border-b-4' : ''}`}
                    onClick={() => handleLinkClick(0)}
                >
                    Manzoor
                </Link>
            </div>
            <div className="flex justify-between gap-1 flex-wrap">
                <Link
                    className={` p-1 rounded hover:bg-purple-800 ${activeLink === 1 ? 'border-b-4' : ''}`}
                    href={"/about"}
                    onClick={() => handleLinkClick(1)}
                >
                    About
                </Link>
                <Link
                    className={` p-1 rounded hover:bg-purple-800 ${activeLink === 2 ? 'border-b-4' : ''}`}
                    href={"/skills"}
                    onClick={() => handleLinkClick(2)}
                >
                    Skills
                </Link>
                <Link
                    className={`p-1 rounded hover:bg-purple-800 ${activeLink === 3 ? 'border-b-4' : ''}`}
                    href={"/projects"}
                    onClick={() => handleLinkClick(3)}
                >
                    Projects
                </Link>
                <Link
                    className={` p-1 rounded hover:bg-purple-800 ${activeLink === 4 ? 'border-b-4' : ''}`}
                    href={"contact"}
                    onClick={() => handleLinkClick(4)}
                >
                    Contact
                </Link>
                <div className="hidden md:flex lg:">
                    {!user ? (
                        <Link
                            className={` p-1 rounded hover:bg-purple-800 ${activeLink === 5 ? 'border-b-4' : ''}`}
                            href={'/login'}
                            onClick={() => handleLinkClick(5)}
                        >
                            Login
                        </Link>
                    ) : (
                        <Link
                            className={`p-1 rounded hover:bg-purple-800 ${activeLink === 6 ? 'border-b-4' : ''}`}
                            href={'/skills'}
                            onClick={() => handleLogout(6)}
                        >
                            Logout

                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}