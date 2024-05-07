"use client";

import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";

export default function ToastProvider({ children }: React.PropsWithChildren) {
  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
}
