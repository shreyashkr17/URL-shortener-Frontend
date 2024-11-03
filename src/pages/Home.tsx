import React from "react";
import UrlHome from "@/Components/URLHome";

const Home: React.FC = () => {
  return (
    <div className="h-full w-full ">
      <div className="bg-black w-lvw h-lvh text-white flex justify-center items-center text-12xl">
        <h1 className="righteous-regular ">ShortlyCut.xyz</h1>
      </div>
      <div className="absolute h-full w-full bg-black opacity-80 top-0"></div>
      <div className="absolute inset-0 flex justify-center items-center overflow-y-auto overflow-x-hidden">
        <UrlHome />
      </div>
    </div>
  );
};

export default Home;