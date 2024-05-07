"use client";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export default function ToastProvider({ children }: React.PropsWithChildren) {
  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
}
