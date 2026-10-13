import { Outlet } from "react-router-dom";
import Navbar from "../Ui/Navbar";

const MainLayout = () => {
  return (
    <div className="app-shell">
      <div className="app-content-area">
        <Navbar />
        <main className="app-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;