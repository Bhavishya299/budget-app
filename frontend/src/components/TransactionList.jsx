import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTransactions, deleteTransaction } from "../api/transactions";

const catEmoji = {
  Salary: "₹", Freelance: "💼", Rent: "🏠", Food: "🍛",
  Travel: "🚌", Entertainment: "🎬", Education: "📚",
  Health: "💊", Shopping: "🛍", Other: "📦"
};

const catBg = {
  Salary: "#FBEAF0", Freelance: "#EEEDFE", Rent: "#E6F1FB",
  Food: "#FAEEDA", Travel: "#EEEDFE", Entertainment: "#FBEAF0",
  Education: "#E6F1FB", Health: "#E1F5EE", Shopping: "#FAECE7", Other: "#F1EFE8"
};

function fmtDate(date) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric"
  });
}

export default function TransactionList() {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await getTransactions();
      setTransactions(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteTransaction(id);
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  const list = (filter === "all"
    ? transactions
    : transactions.filter((t) => t.type === filter)
  ).sort((a, b) => new Date(b.date) - new Date(a.date));

  const income = transactions
    .filter(t => t.type === "income")
    .reduce((s, t) => s + Number(t.amount), 0);

  const expense = transactions
    .filter(t => t.type === "expense")
    .reduce((s, t) => s + Number(t.amount), 0);

  const activeCls = {
    all: "bg-pink-500 text-white border-pink-500",
    income: "bg-emerald-500 text-white border-emerald-500",
    expense: "bg-pink-500 text-white border-pink-500",
  };

  return (
    <div className="pt-10 px-6 min-h-screen relative overflow-hidden 
    bg-gradient-to-br from-[#fdf2f8] via-[#fce7f3] to-[#fbcfe8]">

      {/* Floating ₹ icons */}
      <div className="absolute inset-0 pointer-events-none">
        <span className="absolute top-[10%] left-[20%] text-pink-300 opacity-20 text-5xl">₹</span>
        <span className="absolute top-[60%] left-[80%] text-pink-300 opacity-20 text-4xl">₹</span>
        <span className="absolute top-[75%] left-[10%] text-pink-300 opacity-20 text-6xl">₹</span>
      </div>

      {/* Content */}
      <div className="relative z-10">

        {/* Back */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            ← Back to Dashboard
          </button>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-medium text-gray-800 mb-1">All transactions</h1>
        <p className="text-sm text-gray-400 mb-5">
          {transactions.length} transaction{transactions.length !== 1 ? "s" : ""} this month
        </p>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { label: "Balance", value: income - expense, cls: "text-gray-800" },
            { label: "Income", value: income, cls: "text-emerald-600" },
            { label: "Expenses", value: expense, cls: "text-pink-500" },
          ].map(({ label, value, cls }) => (
            <div
              key={label}
              className="bg-white/70 backdrop-blur-md border border-white/30 rounded-2xl p-4 shadow-sm"
            >
              <p className="text-[10px] uppercase tracking-wide text-gray-400 mb-1">{label}</p>
              <p className={`text-xl font-medium ${cls}`}>
                ₹{Number(value).toLocaleString("en-IN")}
              </p>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-700 capitalize">{filter}</span>
          <div className="flex gap-2">
            {["all", "income", "expense"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-all capitalize
                ${filter === f
                    ? activeCls[f]
                    : "border-gray-200 text-gray-400 hover:bg-white/50"
                  }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        <div className="flex flex-col gap-2">
          {list.length === 0 ? (
            <div className="text-center py-12 text-gray-300 text-sm bg-white/60 backdrop-blur-md rounded-2xl border border-white/30">
              No transactions found
            </div>
          ) : (
            list.map((t) => (
              <div
                key={t._id}
                className="flex items-center gap-3 px-4 py-3.5 bg-white/70 backdrop-blur-md border border-white/30 rounded-2xl hover:scale-[1.01] hover:shadow-md transition-all"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-base flex-shrink-0"
                  style={{ background: catBg[t.category] || "#F1EFE8" }}
                >
                  {catEmoji[t.category] || "•"}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800">{t.category}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {fmtDate(t.date)}
                    {t.description ? ` · ${t.description}` : ""}
                  </p>
                </div>

                <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full
                  ${t.type === "income"
                    ? "bg-emerald-50 text-emerald-800"
                    : "bg-pink-50 text-pink-700"
                  }`}>
                  {t.type}
                </span>

                <span className={`text-sm font-medium min-w-[70px] text-right
                  ${t.type === "income"
                    ? "text-emerald-500"
                    : "text-pink-500"
                  }`}>
                  {t.type === "income" ? "+" : "-"}₹{Number(t.amount).toLocaleString("en-IN")}
                </span>

                <button
                  onClick={() => handleDelete(t._id)}
                  className="text-gray-300 hover:text-pink-400 text-sm transition-colors"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}