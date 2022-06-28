import React, { useEffect, useState } from "react";
import { Navigate, Outlet, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";
import { currentAdmin } from "../../functions/auuth";

const AdminRoutes = ({ ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          console.log("CURRENT ADMIN RES", res);
          setOk(true);
        })
        .catch((err) => {
          console.log("ADMIN ROUTE ERROR", err);
          setOk(false);
        });
    }
  }, [user]);

  return ok ? <Outlet /> : <LoadingToRedirect />;
};

export default AdminRoutes;
