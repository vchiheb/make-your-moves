import { Outlet, Navigate } from "react-router-dom";

import { useSelector } from "react-redux";

export default function UserRoute() {
  const { userInfo } = useSelector((state) => state.auth);

  console.log("userinfo: ", userInfo);

  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
}
