import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function RedirectPage() {
  const { shortId } = useParams();

  useEffect(() => {
    const redirect = async () => {
      try {
        // Call backend redirect route
        window.location.href = `${import.meta.env.VITE_BACKEND_URL}/${shortId}`;
      } catch (error) {
        console.error(error);
      }
    };

    redirect();
  }, [shortId]);

  return (
    <div className="w-full h-screen flex items-center justify-center text-xl">
      Redirecting...
    </div>
  );
}
