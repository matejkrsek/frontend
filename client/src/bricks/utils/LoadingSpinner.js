import React from "react";
import { ProgressSpinner } from "primereact/progressspinner";

function LoadingSpinner() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ProgressSpinner />
    </div>
  );
}

export default LoadingSpinner;
