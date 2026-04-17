import ProfilePanel from "../components/ProfilePanel";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-pink-50 to-pink-100">

      {/* TOP BAR */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-sm text-gray-600 hover:text-pink-500 transition"
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* CENTERED PANEL */}
      <div className="flex justify-center">
        <div className="w-full max-w-md">
          <ProfilePanel />
        </div>
      </div>

    </div>
  );
}