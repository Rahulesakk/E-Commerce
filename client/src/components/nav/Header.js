import React, { useState } from "react";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import * as firebase from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
// import { useDispatch,  useSelector } from "react-redux";

// import {auth} from "firebase/auth";
// import firebase from "firebase/auth";
//
// require("firebase/auth");

import { useDispatch, useSelector } from "react-redux";
import { useNavigate  } from "react-router-dom";

const { Submenu } = Menu;

function Header() {
  const [current, setCurrent] = useState("home");
  let dispatch = useDispatch();
  let {user} = useSelector ((state) => ({...state}) )
  // let { user } = useSelector((state) => {
  //   console.log(state, "({ ...state })({ ...state })");
  //   // ({ ...state });
  // });
  const history = useNavigate();
  const auth = getAuth();

  const handleClick = (e) => {
    console.log(e.key);
    setCurrent(e.key);
  };
  const logout = () => {
    signOut(auth);
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    history("/login");
  };

  console.log(user, "useruseruser");
  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Menu.Item key="home" icon={<AppstoreOutlined />}>
        <Link to="/">Home </Link>
      </Menu.Item>

      {!user && (
        <Menu.Item
          key="register"
          icon={<UserAddOutlined />}
          className="float-right"
        >
          <Link to="/register">Register</Link>
        </Menu.Item>
      )}
      {!user && (
        <Menu.Item key="login" icon={<UserOutlined />} className="float-right">
          <Link to="/login">Login</Link>
        </Menu.Item>
      )}

      {user && (
        <Menu.SubMenu
          key="SubMenu"
          title={user.email && user.email.split("@")[0]}
          icon={<SettingOutlined />}
          className="float-right"
        >
          {/* <Menu.Item key="two" icon={<AppstoreOutlined />}>
            Navigation Two
          </Menu.Item>
          <Menu.Item key="three" icon={<AppstoreOutlined />}>
            Navigation Three
          </Menu.Item> */}
          {user && user.role === "subscriber" && (
            <Menu.Item>
              <Link to="/user/history">Dashboard</Link>
            </Menu.Item>
          )}
          {user && user.role === "admin" && (
            <Menu.Item>
              <Link to="/admin/dashboard">Dashboard</Link>
            </Menu.Item>
          )}
          <Menu.Item icon={<LogoutOutlined />} onClick={logout}>
            LOGOUT
          </Menu.Item>
        </Menu.SubMenu>
      )}
    </Menu>
  );
}

export default Header;
