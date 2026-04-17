import { useState } from "react";
import { addTransaction } from "../api/transactions";
import { useNavigate } from "react-router-dom";

const categories = {
  income: ["Salary", "Freelance", "Other"],
  expense: ["Food", "Rent", "Travel", "Entertainment", "Education", "Health", "Shopping", "Other"],
};

const quickAmounts = [100, 500, 1000, 5000];

export default function AddTransaction() {
  const [type, setType] = useState("expense");
  const [form, setForm] = useState({
    amount: "",
    category: "",
    date: "",
    note: "",
  });

  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();

  const handleAdd = async () => {
    if (!form.amount || !form.category) return;

    try {
      await addTransaction({
        title: form.note || form.category,
        amount: Number(form.amount),
        category: form.category,
        description: form.note || "No description",
        date: form.date || new Date(),
        type,
        currency: "INR",
      });

      setMsg({ text: "Added successfully!", ok: true });
      setForm({ amount: "", category: "", date: "", note: "" });
    } catch {
      setMsg({ text: "Error adding transaction", ok: false });
    }
  };

  return (
    <div className="relative min-h-screen flex justify-center items-start pt-10 px-4 overflow-hidden
    bg-gradient-to-br from-pink-50 via-white to-pink-100">

      {/* 🔥 Animated blobs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-pink-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-pink-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>

      {/* 💸 Floating ₹ icons */}
      <div className="absolute text-pink-200 text-6xl top-20 left-1/4 animate-bounce">₹</div>
      <div className="absolute text-pink-200 text-4xl bottom-32 right-1/4 animate-bounce delay-200">₹</div>
      <div className="absolute text-pink-100 text-5xl top-1/2 left-10 animate-bounce delay-500">₹</div>

      {/* CARD */}
      <div className="relative z-10 w-full max-w-xl backdrop-blur-lg bg-white/70 rounded-3xl shadow-xl border border-white/40 p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            ← Dashboard
          </button>

          <div className="w-8 h-8 bg-pink-500 text-white flex items-center justify-center rounded-full text-sm">
            U
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-1">
          Add transaction
        </h2>
        <p className="text-sm text-gray-400 mb-5">
          Track every rupee — income or expense
        </p>

        {/* TYPE */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {["income", "expense"].map((t) => (
            <button
              key={t}
              onClick={() => {
                setType(t);
                setForm((p) => ({ ...p, category: "" }));
              }}
              className={`py-3 rounded-xl border-2 font-semibold transition
              ${
                type === t
                  ? t === "income"
                    ? "border-emerald-400 bg-emerald-50 text-emerald-600"
                    : "border-pink-500 bg-pink-50 text-pink-600"
                  : "border-gray-200 text-gray-400"
              }`}
            >
              {t === "income" ? "+ Income" : "− Expense"}
            </button>
          ))}
        </div>

        {/* AMOUNT */}
        <div className="mb-4">
          <p className="text-xs text-gray-400 mb-2">AMOUNT</p>
          <input
            type="number"
            placeholder="₹"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            className="w-full border rounded-xl px-4 py-3 focus:border-pink-500 outline-none"
          />

          <div className="flex gap-2 mt-2 flex-wrap">
            {quickAmounts.map((amt) => (
              <button
                key={amt}
                onClick={() => setForm({ ...form, amount: amt })}
                className="text-xs px-3 py-1 rounded-full bg-gray-100 hover:bg-pink-100 transition"
              >
                +₹{amt}
              </button>
            ))}
          </div>
        </div>

        {/* CATEGORY */}
        <div className="mb-5">
          <p className="text-xs text-gray-400 mb-2">CATEGORY</p>

          <div className="grid grid-cols-4 gap-2">
            {categories[type].map((c) => (
              <button
                key={c}
                onClick={() => setForm({ ...form, category: c })}
                className={`py-2 rounded-xl text-xs border transition
                ${
                  form.category === c
                    ? "bg-pink-500 text-white border-pink-500"
                    : "bg-gray-50 border-gray-200 text-gray-500"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* DATE + NOTE */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="border rounded-xl px-3 py-2 text-sm"
          />

          <input
            placeholder="Optional note..."
            value={form.note}
            onChange={(e) => setForm({ ...form, note: e.target.value })}
            className="border rounded-xl px-3 py-2 text-sm"
          />
        </div>

        {/* BUTTON */}
        <button
          onClick={handleAdd}
          className="w-full bg-gradient-to-r from-pink-600 to-pink-400 text-white py-3 rounded-xl font-bold
          hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-md"
        >
          + Add {type === "income" ? "Income" : "Expense"}
        </button>

        {/* MESSAGE */}
        {msg && (
          <p className={`text-center text-xs mt-3 ${msg.ok ? "text-green-500" : "text-red-400"}`}>
            {msg.text}
          </p>
        )}
      </div>
    </div>
  );
}