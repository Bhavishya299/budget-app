import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

// Abstract budget bar chart for Login side
const LoginGraphic = () => (
  <svg viewBox="0 0 320 260" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="barGradL" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0.3)" />
      </linearGradient>
      <linearGradient id="barGradS" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
      </linearGradient>
    </defs>

    {/* Subtitle */}
    <text x="160" y="22" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="11" fontFamily="sans-serif" letterSpacing="2">MONTHLY BUDGET</text>

    {/* Grid lines */}
    {[60, 90, 120, 150, 180].map((y, i) => (
      <line key={i} x1="30" y1={y} x2="290" y2={y} stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
    ))}

    {/* Bars - primary */}
    {[
      { x: 45, h: 110, label: "Jan" },
      { x: 85, h: 80, label: "Feb" },
      { x: 125, h: 130, label: "Mar" },
      { x: 165, h: 60, label: "Apr" },
      { x: 205, h: 100, label: "May" },
      { x: 245, h: 145, label: "Jun" },
    ].map((b, i) => (
      <g key={i}>
        <rect x={b.x} y={180 - b.h} width="22" height={b.h} rx="4" fill="url(#barGradL)" />
        <text x={b.x + 11} y="200" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="10" fontFamily="sans-serif">{b.label}</text>
      </g>
    ))}

    {/* Bars - secondary (savings) */}
    {[
      { x: 57, h: 55 },
      { x: 97, h: 40 },
      { x: 137, h: 70 },
      { x: 177, h: 28 },
      { x: 217, h: 48 },
      { x: 257, h: 90 },
    ].map((b, i) => (
      <rect key={i} x={b.x} y={180 - b.h} width="10" height={b.h} rx="2" fill="url(#barGradS)" />
    ))}

    {/* Trend line */}
    <polyline
      points="56,135 96,155 136,120 176,165 216,140 266,100"
      fill="none"
      stroke="rgba(255,255,255,0.6)"
      strokeWidth="1.5"
      strokeDasharray="4 3"
    />
    {/* Dots on trend */}
    {[[56,135],[96,155],[136,120],[176,165],[216,140],[266,100]].map(([cx,cy],i) => (
      <circle key={i} cx={cx} cy={cy} r="3" fill="white" opacity="0.8" />
    ))}

    {/* Legend */}
    <rect x="70" y="220" width="10" height="10" rx="2" fill="rgba(255,255,255,0.8)" />
    <text x="84" y="229" fill="rgba(255,255,255,0.65)" fontSize="10" fontFamily="sans-serif">Expenses</text>
    <rect x="155" y="220" width="10" height="10" rx="2" fill="rgba(255,255,255,0.3)" />
    <text x="169" y="229" fill="rgba(255,255,255,0.65)" fontSize="10" fontFamily="sans-serif">Savings</text>
  </svg>
);

// Abstract donut + line chart for Signup side
const SignupGraphic = () => (
  <svg viewBox="0 0 320 260" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0.9)" />
      </linearGradient>
    </defs>

    {/* Subtitle */}
    <text x="160" y="22" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="11" fontFamily="sans-serif" letterSpacing="2">EXPENSE TRACKER</text>

    {/* Donut chart (left side) */}
    {/* Background circle */}
    <circle cx="100" cy="120" r="55" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="18" />
    {/* Segment 1 - Housing ~35% */}
    <circle cx="100" cy="120" r="55" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="18"
      strokeDasharray="120 226" strokeDashoffset="0" transform="rotate(-90 100 120)" />
    {/* Segment 2 - Food ~25% */}
    <circle cx="100" cy="120" r="55" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="18"
      strokeDasharray="86 260" strokeDashoffset="-120" transform="rotate(-90 100 120)" />
    {/* Segment 3 - Transport ~20% */}
    <circle cx="100" cy="120" r="55" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="18"
      strokeDasharray="68 278" strokeDashoffset="-206" transform="rotate(-90 100 120)" />
    {/* Center label */}
    <text x="100" y="115" textAnchor="middle" fill="white" fontSize="18" fontFamily="sans-serif" fontWeight="600">₹</text>
    <text x="100" y="130" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9" fontFamily="sans-serif">BUDGET</text>

    {/* Legend for donut */}
    {[
      { color: "rgba(255,255,255,0.85)", label: "Housing", pct: "35%" },
      { color: "rgba(255,255,255,0.45)", label: "Food",    pct: "25%" },
      { color: "rgba(255,255,255,0.25)", label: "Travel",  pct: "20%" },
    ].map((item, i) => (
      <g key={i}>
        <rect x="28" y={182 + i * 18} width="8" height="8" rx="2" fill={item.color} />
        <text x="40" y={190 + i * 18} fill="rgba(255,255,255,0.6)" fontSize="10" fontFamily="sans-serif">{item.label}</text>
        <text x="86" y={190 + i * 18} fill="rgba(255,255,255,0.5)" fontSize="10" fontFamily="sans-serif">{item.pct}</text>
      </g>
    ))}

    {/* Divider */}
    <line x1="172" y1="48" x2="172" y2="212" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />

    {/* Mini sparklines (right side) */}
    {[
      { y: 70,  points: "180,85 200,72 220,78 240,62 260,68 280,55", label: "Income",  val: "+12%" },
      { y: 130, points: "180,148 200,140 220,152 240,135 260,142 280,128", label: "Spend", val: "-8%" },
      { y: 190, points: "180,205 200,198 220,210 240,195 260,200 280,188", label: "Saved", val: "+4%" },
    ].map((s, i) => (
      <g key={i}>
        <text x="180" y={s.y - 8} fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="sans-serif">{s.label}</text>
        <text x="280" y={s.y - 8} textAnchor="end" fill="rgba(255,255,255,0.8)" fontSize="9" fontFamily="sans-serif" fontWeight="600">{s.val}</text>
        <polyline points={s.points} fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="280" cy={parseFloat(s.points.split(" ").pop().split(",")[1])} r="3" fill="white" opacity="0.9" />
      </g>
    ))}
  </svg>
);

