import Image from "next/image";
import profile from "./manzoor.jpeg";

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-[#ADA1EC] text-white flex flex-wrap-reverse justify-evenly items-center p-4 md:p-8">
            <div className="w-full md:w-1/2 lg:w-2/3 xl:w-3/4">
                <p className="text-center md:text-left">
                    As a seasoned full-stack web app developer with nearly three years of
                    experience, I specialize in bringing unconventional ideas to life.
                    Obsessed with unique design and user-friendly functionality, I thrive
                    on turning artistic visions into seamless digital experiences. Let's
                    collaborate and turn your unconventional concepts into exceptional
                    projects.
                </p>
            </div>
            <div className="rounded-full w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto md:mx-0 bg-transparent z-10 border overflow-hidden">
                <Image src={profile} width={400} height={400} alt="he" />
            </div>
        </div>
    );
};

export default AboutPage;
