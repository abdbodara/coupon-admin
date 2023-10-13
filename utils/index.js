import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  useGetBrandQuery,
  useGetCategoriesQuery,
  useGetCouponsQuery,
  useGetMerchantsQuery,
  useGetOffersQuery,
} from "@/redux/api/auth";
import {
  setCoupons,
  setBrands,
  setCategories,
  setMarchants,
  setOffers,
} from "@/redux/slices/globalSlice";

const GlobalApis = () => {
  const { data: category } = useGetCategoriesQuery();
  const { data: marchants } = useGetMerchantsQuery();
  const { data: coupons } = useGetCouponsQuery();
  const { data: offers } = useGetOffersQuery();
  const { data: brands } = useGetBrandQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCategories(category));
    dispatch(setMarchants(marchants));
    dispatch(setCoupons(coupons));
    dispatch(setOffers(offers));
    dispatch(setBrands(brands));
  }, [category, marchants, coupons, offers, brands]);

  return <></>;
};

export default GlobalApis;
