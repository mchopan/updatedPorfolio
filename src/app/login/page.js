"use client"

import { useToast } from "@/components/ui/use-toast";
import { useAppContext } from "@/context";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LoginPage = () => {

    const {
        user, setUser
    } = useAppContext()

    const router = useRouter()
    const { toast } = useToast()

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    const handleLogin = async () => {
        try {
            const user = await axios.post("http://localhost:3000/api/users/login", { username, password })
            let userDetails;
            if (user.data.foundUser) {
                if (typeof window !== "undefined") {
                    userDetails = await localStorage.setItem("PortFolioUser", JSON.stringify(user.data.foundUser));
                }
                setUser(userDetails)
                console.log(user, "user in login")
                toast({
                    title: `Welcome Back ${user.data.foundUser.username}😃`,
                    description: `Status:${user.statusText}`,
                })
                router.push("/admin")
            }
            else {
                toast({
                    title: `Sorry ${user.data.foundUser.username}😃`,
                    description: `Status:${user.statusText}`,
                })
            }
        }
        catch (error) {
            toast({
                title: `Error:  ${error.message}`,
                description: ``,
            })
        }
    };

    return (
        <div className="h-[calc(100vh-80px)] bg-[#ADA1EC] flex justify-evenly items-center gap-2 flex-wrap p-2 overflow-y-scroll">
            <form className="bg-white p-8 rounded shadow-md w-96" >
                <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">
                        Username or Email
                    </label>
                    <input
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        type="text"
                        id="username"
                        name="username"
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        placeholder="Enter your username or email"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
                        Password
                    </label>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type="password"
                        id="password"
                        name="password"
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        placeholder="Enter your password"
                        required
                    />
                </div>

                <button
                    onClick={handleLogin}
                    type="button"
                    className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
