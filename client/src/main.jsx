/* eslint-disable react/prop-types */
import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { PageProvider } from "./utils/PageContext.jsx";
import { NextUIProvider } from "@nextui-org/react";

// Create a BlurLayout component
export function BlurLayout({ children }) {
  return (
    <main className="text-foreground relative gradient-purple">
      <div className="absolute inset-0 backdrop-brightness-50"></div>

      <div className="relative z-10">{children}</div>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <BrowserRouter>
        <PageProvider>
          {/* Wrap your App component with BlurLayout */}
          <BlurLayout>
            <App />
          </BlurLayout>
        </PageProvider>
      </BrowserRouter>
    </NextUIProvider>
  </React.StrictMode>
);
