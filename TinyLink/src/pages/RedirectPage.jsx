import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function RedirectPage() {
  const { shortId } = useParams();

  useEffect(() => {
    const backendUrl = import.meta.env.VITE_BASE_URL;

    if (!backendUrl) {
      console.error("❌ BACKEND URL missing");
      return;
    }

    // DIRECT REDIRECT → No fetch!
    const finalUrl = `${backendUrl.replace(/\/$/, "")}/${shortId}`;

    console.log("🔗 Redirecting to backend:", finalUrl);

    window.location.href = finalUrl;

  }, [shortId]);

  return (
    <div className="w-full h-screen flex items-center justify-center text-xl">
      Redirecting...
    </div>
  );
}
