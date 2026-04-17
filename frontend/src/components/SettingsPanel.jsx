import { useNavigate } from "react-router-dom";

export default function SettingsPanel() {
  const navigate = useNavigate();

  return (
    <div className="bg-white/70 backdrop-blur-md rounded-2xl p-5 shadow hover:shadow-lg transition">

      <h2 className="font-semibold text-gray-800 mb-4">Settings ⚙️</h2>

      <div className="space-y-3 text-sm">

        <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-pink-50 transition">
          🌙 Dark Mode (Coming Soon)
        </button>

        <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-pink-50 transition">
          🔔 Notifications
        </button>

        <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-pink-50 transition">
          🔒 Privacy Settings
        </button>

        <button
          onClick={() => {
            localStorage.clear();
            navigate("/");
          }}
          className="w-full text-left px-3 py-2 rounded-lg text-red-500 hover:bg-red-50 transition"
        >
          🚪 Logout
        </button>

      </div>

    </div>
  );
}