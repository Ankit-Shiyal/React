import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Ui/Navbar";

const MainLayout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            {/* <Footer/> */}
        </>
    );
};

export default MainLayout;