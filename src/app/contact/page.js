"use client"

import Lottie from "lottie-react";
import contact from './contact.json'

const ContactForm = () => {
    return (
        <div className="min-h-screen bg-[#ADA1EC] flex flex-col md:flex-row justify-evenly items-center gap-2 p-4 overflow-y-scroll">
            <div className="w-full md:w-[40%] h-[200px] md:h-full ">
                <Lottie animationData={contact} loop={true} />
            </div>
            <form className="w-full max-w-md mx-auto md:mr-4 p-4 z-50">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        placeholder="Your Name"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        placeholder="Your Email"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        placeholder="Your Phone Number"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
                        Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        rows="2"
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
