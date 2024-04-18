"use client";

import { motion } from "framer-motion";

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
    </motion.div>
  );
}
