import Layout from "@/components/Layout/Layout";

import "@/styles/globals.css";
import StoreProvider from "@/redux/provider";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import GlobalApis from "@/utils";

export default function App({ Component, pageProps }) {
  const [loader, setLoader] = useState(true);

  setTimeout(() => {
    setLoader(false);
  }, 1000);

  return (
    <>
      <StoreProvider>
        <Layout>
          <GlobalApis/>
          {loader ? (
            <div className="fixed inset-0 bg-black bg-opacity-60 z-50 h-full backdrop-blur">
              <div className="h-full flex justify-center items-center">
                <div class="spinner"></div>
              </div>
            </div>
          ) : (
            <Component {...pageProps} />
          )}
        </Layout>
      </StoreProvider>
      <ToastContainer />
    </>
  );
}
