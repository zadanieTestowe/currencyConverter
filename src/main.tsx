import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CurrencyConverter } from "./CurrencyConverter.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CurrencyConverter />
  </StrictMode>
);
