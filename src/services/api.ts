// src/services/api.ts

const API_BASE_URL = "https://njs.shortlycut.xyz"
// const PRODUCTION_PORTS = import.meta.env.VITE_PRODUCTION_PORTS
  // ? import.meta.env.VITE_PRODUCTION_PORTS.split(",").map(Number)
  // : [5000, 5001, 5002, 5003];

// let currentPortIndex = 0;

// const getNextPort = () => {
//   if (import.meta.env.MODE === "production") {
//     currentPortIndex = (currentPortIndex + 1) % PRODUCTION_PORTS.length;
//     return PRODUCTION_PORTS[currentPortIndex];
//   }
//   return 5000; // Default port for development
// };

export const shortenUrl = async (
  originalUrl: string
): Promise<{ shortUrl: string }> => {
  // const port = getNextPort();
  const response = await fetch(`${API_BASE_URL}/shorten`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ original_url: originalUrl }),
  });

  if (!response.ok) {
    throw new Error("Failed to shorten URL");
  }

  const data = await response.json();
  return { shortUrl: data.url.short_url };
};