import React from "react";

export default function Navbar() {
  return (
    <div className="w-full border-b shadow-sm bg-white p-4 flex justify-between items-center px-8">
      <h1 className="text-xl font-semibold">TinyLink</h1>

      <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
        My Links
      </button>
    </div>
  );
}
