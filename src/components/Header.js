"use client"

import { useAppContext } from "@/context"
import Link from "next/link"
import { useEffect, useState } from "react";

export default function Header() {

    const { user } = useAppContext();
    const [activeLink, setActiveLink] = useState(null);

    const handleLinkClick = (index) => {
        setActiveLink(index);
        localStorage.setItem("activeLink", index);
    };

    useEffect(() => {
        // Retrieve the active link from localStorage on component mount
        const storedActiveLink = localStorage.getItem("activeLink");
        if (storedActiveLink !== null) {
            setActiveLink(parseInt(storedActiveLink));
        }
    }, [activeLink]);


    return (
        <div className="bg-purple-300 text-white h-auto p-2 flex justify-around items-center">
            <div className="hidden md:flex">
                <Link
                    href={'/'}
                    className={`bg-purple-500 p-1 font-extrabold rounded hover:bg-purple-800 ${activeLink === 0 ? 'border-b-4' : ''}`}
                    onClick={() => handleLinkClick(0)}
                >M-CHOPAN</Link>
            </div>
            <div className="flex justify-between gap-4 flex-wrap">
                <Link
                    className={`bg-purple-500 p-1 rounded hover:bg-purple-800 ${activeLink === 1 ? 'border-b-4' : ''}`}
                    href={"/about"}
                    onClick={() => handleLinkClick(1)}
                >
                    About
                </Link>
                <Link
                    className={`bg-purple-500 p-1 rounded hover:bg-purple-800 ${activeLink === 2 ? 'border-b-4' : ''}`}
                    href={"/skills"}
                    onClick={() => handleLinkClick(2)}
                >
                    Skills
                </Link>
                <Link
                    className={`bg-purple-500 p-1 rounded hover:bg-purple-800 ${activeLink === 3 ? 'border-b-4' : ''}`}
                    href={"/projects"}
                    onClick={() => handleLinkClick(3)}
                >
                    Projects
                </Link>
                <Link
                    className={`bg-purple-500 p-1 rounded hover:bg-purple-800 ${activeLink === 4 ? 'border-b-4' : ''}`}
                    href={"contact"}
                    onClick={() => handleLinkClick(4)}
                >
                    Contact
                </Link>
                <div className="hidden md:flex lg:">
                    {!user ? (
                        <Link
                            className={`bg-purple-500 p-1 rounded hover:bg-purple-800 ${activeLink === 5 ? 'border-b-4' : ''}`}
                            href={'/login'}
                            onClick={() => handleLinkClick(5)}
                        >
                            Login
                        </Link>
                    ) : (
                        <Link
                            className={`bg-purple-500 p-1 rounded hover:bg-purple-800 ${activeLink === 6 ? 'border-b-4' : ''}`}
                            href={'/admin'}
                            onClick={() => handleLinkClick(6)}
                        >
                            {user?.username}
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}