export default function Auth() {
  const [isSignup, setIsSignup] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  // LOGIN
  const handleLogin = async () => {
    try {
      setMessage("");
      if (!form.email || !form.password) {
        setIsError(true);
        return setMessage("Please fill all fields");
      }
      setLoading(true);
      const res = await API.post("/api/users/login", {
        email: form.email,
        password: form.password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      setIsError(true);
      setMessage(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // SIGNUP
  const handleSignup = async () => {
    try {
      setMessage("");
      if (!form.name || !form.email || !form.password) {
        setIsError(true);
        return setMessage("Please fill all fields");
      }
      setLoading(true);
      await API.post("/api/users/register", {
        name: form.name,
        email: form.email,
        password: form.password,
      });
      setIsError(false);
      setMessage("Signup successful! Please login.");
      setIsSignup(false);
    } catch (err) {
      setIsError(true);
      setMessage(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#7b0f3a]">
      <div className="w-[900px] h-[500px] bg-white rounded-2xl shadow-2xl flex overflow-hidden relative">

        {/* SLIDER PANEL */}
        <div
          className={`absolute top-0 left-0 w-1/2 h-full z-10 transition-transform duration-500 ${
            isSignup ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="w-full h-full flex flex-col items-center justify-between bg-gradient-to-br from-[#7b0f3a] via-[#c2185b] to-[#f06292] text-white py-6 px-4 overflow-hidden">
            {/* Graph fills top */}
            <div className="w-full flex-1 flex items-center justify-center">
              {isSignup ? <SignupGraphic /> : <LoginGraphic />}
            </div>

            {/* Bottom CTA */}
            <div className="flex flex-col items-center gap-3 pb-2">
              <div className="bg-white text-[#c2185b] px-6 py-1.5 rounded-full font-semibold text-sm tracking-wide shadow">
                {isSignup ? "SIGN UP" : "LOGIN"}
              </div>
              <button
                onClick={() => { setIsSignup(!isSignup); setMessage(""); }}
                className="text-white/80 text-sm underline underline-offset-2 hover:text-white transition"
              >
                {isSignup ? "Already have an account? Login" : "New here? Sign Up"}
              </button>
            </div>
          </div>
        </div>

        {/* LOGIN FORM */}
        <div className="w-1/2 flex flex-col justify-center px-10">
          <h2 className="text-xl font-semibold mb-4 text-pink-700">LOGIN</h2>
          <input
            type="email"
            placeholder="Email"
            className="border-b mb-3 outline-none py-1 text-sm"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <div className="relative mb-3">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="border-b w-full py-2 pr-10 outline-none text-sm"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-2 cursor-pointer text-base"
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>
          {!isSignup && message && (
            <p className={`text-sm mb-3 ${isError ? "text-red-500" : "text-green-600"}`}>
              {message}
            </p>
          )}
          <p
            onClick={() => setShowForgot(true)}
            className="text-xs text-pink-500 mb-4 cursor-pointer"
          >
            Forgot Password?
          </p>
          <button
            onClick={handleLogin}
            disabled={loading}
            className="bg-pink-500 hover:bg-pink-600 transition text-white px-6 py-2 rounded-full text-sm font-medium"
          >
            {loading ? "Please wait..." : "LOGIN"}
          </button>
        </div>

        {/* SIGNUP FORM */}
        <div className="w-1/2 flex flex-col justify-center px-10">
          <h2 className="text-xl font-semibold mb-4 text-pink-700">SIGN UP</h2>
          <input
            type="text"
            placeholder="Full Name"
            className="border-b mb-3 outline-none py-1 text-sm"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            className="border-b mb-3 outline-none py-1 text-sm"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <div className="relative mb-3">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="border-b w-full py-2 pr-10 outline-none text-sm"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-2 cursor-pointer text-base"
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>
          {isSignup && message && (
            <p className={`text-sm mb-3 ${isError ? "text-red-500" : "text-green-600"}`}>
              {message}
            </p>
          )}
          <button
            onClick={handleSignup}
            disabled={loading}
            className="bg-pink-500 hover:bg-pink-600 transition text-white px-6 py-2 rounded-full text-sm font-medium"
          >
            {loading ? "Please wait..." : "SIGN UP"}
          </button>
        </div>

        {/* FORGOT PASSWORD */}
        {showForgot && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-20">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="mb-4 font-medium text-pink-700">Reset Password</h3>
              <input
                type="email"
                placeholder="Enter email"
                className="border-b mb-4 outline-none py-1 text-sm w-full"
              />
              <button
                onClick={() => setShowForgot(false)}
                className="bg-pink-500 text-white px-4 py-1.5 rounded-full text-sm"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
