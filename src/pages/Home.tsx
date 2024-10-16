import React, { useState } from "react";
import UrlForm from "../Components/UrlForm";
import UrlResult from "../Components/UrlResult";
import { shortenUrl } from "@/services/api";

const Home: React.FC = () => {
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loader, setLoader] = useState<boolean>(false);

  const handleSubmit = async (url: string) => {
    try {
      setError(null);
      const result = await shortenUrl(url);
      setShortUrl(result.shortUrl);
      setLoader(false);
    } catch (error) {
      console.error('Error shortening URL:', error);
      setLoader(false);
      setError('Failed to shorten URL. Please try again.');
    }
  };

  return (
    <div className="h-full w-full bg-black">
      <div className="bg-black w-lvw h-lvh text-white flex justify-center items-center text-12xl">
        <h1 className="righteous-regular ">ShortlyCut.xyz</h1>
      </div>
      <div className="absolute h-full w-full bg-black opacity-50 top-0"></div>
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="bg-white bg-opacity-50 backdrop-blur-sm p-8 rounded-xl shadow-lg max-w-lg w-full">
          <UrlForm onSubmit={handleSubmit} loader={loader} setLoader={setLoader}/>
          {error && <p className="mt-4 jost-boldest text-red-800 w-full flex justify-center items-center">{error}</p>}
          {shortUrl && (
            <div className="mt-6 text-black">
              <UrlResult shortUrl={shortUrl} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;