'use client'

import Image from "next/image";
import dynamic from "next/dynamic";




const WebcamComponent = dynamic(() => import("./components/WebcamComponent"), {
  ssr: false, // Disable Server-Side Rendering for the webcam component
});


export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
       <div>
      <h1>Webcam Test</h1>
      <WebcamComponent />
      </div>
      </main>
    </div>
  );
}
