import { useNavigate } from "react-router-dom";
import RecentTransactions from "./RecentTransactions";
import { useEffect, useState } from "react";
import { getTransactions } from "../api/transactions";

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [displayBalance, setDisplayBalance] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getTransactions();
        setTransactions(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const filteredTransactions = transactions.filter((t) =>
    t.category.toLowerCase().includes(search.toLowerCase()) ||
    (t.description || "").toLowerCase().includes(search.toLowerCase())
  );

  const income = filteredTransactions
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = filteredTransactions
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const balance = income - expense;

  useEffect(() => {
    let start = 0;
    const end = balance;
    if (start === end) return;

    let increment = end / 30;
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setDisplayBalance(Math.floor(start));
    }, 20);

    return () => clearInterval(timer);
  }, [balance]);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#fdf2f8] via-[#fce7f3] to-[#fbcfe8]">

      {/* SIDEBAR */}
      <div className="w-64 bg-white/70 backdrop-blur-md p-6 shadow-xl flex flex-col justify-between">

        <div>
          <h1 className="text-xl font-bold text-pink-600 mb-8">
            SmartBudget
          </h1>

          {/* NAV */}
          <div className="space-y-4 text-sm">

            {[
              { name: "Dashboard", path: "/dashboard" },
              { name: "Transactions", path: "/transactions" },
              { name: "Add Entry", path: "/add" },
              { name: "Insights", path: "/insights" },
              { name: "Charts", path: "/charts" }
            ].map((item, i) => (
              <div
                key={i}
                onClick={() => navigate(item.path)}
                className="cursor-pointer px-3 py-2 rounded-lg hover:bg-pink-50 hover:scale-[1.02] transition"
              >
                {item.name}
              </div>
            ))}
          </div>

          {/* SETTINGS ONLY */}
          <div className="mt-10">
            <p
              onClick={() => navigate("/settings")}
              className="cursor-pointer text-sm px-3 py-2 rounded-lg hover:bg-pink-50 transition"
            >
              ⚙️ Settings
            </p>
          </div>
        </div>

        {/* LOGOUT */}
        <button
          onClick={() => {
            localStorage.clear();
            navigate("/");
          }}
          className="text-pink-500 hover:scale-105 transition font-medium"
        >
          Logout
        </button>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-6 space-y-6">

        {/* 🔝 TOP BAR */}
        <div className="flex justify-between items-center">

          {/* SEARCH */}
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search transactions..."
            className="px-4 py-2 rounded-full bg-white/80 backdrop-blur-md w-1/3 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
          />

          {/* PROFILE (TOP RIGHT ✅) */}
          <div
            onClick={() => navigate("/profile")}
            className="flex items-center gap-3 cursor-pointer hover:scale-105 transition"
          >
            <span className="bg-gradient-to-r from-pink-500 to-pink-400 text-white w-8 h-8 flex items-center justify-center rounded-full shadow">
              {user?.name?.[0]}
            </span>
            <span className="font-medium">{user?.name}</span>
          </div>

        </div>

        {/* HERO */}
        <div className="bg-gradient-to-r from-pink-600 to-pink-400 text-white p-6 rounded-2xl shadow-lg hover:scale-[1.02] transition">
          <h2 className="text-xl font-bold">
            Welcome back, {user?.name} 👋
          </h2>
          <p className="text-sm">
            Track your money, achieve your goals.
          </p>

          <button
            onClick={() => navigate("/add")}
            className="mt-4 bg-white text-pink-600 px-5 py-2 rounded-full hover:scale-105 transition shadow"
          >
            + Add Transaction
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-6">

          <div className="bg-white/70 backdrop-blur-md p-5 rounded-xl shadow hover:scale-105 transition">
            <p className="text-gray-400 text-sm">TOTAL BALANCE</p>
            <h2 className="text-2xl font-bold text-pink-600">
              ₹{displayBalance}
            </h2>
          </div>

          <div className="bg-white/70 backdrop-blur-md p-5 rounded-xl shadow hover:scale-105 transition">
            <p className="text-gray-400 text-sm">TOTAL INCOME</p>
            <h2 className="text-xl font-bold text-green-600">
              +₹{income}
            </h2>
          </div>

          <div className="bg-white/70 backdrop-blur-md p-5 rounded-xl shadow hover:scale-105 transition">
            <p className="text-gray-400 text-sm">TOTAL EXPENSES</p>
            <h2 className="text-xl font-bold text-pink-500">
              -₹{expense}
            </h2>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="grid grid-cols-2 gap-6">
          <RecentTransactions />

          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-5 shadow">
            <h3 className="font-bold text-gray-700 mb-4">Statistics</h3>

            <div className="space-y-3">
              {["Jan", "Feb", "Mar", "Apr"].map((m, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs">
                    <span>{m}</span>
                    <span>{30 + i * 10}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded">
                    <div
                      className="h-2 bg-pink-500 rounded"
                      style={{ width: `${30 + i * 10}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}