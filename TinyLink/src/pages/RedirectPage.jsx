import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function RedirectPage() {
  const { shortId } = useParams();

  useEffect(() => {
    const redirect = async () => {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;

      // SAFETY CHECK – avoid undefined URLs
      if (!backendUrl) {
        console.error("❌ ERROR: VITE_BACKEND_URL is missing in your .env file");
        return;
      }

      // Redirect to backend → backend redirects to long URL
      window.location.href = `${backendUrl}/${shortId}`;
    };

    redirect();
  }, [shortId]);

  return (
    <div className="w-full h-screen flex items-center justify-center text-xl">
      Redirecting...
    </div>
  );
}
