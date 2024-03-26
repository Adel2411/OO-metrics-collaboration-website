import React from "react";

export default function LoadingPage() {
  return (
    <div className="bg-first text-white flex flex-col justify-center items-center h-screen gap-10">
      <h1 className="text-sm sm:text-3xl">Waiting for the server</h1>
      <span className="loading loading-infinity h-1/12 sm:h-20 sm:w-20 w-1/12"></span>
    </div>
  );
}

