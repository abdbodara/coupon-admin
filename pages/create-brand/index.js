import { useCreateBrandMutation } from "@/redux/api/auth";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const initialState = {
  brandLogo: "",
  brandTitle: "",
  brandLink: "",
  about: "",
};

const CreateBrand = () => {
  const [update] = useCreateBrandMutation();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: initialState,
  });

  const [parsedData, setParsedData] = useState({});
  const [logoUrl, setLogoUrl] = useState("");

  const onSubmit = (data) => {
    const method = parsedData?._id ? "PUT" : "POST";
    const ID = parsedData?._id;
    update({ data, method, ID })
      .unwrap()
      .then((res) => {
        router.push("/brands");
        toast.success(res?.message);
      })
      .catch((err) => {
        toast.error(err?.data?.message);
      });
    setLogoUrl("");
    reset();
  };

  useEffect(() => {
    const serializedData = router.query.data;
    if (serializedData) {
      try {
        const parsedData = JSON.parse(serializedData);
        console.log("Parsed Data:", parsedData);
        reset(parsedData);
        setParsedData(parsedData);
      } catch (error) {
        console.log("Error parsing data:", error);
      }
    }
  }, [router.query.data]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <div className="2xl:max-w-[100%] w-full mx-auto px-5">
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 my-10 categories-form-main">
            <div className="flex flex-col xl:gap-2 gap-1 text-base w-full">
              <label className="text-gray-700 font-medium">Brand Logo</label>
              <label
                htmlFor="dropzone-logo-file"
                className="flex flex-col items-center justify-center w-full h-30 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {logoUrl || getValues("brandLogo") ? (
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">
                        {logoUrl?.slice(12)}
                      </span>
                    </p>
                  ) : (
                    <>
                      <svg
                        aria-hidden="true"
                        className="w-10 h-10 mb-3 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        ></path>
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG or JPG
                      </p>
                    </>
                  )}
                  {getValues("brandLogo") && !logoUrl ? (
                    <img
                      style={{ marginTop: "10px", width: "50px" }}
                      src={`http://localhost:3000/uploads/${getValues(
                        "brandLogo"
                      )}`}
                      alt="uploaded file"
                    />
                  ) : (
                    ""
                  )}
                </div>
                <input
                  id="dropzone-logo-file"
                  type="file"
                  className="w-full hidden"
                  accept="image/*"
                  {...register("brandLogo", {
                    required: getValues("brandLogo") ? false : true,
                    onChange: (e) => {
                      setLogoUrl(e.target.value);
                    },
                  })}
                />
              </label>
              {errors.brandLogo?.type === "required" && (
                <p className="text-red-700 text-[15px] text-start" role="alert">
                  Retailer Logo is required
                </p>
              )}
            </div>
            <div className="flex flex-col xl:gap-2 gap-1 text-base w-full">
              <label className="text-gray-700 font-medium">Brand Title</label>
              <input
                type="text"
                className="py-2 px-4 border border-gray-300 rounded-md max-h-[42px] "
                placeholder="Brand Title"
                {...register("brandTitle", { required: true })}
              />
              {errors.brandTitle?.type === "required" && (
                <p className="text-red-700 text-[15px] text-start" role="alert">
                  Brand Title is required
                </p>
              )}
            </div>
            <div className="flex flex-col xl:gap-2 gap-1 text-base w-full">
              <label className="text-gray-700 font-medium">Brand Link</label>
              <input
                type="text"
                className="py-2 px-4 border border-gray-300 rounded-md"
                placeholder="Brand Link"
                {...register("brandLink", { required: true })}
              />
              {errors.brandLink?.type === "required" && (
                <p className="text-red-700 text-[15px] text-start" role="alert">
                  Brand Link is required
                </p>
              )}
            </div>
            <div className="flex flex-col xl:gap-2 gap-1 text-base w-full">
              <label className="text-gray-700 font-medium">About</label>
              <textarea
                className="py-2 px-4 border border-gray-300 rounded-md"
                placeholder="About"
                {...register("about", { required: true })}
              />
              {errors.about?.type === "required" && (
                <p className="text-red-700 text-[15px] text-start" role="alert">
                  About is required
                </p>
              )}
            </div>
          </div>
          <div className="my-7 flex justify-center">
            <button
              type="submit"
              className="text-white bg-green-500 hover:bg-green-700 uppercase rounded-md px-5 py-2 text-base font-semibold"
            >
              submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateBrand;
