import React from "react";
import Appbar from "../dashboard_components/Appbar";
import Balance from "../dashboard_components/Balance";
import { Users } from "../dashboard_components/Users";

const Dashboard = () => {
  return (
    <div>
      <Appbar></Appbar>
      <Balance></Balance>
      <Users />
    </div>
  );
};

export default Dashboard;
