import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import RecentOrders from "../components/RecentOrders";

const Home = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="text-center text-xl font-semibold">⏳ Đang tải...</div>;
  }

  //  <Dashboard />;

  return <h1 className="text-3xl font-bold text-center">🏠 Home Page</h1>;

};

export default Home;
