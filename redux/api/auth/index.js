import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Category", "Marchants", "Coupons", "Offers", "Brands"],
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (body) => ({
        url: "login",
        method: "POST",
        body: body,
      }),
    }),
    getCategories: builder.query({
      query: () => "getCategoriesData",
      providesTags: ["Category"],
    }),
    getMerchants: builder.query({
      query: () => "merchant",
      providesTags: ["Marchants"],
    }),
    getCoupons: builder.query({
      query: () => "getCoupons",
      providesTags: ["Coupons"],
    }),
    getOffers: builder.query({
      query: () => "getOffer",
      providesTags: ["Offers"],
    }),
    getBrand: builder.query({
      query: () => "getbrands",
      providesTags: ["Brands"],
    }),
    createMerchant: builder.mutation({
      query: ({ data, method, ID }) => {
        const {
          RetailerName,
          RetailerLogo,
          RetailerRank,
          RetailerUrl,
          Affilate,
          RetailerPublish,
          Title,
          Desc,
          Metadesc,
          Metatitle,
          RetailerImage,
          categoriesId,
        } = data;
        const bodyFormData = new FormData();
        bodyFormData.append("RetailerName", RetailerName);
        bodyFormData.append(
          "RetailerLogo",
          typeof RetailerLogo === "string" ? RetailerLogo : RetailerLogo?.[0]
        );
        bodyFormData.append("RetailerRank", RetailerRank);
        bodyFormData.append("RetailerUrl", RetailerUrl);
        bodyFormData.append("Affilate[0][name]", Affilate?.[0]["name"]);
        bodyFormData.append("Affilate[0][url]", Affilate?.[0]["url"]);
        bodyFormData.append("RetailerPublish", RetailerPublish);
        bodyFormData.append("Title", Title);
        bodyFormData.append("Desc", Desc);
        bodyFormData.append("Metadesc", Metadesc);
        bodyFormData.append("Metatitle", Metatitle);
        bodyFormData.append(
          "RetailerImage",
          typeof RetailerImage === "string" ? RetailerImage : RetailerImage?.[0]
        );
        bodyFormData.append("categoriesId", categoriesId);
        return {
          url: method == "PUT" ? `updateMerchant/${ID}` : "createmerchant",
          method: method,
          body: bodyFormData,
        };
      },
      invalidatesTags: ["Marchants", "Category"],
    }),
    createCategory: builder.mutation({
      query: (body) => {
        const { image, categoriesName } = body;
        const bodyFormData = new FormData();
        bodyFormData.append("categoriesName", categoriesName);
        bodyFormData.append("image", image?.[0]);
        return {
          url: "createCategories",
          method: "POST",
          body: bodyFormData,
        };
      },
      invalidatesTags: ["Category"],
    }),
    createCoupon: builder.mutation({
      query: ({ data, method, ID }) => ({
        url: method == "PUT" ? `updateCoupon/${ID}` : "couponCoupon",
        method: method,
        body: data,
      }),
      invalidatesTags: ["Coupons", "Category"],
    }),
    createOffers: builder.mutation({
      query: (body) => {
        const {
          logo,
          image,
          desc,
          title,
          RetailerName,
          conditions,
          categoriesId,
        } = body;
        const bodyFormData = new FormData();
        bodyFormData.append("logo", logo?.[0]);
        bodyFormData.append("image", image?.[0]);
        bodyFormData.append("desc", desc);
        bodyFormData.append("title", title);
        bodyFormData.append("RetailerName", RetailerName);
        bodyFormData.append("conditions", conditions);
        bodyFormData.append("categoriesId", categoriesId);
        return {
          url: "createOffer",
          method: "POST",
          body: bodyFormData,
        };
      },
      invalidatesTags: ["Offers", "Marchants", "Category"],
    }),
    deleteCoupon: builder.mutation({
      query: (id) => ({
        url: `deleteCoupon/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Coupons", "Category"],
    }),
    deleteMerchant: builder.mutation({
      query: (id) => ({
        url: `deleteMerchant/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Marchants", "Category"],
    }),
    createBrand: builder.mutation({
      query: ({ data, method, ID }) => {
        const { brandLogo, brandTitle, brandLink, about } = data;
        const bodyFormData = new FormData();
        bodyFormData.append("brandLogo", brandLogo?.[0]);
        bodyFormData.append("brandTitle", brandTitle);
        bodyFormData.append("brandLink", brandLink);
        bodyFormData.append("about", about);
        return {
          url: method == "PUT" ? `updateBrand/${ID}` : "brand",
          method: method,
          body: bodyFormData,
        };
      },
      invalidatesTags: ["Brands"],
    }),
    deleteBrand: builder.mutation({
      query: (id) => ({
        url: `deleteBrand/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Brands"],
    }),
  }),
});

export const {
  useAdminLoginMutation,
  useGetCategoriesQuery,
  useCreateMerchantMutation,
  useCreateCategoryMutation,
  useGetMerchantsQuery,
  useGetCouponsQuery,
  useCreateCouponMutation,
  useGetOffersQuery,
  useCreateOffersMutation,
  useDeleteCouponMutation,
  useDeleteMerchantMutation,
  useGetBrandQuery,
  useDeleteBrandMutation,
  useCreateBrandMutation
} = authApi;
