import React, { useState } from "react";
import Button from "./Button";
import { createShortURL } from "../api/urlAPI";

export default function URLInputBox() {
  const [input, setInput] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleShorten = async () => {
    if (!input) {
      alert("Enter a URL");
      return;
    }

    try {
      const res = await createShortURL(input);

      if (res.success) {
        setShortUrl(res.shortUrl);
      }
    } catch (err) {
      console.error("Shorten Error:", err);
    }
  };

  return (
    <div className="w-[450px] mx-auto bg-white border shadow-sm rounded-xl p-6 flex flex-col gap-4">
      
      {/* Input Row */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter your long URL here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full border rounded-md px-4 py-2 text-gray-700 focus:outline-none"
        />

        <Button text="Shorten" onClick={handleShorten} />
      </div>

      {/* Show Short URL */}
      {shortUrl && (
        <p className="text-green-600 font-semibold">
          Short URL:{" "}
          <a href={shortUrl} target="_blank" className="underline text-blue-600">
            {shortUrl}
          </a>
        </p>
      )}
    </div>
  );
}
