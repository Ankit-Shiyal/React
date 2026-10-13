const Loading = ({ message = "Loading workforce data...", subtext = "Fetching latest records from server" }) => {
  return (
    <div className="enterprise-card p-5 my-4 text-center">
      <div className="d-inline-flex align-items-center justify-content-center mb-3">
        <div
          className="spinner-border text-primary"
          role="status"
          style={{ width: "2.5rem", height: "2.5rem", borderWidth: "0.22rem" }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
      <h6 className="fw-semibold text-dark mb-1">{message}</h6>
      <p className="text-muted small mb-0">{subtext}</p>
    </div>
  );
};

export default Loading;