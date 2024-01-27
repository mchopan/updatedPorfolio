"use client"
import React, { useState } from "react";
import Lottie from "lottie-react";
import contact from './contact.json';
import { useToast } from "@/components/ui/use-toast";

const ContactForm = () => {


    const { toast } = useToast()

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });
    const discordUrl = "https://discord.com/api/webhooks/1200773590933590137/AcW-MytBNd2Bc-i_P6sflpOh_Kx8-FWDrYK_Ug4mQlrtSZdghHPXJVCqUzYW86lx8wHG"

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const message = {
            content: `New message from ${formData.name} (${formData.email}): ${formData.message}`
        };

        console.log(discordUrl)
        console.log(message)

        try {
            await fetch(discordUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(message)
            });
            setFormData({
                name: "",
                email: "",
                phone: "",
                message: ""
            })

            toast({
                title: `Message Send`,
                description: ``,
            })
            console.log("Message sent successfully");
        } catch (error) {
            toast({
                title: `Message Not Send`,
                description: ``,
            })
            console.error("Error sending message:", error);
        }
    };

    return (
        <div className="min-h-screen bg-[#ADA1EC] flex flex-col md:flex-row justify-evenly items-center gap-2 p-4 overflow-y-scroll">
            <div className="w-full md:w-[40%] h-[200px] md:h-full ">
                <Lottie animationData={contact} loop={true} />
            </div>
            <form className="w-full max-w-md mx-auto md:mr-4 p-4 z-50" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                        Name
                    </label>
                    <input
                        required
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        placeholder="Your Name"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                        Email
                    </label>
                    <input
                        required
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        placeholder="Your Email"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">
                        Phone Number
                    </label>
                    <input
                        required
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        placeholder="Your Phone Number"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
                        Message
                    </label>
                    <textarea
                        required
                        id="message"
                        name="message"
                        rows="2"
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        placeholder="Your Message"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                >
                    Send Message
                </button>
            </form>
        </div>
    );
};

export default ContactForm;
