import React from "react";
import UrlHome from "@/Components/URLHome";
// import ExcelHome from "@/Components/ExcelHome";

const Home: React.FC = () => {
  return (
    <div className="h-full w-full ">
      <div className="gradient-bg w-lvw h-lvh text-white flex justify-center items-center 2xl:text-12xl lg:text-9xl sm:text-8xl xs:text-5xl text-4xl">
        <h1 className="righteous-regular opacity-40">ShortlyCut.xyz</h1>
      </div>
      <div className="absolute h-full w-full gradient-bg opacity-80 top-0"></div>
      
      <div className="absolute inset-0 flex justify-center items-center overflow-y-auto overflow-x-hidden">
        <UrlHome />
      </div>
      {/* <ExcelHome /> */}
    </div>
  );
};

export default Home;