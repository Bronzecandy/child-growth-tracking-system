import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="text-center text-xl font-semibold">⏳ Đang tải...</div>;
  }

  return <h1 className="text-3xl font-bold text-center">🏠 Home Page</h1>;
};

export default Home;
