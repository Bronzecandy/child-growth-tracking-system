import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import Layout from "./components/Layout/Layout";
function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <AppRoutes />
        </Layout>
        <ToastContainer position="bottom-right" theme="colored" />
      </AuthProvider>
    </Router>
  );
}

export default App;
