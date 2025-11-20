import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function RedirectPage() {
  const { shortId } = useParams();
  const [message, setMessage] = useState("Redirecting...");

  useEffect(() => {
    const redirect = async () => {
      const backendUrl = import.meta.env.VITE_BASE_URL;

      if (!backendUrl) {
        setMessage("❌ BACKEND URL missing in .env file");
        console.error("❌ VITE_BACKEND_URL missing");
        return;
      }

      const finalUrl = `${backendUrl.replace(/\/$/, "")}/${shortId}`;
      console.log("🔗 Redirecting to backend:", finalUrl);

      try {
        // Try fetching the backend to see response
        const response = await fetch(finalUrl, {
          method: "GET",
          redirect: "follow",
        });

        console.log("🔍 Backend response:", response);

        if (response.status === 404) {
          setMessage("❌ Short URL not found or expired.");
          return;
        }

        if (!response.ok) {
          setMessage("❌ Server error when redirecting.");
          return;
        }

        // If backend sends a redirect, browser will auto follow
        window.location.href = finalUrl;

      } catch (error) {
        console.error("❌ Redirect Error:", error);
        setMessage("❌ Unable to reach backend.");
      }
    };

    redirect();
  }, [shortId]);

  return (
    <div className="w-full h-screen flex items-center justify-center text-xl">
      {message}
    </div>
  );
}
