import React from "react";
import Navbar from "../components/Navbar";
import URLInputBox from "../components/URLInputBox";

export default function ShortenerPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <div className="text-center mt-16">
        <h2 className="text-3xl font-semibold">Shorten Your URLs</h2>
        <p className="text-gray-500 mt-2">
          Transform long, unwieldy URLs into short, shareable links in seconds
        </p>
      </div>

      <div className="mt-10">
        <URLInputBox />
      </div>
    </div>
  );
}
