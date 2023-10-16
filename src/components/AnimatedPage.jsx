import React from "react";
import { motion } from "framer-motion";
import { slideLeftFade } from "../motion/presets";

const AnimatedPage = ({ children }) => {
  return (
    <motion.div
      {...slideLeftFade}
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "3rem",
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;
