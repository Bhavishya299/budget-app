import { useEffect, useState } from "react";
import { getTransactions } from "../api/transactions";
import {
  PieChart, Pie, Cell,
  BarChart, Bar,
  XAxis, YAxis, Tooltip,
  ResponsiveContainer, Legend
} from "recharts";

export default function Charts() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getTransactions();
      setTransactions(res.data);
    };
    fetchData();
  }, []);

  // CALCULATIONS
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const balance = income - expense;

  // CATEGORY DATA
  const categoryData = {};
  transactions.forEach((t) => {
    if (t.type === "expense") {
      categoryData[t.category] =
        (categoryData[t.category] || 0) + t.amount;
    }
  });

  const pieData = Object.keys(categoryData).map((key) => ({
    name: key,
    value: categoryData[key],
  }));

  const topCategory =
    Object.keys(categoryData).length > 0
      ? Object.keys(categoryData).reduce((a, b) =>
          categoryData[a] > categoryData[b] ? a : b
        )
      : "None";

  // MONTHLY DATA
  const monthly = {};

  transactions.forEach((t) => {
    const month = new Date(t.date).toLocaleString("default", {
      month: "short",
    });

    if (!monthly[month]) {
      monthly[month] = { month, income: 0, expense: 0 };
    }

    monthly[month][t.type] += t.amount;
  });

  const barData = Object.values(monthly);

  const COLORS = ["#ec4899", "#f472b6", "#f9a8d4", "#fbcfe8"];

  return (
   <div className="min-h-screen p-6 bg-gradient-to-br from-pink-50 to-pink-100">

  {/* TOP BAR */}
  <div className="flex justify-between items-center mb-6">
    <button
      onClick={() => window.location.href = "/dashboard"}
      className="text-sm text-gray-600 hover:text-pink-500 transition"
    >
      ← Back to Dashboard
    </button>

    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center">
        U
      </div>
      <span className="text-sm font-medium">Profile</span>
    </div>
  </div>

      {/* TITLE */}
      <h1 className="text-2xl font-bold text-pink-600 mb-6">
        Financial Analytics 📊
      </h1>

      {/* 🔥 TOP STATS */}
      <div className="grid grid-cols-3 gap-6 mb-6">

        <div className="bg-white/70 backdrop-blur-md p-5 rounded-xl shadow hover:scale-105 transition">
          <p className="text-gray-400 text-sm">Balance</p>
          <h2 className="text-xl font-bold text-pink-600">₹{balance}</h2>
        </div>

        <div className="bg-white/70 backdrop-blur-md p-5 rounded-xl shadow hover:scale-105 transition">
          <p className="text-gray-400 text-sm">Income</p>
          <h2 className="text-xl font-bold text-green-600">+₹{income}</h2>
        </div>

        <div className="bg-white/70 backdrop-blur-md p-5 rounded-xl shadow hover:scale-105 transition">
          <p className="text-gray-400 text-sm">Expenses</p>
          <h2 className="text-xl font-bold text-pink-500">-₹{expense}</h2>
        </div>

      </div>

      {/* 🔥 INSIGHTS STRIP */}
      <div className="bg-gradient-to-r from-pink-500 to-pink-400 text-white p-4 rounded-xl mb-6 shadow">
        💡 Top spending category: <b>{topCategory}</b>
      </div>

      {/* 📊 CHARTS */}
      <div className="grid grid-cols-2 gap-6">

        {/* PIE */}
        <div className="bg-white/70 backdrop-blur-md rounded-2xl p-5 shadow hover:shadow-xl transition">
          <h2 className="font-semibold mb-4">Expense Breakdown</h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} dataKey="value" outerRadius={100}>
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* BAR */}
        <div className="bg-white/70 backdrop-blur-md rounded-2xl p-5 shadow hover:shadow-xl transition">
          <h2 className="font-semibold mb-4">Monthly Overview</h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" fill="#22c55e" />
              <Bar dataKey="expense" fill="#ec4899" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}