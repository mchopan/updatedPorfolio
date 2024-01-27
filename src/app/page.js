"use client"
import React, { Suspense, useEffect, useState } from "react";
import Lottie from "lottie-react";
import loader from "@/assets/loader.json";
import Spline from "@splinetool/react-spline";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    // Update state when component mounts on the client side
    setIsSmallScreen(window.innerWidth <= 768);

    // Attach event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 10000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);
  return (
    <>
      {isLoading ? (
        <div className="h-[calc(100vh-80px)] bg-[#ADA1EC] flex justify-center items-center">
          <div className="w-[300px]">
            <Lottie animationData={loader} loop={true} />
          </div>
        </div>
      ) : null}

      <div className={`flex flex-shrink-0 justify-end h-[calc(100vh-90px)] bg-white text-slate-800 ${isSmallScreen ? "small-screen" : "big-screen"}`}>
        <div className="w-full">
          <Suspense fallback={<div className="font-extrabold size-11 text-blue-500">Loading</div>}>
            <Spline scene={isSmallScreen ? "https://prod.spline.design/5YWMuDfT-o7lXYJA/scene.splinecode" : "https://prod.spline.design/HdgXOEvQ8kL8Ukkn/scene.splinecode"} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
