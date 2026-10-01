import React from "react";

const Loading = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "280px",
        padding: "30px",
        backgroundColor: "#fff",
        borderRadius: "15px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: "45px",
          height: "45px",
          border: "4px solid #e9ecef",
          borderTop: "4px solid #0d6efd",
          borderRadius: "50%",
          margin: "0 auto",
          animation: "spin 0.8s linear infinite",
        }}
      />

      <h5
        style={{
          marginTop: "20px",
          marginBottom: "8px",
          fontWeight: "600",
        }}
      >
        Loading...
      </h5>

      <p
        style={{
          margin: 0,
          color: "#6c757d",
          fontSize: "14px",
        }}
      >
        Please wait
      </p>

      <style>
        {`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Loading;