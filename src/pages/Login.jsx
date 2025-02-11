import React from "react";

const Login = () => {
    const handleLogin = () => {
      localStorage.setItem("token", "fakeToken"); // Giả lập login
      window.location.href = "/dashboard"; // Chuyển hướng
    };
  
    return (
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold">🔑 Login</h1>
        <button onClick={handleLogin} className="px-4 py-2 bg-blue-500 text-white rounded">
          Đăng nhập
        </button>
      </div>
    );
  };
  export default Login;
  