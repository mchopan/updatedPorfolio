"use client"

import React, { Suspense, useEffect, useState } from "react";

import loader from "@/assets/loader.json"
import Lottie from "lottie-react";

const Spline = React.lazy(() => import('@splinetool/react-spline'));



export default function Home() {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 10000);

    return () => clearTimeout(timeoutId);
  }, []);


  return (
    <>
      {
        isLoading ?
          <div className="h-[calc(100vh-80px)] bg-[#ADA1EC] flex justify-center items-center">
            <div className="w-[300px]">
              <Lottie animationData={loader} loop={true} />
            </div>
          </div> : null
      }
      <div className={isLoading ? "hidden" : "visible bg-white text-slate-800 flex flex-shrink-0 h-[calc(100vh-80px)] justify-end "}>
        <div className="w-full">
          <Suspense fallback={
            <div className="font-extrabold size-11 text-blue-500">Loading</div>
          }>
            <Spline scene="https://prod.spline.design/HdgXOEvQ8kL8Ukkn/scene.splinecode" />
          </Suspense>
        </div>
      </div >

    </>
  );
}
