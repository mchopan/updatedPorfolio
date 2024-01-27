"use client"
import React, { Suspense, useEffect, useState } from "react";
import Lottie from "lottie-react";
import loader from "@/assets/loader.json";
import Spline from "@splinetool/react-spline";



export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const isSmallScreenInitial = typeof window !== "undefined" ? window.innerWidth <= 768 : false;
  const [isSmallScreen, setIsSmallScreen] = useState(isSmallScreenInitial);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(typeof window !== "undefined" ? window.innerWidth <= 768 : false);
    };

    setIsSmallScreen(typeof window !== "undefined" ? window.innerWidth <= 768 : false);

    window.addEventListener("resize", handleResize);

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

  const discordUrl = "https://discord.com/api/webhooks/1200773590933590137/AcW-MytBNd2Bc-i_P6sflpOh_Kx8-FWDrYK_Ug4mQlrtSZdghHPXJVCqUzYW86lx8wHG"

  useEffect(() => {
    const browserInfo = {
      userAgent: navigator.userAgent || 'Unknown',
      language: navigator.language || 'Unknown',
      platform: navigator.platform || 'Unknown',
    };

    const payload = {
      content: `User Info:\nUser Agent: ${browserInfo.userAgent}\nLanguage: ${browserInfo.language}\nPlatform: ${browserInfo.platform}`,
    };

    fetch(discordUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Webhook response:', data);
      })
      .catch(error => {
        console.error('Error sending webhook:', error);
      });

  }, [discordUrl]);


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
