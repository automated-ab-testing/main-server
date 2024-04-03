"use client";

import { motion } from "framer-motion";
import CookieConsent from "react-cookie-consent";

import AppNavbar from "~/components/navbar/AppNavbar";
import createEventLog from "~/utils/user/create-event-log";

export default function RootTemplate({ children }: React.PropsWithChildren) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <AppNavbar />
      {children}
      <CookieConsent
        cookieName="cookie-consent"
        onAccept={() => void createEventLog()}
      >
        This website uses cookies to enhance the user experience.
      </CookieConsent>
    </motion.div>
  );
}
