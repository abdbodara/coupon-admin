import { useCreateCouponMutation } from "@/redux/api/auth";
import { inputDateFormat } from "@/utils/common";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-quill/dist/quill.snow.css";
import TextEditor from "@/components/common/text-editor";

const initialState = {
  RetailerName: "",
  CouponCode: "",
  ExpiryDate: "",
  Conditions: "",
  Title: "",
  Description: "",
  categoriesId: "",
};

const Coupon = () => {
  const categories = useSelector((state) => state.cat.categories);
  const marchants = useSelector((state) => state.cat.marchants);

  const [update] = useCreateCouponMutation();

  const router = useRouter();
  const reactQuillRef = useRef();

  const [text, setText] = useState();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: initialState,
  });

  const [selectedCat, setSelectedCat] = useState("");
  const [parsedData, setParsedData] = useState({});

  const onSubmit = (data) => {
    console.log("🚀 ~ file: index.js:93 ~ onSubmit ~ data:", data);
    const method = parsedData?._id ? "PUT" : "POST";
    const ID = parsedData?._id;
    // update({ data, method, ID })
    //   .unwrap()
    //   .then((res) => {
    //     router.push("/coupons");
    //     toast.success(res?.message);
    //     reset();
    //   })
    //   .catch((err) => {
    //     toast.error(err?.data?.message);
    //     reset();
    //   });
    setSelectedCat("");
    reset();
  };

  const onQuillChange = (html) => {
    setText(html);
    setValue("Conditions", html);
  };

  useEffect(() => {
    const serializedData = router.query.data;
    if (serializedData) {
      try {
        const parsedData = JSON.parse(serializedData);
        console.log("Parsed Data:", parsedData);
        reset(parsedData);
        setValue("ExpiryDate", inputDateFormat(parsedData?.ExpiryDate));
        setSelectedCat(parsedData?.categoriesId);
        setParsedData(parsedData);
      } catch (error) {
        console.log("Error parsing data:", error);
      }
    }
  }, [router.query.data]);

  return (
    <div>
      {/* <div
        dangerouslySetInnerHTML={{
          __html: `<ul><li>Shop sitewide products &amp; get&nbsp;<span style="color: rgb(17, 161, 97);">up to 70% OFF</span>&nbsp;on&nbsp;your orders</li><li>The minimum value orders above&nbsp;<span style="color: rgb(17, 161, 97);">Rs&nbsp;3000&nbsp;</span>to&nbsp;avail The additional&nbsp;<span style="color: rgb(17, 161, 97);">Rs&nbsp;500&nbsp;OFF</span></li><li>Bank Offers: Avail&nbsp;up&nbsp;to&nbsp;<span style="color: rgb(133, 20, 75);">10%&nbsp;OFF&nbsp;</span>on top leading banks</li><li>Choose categories like&nbsp;<span style="color: rgb(177, 13, 201);">kitchen appliances, Refrigerator, ACs,Coolers &amp; many more</span></li><li>Oneplus and iPhone brands, as well as mobile phones, do not qualify for this code's use</li><li>Brands available are&nbsp;<span style="color: rgb(255, 133, 27);">Samsung, Croma, Haier, LG&nbsp;</span>&amp; many more</li><li>Coupon code can be used once per customer,&nbsp;<span style="color: rgb(17, 161, 97);">1-time&nbsp;</span>redemption only</li></ul><p><br></p>`,
        }}
      /> */}
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <div className="2xl:max-w-[100%] w-full mx-auto px-5">
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 my-10 categories-form-main">
            <div className="flex flex-col xl:gap-2 gap-1 text-base w-full">
              <label className="text-gray-700 font-medium">Title</label>
              <input
                type="text"
                className="py-2 px-4 border border-gray-300 rounded-md"
                placeholder="Title"
                {...register("Title", { required: true })}
              />
              {errors.Title?.type === "required" && (
                <p className="text-red-700 text-[15px] text-start" role="alert">
                  Title is required
                </p>
              )}
            </div>
            <div className="flex flex-col xl:gap-2 gap-1 text-base w-full">
              <label className="text-gray-700 font-medium">Description</label>
              <input
                type="text"
                className="py-2 px-4 border border-gray-300 rounded-md"
                placeholder="Description"
                {...register("Description", { required: true })}
              />
              {errors.Description?.type === "required" && (
                <p className="text-red-700 text-[15px] text-start" role="alert">
                  Description is required
                </p>
              )}
            </div>
            <div className="flex flex-col xl:gap-2 gap-1 text-base w-full">
              <label className="text-gray-700 font-medium">Coupon Code</label>
              <input
                type="text"
                className="py-2 px-4 border border-gray-300 rounded-md"
                placeholder="Coupon Code"
                {...register("CouponCode", { required: true })}
              />
              {errors.CouponCode?.type === "required" && (
                <p className="text-red-700 text-[15px] text-start" role="alert">
                  Coupon Code is required
                </p>
              )}
            </div>
            <div className="flex flex-col xl:gap-2 gap-1 text-base w-full">
              <label className="text-gray-700 font-medium">Category</label>
              <select
                name="select-category"
                id="select-category"
                placeholder="Categories ID"
                className="py-2 px-4 border border-gray-300 bg-white rounded-md min-h-[42px] cursor-pointer"
                {...register("categoriesId", {
                  required: true,
                  onChange: (e) => {
                    setSelectedCat(e.target.value);
                  },
                })}
              >
                <option value="" selected>
                  Select an Option
                </option>
                {categories &&
                  categories?.data?.map((val) => {
                    return (
                      <option key={val?._id} value={val?._id}>
                        {val?.categoriesName}
                      </option>
                    );
                  })}
              </select>
              {errors.categoriesId?.type === "required" && (
                <p className="text-red-700 text-[15px] text-start" role="alert">
                  Category is required
                </p>
              )}
            </div>
            <div className="flex flex-col xl:gap-2 gap-1 text-base w-full">
              <label className="text-gray-700 font-medium">Retailer Name</label>
              <select
                name="select-category"
                id="select-category"
                disabled={selectedCat.length > 0 ? false : true}
                className={`py-2 px-4 border border-gray-300 bg-white rounded-md min-h-[42px] ${
                  selectedCat.length > 0
                    ? "cursor-pointer"
                    : "cursor-not-allowed"
                }`}
                {...register("RetailerName", { required: true })}
              >
                <option value="" selected>
                  Select an Option
                </option>
                {marchants &&
                  marchants?.data
                    ?.filter((mar) => {
                      return mar.categoriesId === selectedCat;
                    })
                    ?.map((val) => {
                      return (
                        <option key={val?._id} value={val?.RetailerName}>
                          {val?.RetailerName}
                        </option>
                      );
                    })}
              </select>
              {errors.RetailerName?.type === "required" && (
                <p className="text-red-700 text-[15px] text-start" role="alert">
                  Retailer Name is required
                </p>
              )}
            </div>
            <div className="flex flex-col xl:gap-2 gap-1 text-base w-full">
              <label className="text-gray-700 font-medium">Expiry Date</label>
              <input
                type="date"
                className="py-2 px-4 border border-gray-300 rounded-md max-h-[42px] cursor-pointer"
                placeholder="Expiry Date"
                {...register("ExpiryDate", { required: true })}
              />
              {errors.ExpiryDate?.type === "required" && (
                <p className="text-red-700 text-[15px] text-start" role="alert">
                  Expiry Date is required
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col xl:gap-2 gap-1 text-base w-full">
            <label className="text-gray-700 font-medium">Conditions</label>
            <TextEditor
              reactQuillRef={reactQuillRef}
              onQuillChange={onQuillChange}
              value={watch("Conditions")}
            />
            {errors.Conditions?.type === "required" && (
              <p className="text-red-700 text-[15px] text-start" role="alert">
                Conditions is required
              </p>
            )}
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

export default Coupon;
