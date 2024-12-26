import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import AuthGuard from "./guards/AuthGuard";

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthGuard>
            <Navigate to="/chat" />
          </AuthGuard>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/chat"
        element={
          <AuthGuard>
            <Chat />
          </AuthGuard>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
