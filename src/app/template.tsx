"use client";

import { motion } from "framer-motion";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import AppNavbar from "~/components/navbar/AppNavbar";

export default function RootTemplate({ children }: React.PropsWithChildren) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <AppNavbar />
      {children}
      <ToastContainer />
    </motion.div>
  );
}
