import { useAdminLoginMutation } from "@/redux/api/auth";
import { setUserInfo } from "@/redux/slices/authSlice";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const initialState = {
  clientId: "",
  fullName: "admin",
  email: "",
  image:
    "https://cdn3d.iconscout.com/3d/premium/thumb/administrator-9384015-7621947.png?f=webp",
};

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialState,
  });

  const [update] = useAdminLoginMutation();

  useEffect(() => {
    dispatch(setUserInfo({}));
  }, []);

  const onSubmit = (data) => {
    update(data)
      .unwrap()
      .then((res) => {
        if (res?.user?.role?.includes("admin")) {
          dispatch(setUserInfo(res));
          router.push("/");
          toast.success("Login successfully!");
        } else {
          toast.error("You don't have paermission to access this!");
        }
      })
      .catch((err) => {
        toast.error(err?.data?.message);
      });
  };

  return (
    <div className="w-full h-screen">
      <div className="h-full flex justify-center items-center">
        <div className="max-w-[500px] px-[20px] rounded-[8px] md:px-[60px] py-[20px] md:py-[40px] w-full border border-[#EBEBEB]">
          <h1 className="mb-[50px] text-[20px] md:text-[32px] font-[800] text-center">
            Login to your account
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <div className="relative mb-9">
              <input
                type={"text"}
                className="w-full rounded-[4px] outline-none px-3 h-[50px] border border-[#00000033]"
                {...register("email", { required: true })}
                autoComplete="off"
              />
              <label className="inline-block text-gray font-[700] bg-white -translate-y-[0.7rem] scale-[0.7] absolute max-w-[90%] whitespace-nowrap overflow-hidden text-ellipsis pointer-events-none origin-[0_0] transition-all duration-[0.2s] ease-[ease-out] text-[rgba(0,0,0,0.6)] mb-0 pt-[0.37rem] left-3 top-0">
                Email<span className="text-red-700">*</span>
              </label>
            </div>
            <div className="relative">
              <input
                type={"password"}
                className="w-full rounded-[4px] outline-none pl-3 pr-10 h-[50px] border border-[#00000033]"
                {...register("clientId", { required: true })}
              />
              <label className="inline-block text-gray font-[700] bg-white -translate-y-[0.7rem] scale-[0.7] absolute max-w-[90%] whitespace-nowrap overflow-hidden text-ellipsis pointer-events-none origin-[0_0] transition-all duration-[0.2s] ease-[ease-out] text-[rgba(0,0,0,0.6)] mb-0 pt-[0.37rem] left-3 top-0">
                Password<span className="text-red-700">*</span>
              </label>
              <AiOutlineEye
                color="#7C7C7C"
                size={"24px"}
                className="absolute right-3 top-0 translate-y-[50%] cursor-pointer"
              />
            </div>
            <div className="my-3.5 text-right">
              <Link href={"#"} className="text-dark">
                Forgot password?
              </Link>
            </div>
            <div>
              {errors.clientId?.type === "required" ||
              errors.email?.type === "required" ? (
                <p
                  className="text-red-700 text-[15px] text-center pb-[16px]"
                  role="alert"
                >
                  Both fields are required
                </p>
              ) : (
                <></>
              )}
              <button
                type="submit"
                className="px-[24px] w-full py-[16px] bg-gray-200 hover:bg-gray-300 text-dark rounded-[4px] text-center"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
