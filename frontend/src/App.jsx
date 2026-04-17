import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/Auth";
import Dashboard from "./components/Dashboard";
import TransactionList from "./components/TransactionList";
import AddTransaction from "./components/AddTransaction";
import Charts from "./components/Charts";
import Insights from "./components/Insights";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" replace />;
}

export default function App() {
  return (
    <Routes>

      {/* AUTH */}
      <Route path="/" element={<Auth />} />
      <Route path="/login" element={<Auth />} />
      <Route path="/signup" element={<Auth />} />

      {/* PROTECTED ROUTES */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
<Route
  path="/settings"
  element={
    <PrivateRoute>
      <Settings />
    </PrivateRoute>
  }
/>
      <Route
        path="/transactions"
        element={
          <PrivateRoute>
            <TransactionList />
          </PrivateRoute>
        }
      />

      <Route
        path="/add"
        element={
          <PrivateRoute>
            <AddTransaction />
          </PrivateRoute>
        }
      />

      {/* ✅ ADD THESE INSIDE */}
      <Route
        path="/charts"
        element={
          <PrivateRoute>
            <Charts />
          </PrivateRoute>
        }
      />

      <Route
        path="/insights"
        element={
          <PrivateRoute>
            <Insights />
          </PrivateRoute>
        }
      />
      <Route
  path="/profile"
  element={
    <PrivateRoute>
      <Profile />
    </PrivateRoute>
  }
/>

    </Routes>
  );
}