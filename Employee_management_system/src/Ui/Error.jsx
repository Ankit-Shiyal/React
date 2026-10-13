import { Link, useRouteError } from "react-router-dom";

const Error = () => {
  const routeError = useRouteError();

  return (
    <div
      className="d-flex align-items-center justify-content-center p-4"
      style={{ minHeight: "100vh", backgroundColor: "#f8fafc" }}
    >
      <div
        className="enterprise-card p-5 text-center"
        style={{ maxWidth: "480px", width: "100%" }}
      >
        <div
          className="mx-auto mb-4 d-flex align-items-center justify-content-center rounded-circle"
          style={{
            width: "72px",
            height: "72px",
            backgroundColor: "#fef2f2",
            color: "#dc2626",
            fontSize: "2rem",
          }}
        >
          <i className="bi bi-exclamation-octagon" />
        </div>

        <span className="badge bg-danger-subtle text-danger rounded-pill px-3 py-1 mb-2 fw-semibold">
          Error 404
        </span>

        <h3 className="fw-bold text-dark mb-2">Page Not Found</h3>

        <p className="text-muted mb-4" style={{ fontSize: "0.925rem" }}>
          {routeError?.statusText ||
            routeError?.message ||
            "The page you are looking for doesn't exist or may have been moved."}
        </p>

        <div className="d-flex justify-content-center gap-2 flex-wrap">
          <Link to="/" className="btn btn-primary-enterprise text-decoration-none">
            <i className="bi bi-grid-1x2-fill" />
            Back to Dashboard
          </Link>
          <Link
            to="/employees"
            className="btn btn-outline-secondary fw-medium px-3"
            style={{ fontSize: "0.875rem", borderRadius: "8px" }}
          >
            View Employees
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error;