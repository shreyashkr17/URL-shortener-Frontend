import  { useState, useEffect } from "react";
import { Button } from "@nextui-org/button";
import { Table, FileSpreadsheet, ArrowRight, CheckCircle } from "lucide-react";

export default function banner2() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    console.log(isVisible)
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    { icon: FileSpreadsheet, text: "Upload Excel" },
    { icon: Table, text: "Select Columns" },
    { icon: CheckCircle, text: "Get Shortened URLs" },
  ];

  const scrollToBatch = () => {
    const urlSection = document.getElementById("batch");
    if (urlSection) {
      urlSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="flex h-auto xl:h-[70vh] justify-center xl:flex-row flex-col items-start py-10 lg:px-52 px-12 sm:px-20 gradient-bg">
      <div className="xl:w-1/2 w-full sm:p-8 h-full justify-center xl:justify-start items-center xl:items-start">
        <h1 className="text-white text-center xl:text-start text-5xl sm:text-6xl lg:text-7xl jost-boldest">
          Batch Process <br />
          <span className="text-blue-500">Excel Files</span>
        </h1>
        <h1 className="text-white text-2xl lg:text-4xl my-10 jost-bold xl:text-start text-center h-auto flex-wrap">
          Shorten Multiple URLs Instantly
        </h1>
        <p className="flex flex-wrap xl:text-start text-center jost-medium lg:text-2xl text-xl text-white">
          Transform entire columns of long URLs into shortened links with just a
          few clicks. Perfect for marketing campaigns, data analysis, and bulk
          processing.
        </p>

        <div className="flex xl:justify-start justify-center items-center my-10 flex-col sm:flex-row gap-4">
          <Button
            className="px-8 py-3 bg-blue-500 text-lg hover:bg-blue-600 text-white rounded-lg transform transition-all duration-200 hover:scale-105 font-medium"
            style={{ fontFamily: "Jost, sans-serif" }}
            onClick={scrollToBatch}
          >
            Try Batch Processing
          </Button>
          <Button
            className="px-8 py-3 bg-transparent text-lg border border-gray-700 hover:border-gray-500 text-gray-300 rounded-lg transform transition-all duration-200 hover:scale-105 font-medium"
            style={{ fontFamily: "Jost, sans-serif" }}
          >
            View Documentation
          </Button>
        </div>
      </div>
      <div className="xl:w-1/2 w-full h-full xl:p-10 flex justify-center items-center">
        <div className="w-full h-auto">
          <div className="flex flex-col space-y-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="flex items-center space-x-4">
                  <div
                    className={`flex items-center justify-center w-full ${
                      activeStep === index ? "scale-105" : "scale-100"
                    } transition-all duration-300`}
                  >
                    <div
                      className={`p-4 rounded-lg ${
                        activeStep === index
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-gray-800/50 text-gray-400"
                      } transition-all duration-300`}
                    >
                      <Icon size={24} />
                    </div>
                    <ArrowRight className="mx-4 text-gray-600" size={20} />
                    <div
                      className={`flex-1 p-4 rounded-lg ${
                        activeStep === index
                          ? "bg-blue-500/10 text-white"
                          : "bg-gray-800/50 text-gray-400"
                      } transition-all duration-300`}
                    >
                      <p
                        className="font-medium jost-bold"
                      >
                        {step.text}
                      </p>
                      <p
                        className="text-sm opacity-75 jost-medium"
                      >
                        {index === 0 && "Upload your XLS/XLSX file"}
                        {index === 1 && "Choose URL columns to process"}
                        {index === 2 && "Download processed file"}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
