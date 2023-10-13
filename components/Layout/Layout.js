import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const Layout = ({ children }) => {

  const router = useRouter();

  const token = useSelector((state) => state.auth.token)
  const userInfo = useSelector((state) => state.auth.userInfo)

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (token == "" || userInfo?.user?.role !== 'admin') {
      router.push("/login")
    }
  }, [token])

  if (router.pathname.includes('login')) {
    // dispatch(setUserInfo({}));
    return <div>
      {children}
    </div>;
  }

  return (
    <div>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="lg:pl-56">
        <Header setSidebarOpen={setSidebarOpen} />
        {children}
      </div>
    </div>
  );
};

export default Layout;
