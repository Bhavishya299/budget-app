import { useEffect, useState } from "react";
import { getTransactions } from "../api/transactions";

export default function Insights() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getTransactions();
      setTransactions(res.data);
    };
    fetchData();
  }, []);

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const balance = income - expense;

  const savingsRate =
    income === 0 ? 0 : Math.round((balance / income) * 100);

  // CATEGORY ANALYSIS
  const categoryMap = {};
  transactions.forEach((t) => {
    if (t.type === "expense") {
      categoryMap[t.category] =
        (categoryMap[t.category] || 0) + t.amount;
    }
  });

  const highestCategory = Object.keys(categoryMap).length
    ? Object.keys(categoryMap).reduce((a, b) =>
        categoryMap[a] > categoryMap[b] ? a : b
      )
    : "None";

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-pink-50 to-pink-100">

      {/* 🔝 TOP BAR */}
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
        Smart Insights 🤖
      </h1>

      {/* 🔥 SUMMARY */}
      <div className="grid grid-cols-3 gap-6 mb-6">

        <div className="bg-white/70 backdrop-blur-md p-5 rounded-xl shadow hover:scale-105 transition">
          <p className="text-gray-400 text-sm">Balance</p>
          <h2 className="text-xl font-bold text-pink-600">₹{balance}</h2>
        </div>

        <div className="bg-white/70 backdrop-blur-md p-5 rounded-xl shadow hover:scale-105 transition">
          <p className="text-gray-400 text-sm">Expenses</p>
          <h2 className="text-xl font-bold text-pink-500">₹{expense}</h2>
        </div>

        <div className="bg-white/70 backdrop-blur-md p-5 rounded-xl shadow hover:scale-105 transition">
          <p className="text-gray-400 text-sm">Savings Rate</p>
          <h2 className="text-xl font-bold text-green-600">{savingsRate}%</h2>
        </div>

      </div>

      {/* 🔥 INSIGHT CARDS */}
      <div className="grid gap-4">

        {expense > income && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl shadow hover:scale-[1.02] transition">
            ⚠️ You are spending more than you earn.
          </div>
        )}

        {income > 0 && savingsRate < 20 && (
          <div className="bg-yellow-50 text-yellow-700 p-4 rounded-xl shadow hover:scale-[1.02] transition">
            📉 Your savings rate is low. Try reducing expenses.
          </div>
        )}

        {highestCategory !== "None" && (
          <div className="bg-pink-50 text-pink-600 p-4 rounded-xl shadow hover:scale-[1.02] transition">
            💡 Highest spending is on <b>{highestCategory}</b>.
          </div>
        )}

        {balance > income * 0.3 && (
          <div className="bg-green-50 text-green-600 p-4 rounded-xl shadow hover:scale-[1.02] transition">
            🔥 Great job! Your savings are strong.
          </div>
        )}

        {/* EMPTY STATE */}
        {transactions.length === 0 && (
          <div className="bg-white p-4 rounded-xl shadow text-gray-500 text-center">
            No insights yet. Add some transactions.
          </div>
        )}

      </div>

    </div>
  );
}