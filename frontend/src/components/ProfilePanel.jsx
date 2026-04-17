export default function ProfilePanel() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="bg-white/70 backdrop-blur-md rounded-2xl p-5 shadow hover:shadow-lg transition">

      {/* HEADER */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-pink-400 text-white flex items-center justify-center text-lg font-bold">
          {user?.name?.[0] || "U"}
        </div>

        <div>
          <p className="font-semibold text-gray-800">{user?.name}</p>
          <p className="text-xs text-gray-400">{user?.email}</p>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 gap-3 mt-4">

        <div className="bg-pink-50 p-3 rounded-lg text-center hover:scale-105 transition">
          <p className="text-pink-600 font-bold">Active</p>
          <p className="text-xs text-gray-400">Status</p>
        </div>

        <div className="bg-pink-50 p-3 rounded-lg text-center hover:scale-105 transition">
          <p className="text-pink-600 font-bold">Pro</p>
          <p className="text-xs text-gray-400">Plan</p>
        </div>

      </div>

      {/* ACTIONS */}
      <div className="mt-4 space-y-2 text-sm">
        <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-pink-50 transition">
          ✏️ Edit Profile
        </button>

        <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-pink-50 transition">
          📊 View Analytics
        </button>
      </div>

    </div>
  );
}