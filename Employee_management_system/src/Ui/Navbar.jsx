import { useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";

function SidebarNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    {
      to: "/",
      label: "Dashboard",
      icon: "bi-grid-1x2-fill",
      end: true,
    },
    {
      to: "/employees",
      label: "Employees",
      icon: "bi-people-fill",
      end: false,
    },
    {
      to: "/add",
      label: "Add Employee",
      icon: "bi-person-plus-fill",
      end: false,
    },
  ];

  const getPageBreadcrumb = () => {
    if (location.pathname === "/" || location.pathname === "/dashboard") {
      return "Dashboard Overview";
    }
    if (location.pathname.startsWith("/employees")) return "Employee Directory";
    if (location.pathname.startsWith("/add")) return "Employee Registration";
    if (location.pathname.startsWith("/update")) return "Update Employee Record";
    return "HR Portal";
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="sidebar-backdrop d-lg-none"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Left Dark Charcoal Sidebar */}
      <aside
        className={`app-sidebar ${mobileOpen ? "mobile-open" : ""}`}
        aria-label="Main Navigation"
      >
        <Link
          to="/"
          className="sidebar-brand"
          onClick={() => setMobileOpen(false)}
        >
          <div className="brand-logo-box">
            <i className="bi bi-buildings-fill" />
          </div>
          <div>
            <h1 className="brand-title">EmpManage</h1>
            <span className="brand-subtitle">Enterprise HR Suite</span>
          </div>
          <button
            type="button"
            className="btn btn-link text-secondary ms-auto d-lg-none p-1"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setMobileOpen(false);
            }}
            aria-label="Close navigation menu"
          >
            <i className="bi bi-x-lg text-white fs-5" />
          </button>
        </Link>

        <div className="sidebar-nav-section">
          <div className="sidebar-section-label">Core Workspace</div>
          <nav className="nav flex-column">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `sidebar-nav-link ${isActive ? "active" : ""}`
                }
              >
                <i className={`bi ${item.icon}`} />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="sidebar-section-label mt-4">Quick Links</div>
          <div className="px-2">
            <div
              className="p-3 rounded-3"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.07)",
              }}
            >
              <div className="d-flex align-items-center gap-2 mb-1">
                <span
                  className="d-inline-block rounded-circle"
                  style={{ width: "8px", height: "8px", backgroundColor: "#10b981" }}
                />
                <span className="text-white fw-semibold" style={{ fontSize: "0.78rem" }}>
                  System Connected
                </span>
              </div>
              <p className="mb-0" style={{ fontSize: "0.72rem", color: "#94a3b8" }}>
                Live synchronization with Employee REST API.
              </p>
            </div>
          </div>
        </div>

        <div className="sidebar-footer">
          <div className="d-flex align-items-center gap-2">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center fw-bold"
              style={{
                width: "34px",
                height: "34px",
                backgroundColor: "#1e293b",
                color: "#60a5fa",
                fontSize: "0.8rem",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              HR
            </div>
            <div className="overflow-hidden">
              <div
                className="text-white fw-semibold text-truncate"
                style={{ fontSize: "0.8125rem" }}
              >
                HR Operations
              </div>
              <div
                className="text-truncate"
                style={{ fontSize: "0.72rem", color: "#94a3b8" }}
              >
                Admin Workspace
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Sticky Top Header Bar */}
      <header className="app-topbar">
        <div className="d-flex align-items-center gap-3">
          <button
            type="button"
            className="btn btn-light border d-lg-none d-inline-flex align-items-center justify-content-center"
            style={{ width: "38px", height: "38px", borderRadius: "8px" }}
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
          >
            <i className="bi bi-list fs-5 text-dark" />
          </button>

          <div className="d-flex align-items-center gap-2">
            <span className="text-muted small d-none d-sm-inline">Workspace</span>
            <i
              className="bi bi-chevron-right text-muted small d-none d-sm-inline"
              style={{ fontSize: "0.7rem" }}
            />
            <span className="fw-semibold text-dark" style={{ fontSize: "0.925rem" }}>
              {getPageBreadcrumb()}
            </span>
          </div>
        </div>

        <div className="d-flex align-items-center gap-2">
          {location.pathname !== "/add" && (
            <Link
              to="/add"
              className="btn btn-primary-enterprise btn-sm text-decoration-none"
            >
              <i className="bi bi-plus-lg" />
              <span className="d-none d-sm-inline">New Employee</span>
            </Link>
          )}
        </div>
      </header>
    </>
  );
}

export default SidebarNavbar;