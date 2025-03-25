import React from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
const Login = () => {
  const { login } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await login(data.email, data.password);
      toast.success(res.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
          Login
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 md:space-y-6" action="#">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input type="email" name="email" id="email"
                  {...register("email", { required: "Email không được để trống" })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input type="password" name="password" id="password" placeholder="••••••••"
                  {...register("password", { required: "Mật khẩu không được để trống" })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                  ${isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  }`}
              >
                {isSubmitting ? "Đang xử lý..." : "Đăng nhập"}
              </button>

            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Login;
