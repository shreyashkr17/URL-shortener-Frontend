// import React, { useState, useEffect, useRef } from "react";
// import { Card, CardBody } from "@nextui-org/react";
import { Link } from "react-router-dom";
// import { gsap } from "gsap";

interface UrlResultProps {
  shortUrl: string;
}

const UrlResult: React.FC<UrlResultProps> = ({ shortUrl }) => {

  return (
    <div className="overflow-hidden w-full flex justify-center items-center">
      <Link
        to={shortUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-black righteous-regular text-lg break-all hover:underline"
      >
        {shortUrl}
      </Link>
    </div>
  );
};

export default UrlResult;
