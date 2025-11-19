import React from "react";

export default function Button({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-5 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800"
    >
      {text}
    </button>
  );
}
