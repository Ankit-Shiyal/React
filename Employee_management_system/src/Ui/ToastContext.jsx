/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, variant = "success", title = "") => {
    const id = Date.now() + Math.random();
    const defaultTitle =
      title ||
      (variant === "success"
        ? "Success"
        : variant === "danger"
          ? "Error"
          : "Notification");

    setToasts((prev) => [...prev, { id, message, variant, title: defaultTitle }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer
        position="top-end"
        className="p-3"
        style={{ position: "fixed", top: "12px", right: "12px", zIndex: 1090 }}
      >
        {toasts.map((t) => {
          const isError = t.variant === "danger";
          const iconClass = isError
            ? "bi-exclamation-triangle-fill text-danger"
            : "bi-check-circle-fill text-success";

          return (
            <Toast
              key={t.id}
              onClose={() => removeToast(t.id)}
              delay={4000}
              autohide
              className="border-0 shadow-lg rounded-3 mb-2 overflow-hidden"
              style={{
                backgroundColor: "#ffffff",
                borderLeft: `4px solid ${isError ? "#dc2626" : "#10b981"}`,
                minWidth: "300px",
              }}
            >
              <Toast.Header
                closeButton
                className="border-bottom-0 pb-1 pt-2 px-3 bg-white"
              >
                <i className={`bi ${iconClass} me-2 fs-6`} />
                <strong className="me-auto text-dark" style={{ fontSize: "0.875rem" }}>
                  {t.title}
                </strong>
                <small className="text-muted" style={{ fontSize: "0.72rem" }}>
                  Just now
                </small>
              </Toast.Header>
              <Toast.Body
                className="pt-1 pb-2 px-3 text-secondary"
                style={{ fontSize: "0.825rem" }}
              >
                {t.message}
              </Toast.Body>
            </Toast>
          );
        })}
      </ToastContainer>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    return {
      showToast: (msg) => console.log("Toast:", msg),
    };
  }
  return context;
};
