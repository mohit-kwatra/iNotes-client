import React, { useEffect, useRef, useState } from "react";
import { useColorMode, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Circle from "./utils/circle";
import { fadeIn } from "../../motion/presets";

export let ctx;
export let mouse = {
  x: 0,
  y: 0,
};

const Canvas = () => {
  const circleArray = [];
  const colors = useColorModeValue(
    ["#FF9A00", "#08D9D6"],
    ["#24a0ff", "#868686"]
  );
  const { colorMode } = useColorMode();
  const canvas = useRef();
  ctx = useRef();
  let reqAF = useRef();

  const [sizes, setSizes] = useState({
    x: window.innerWidth,
    y: window.innerHeight,
  });

  const animate = () => {
    reqAF.current = requestAnimationFrame(animate);

    ctx.current.clearRect(0, 0, sizes.x, sizes.y);
    for (let circle of circleArray) {
      circle.update();
    }
  };

  const onResize = () => {
    setSizes({
      x: window.innerWidth,
      y: window.innerHeight,
    });
  };

  const onMouseMove = ({ x, y }) => {
    mouse.x = x;
    mouse.y = y;
  };

  const didMount = useRef(false);
  useEffect(() => {
    if (didMount.current) {
      canvas.current.width = sizes.x;
      canvas.current.height = sizes.y;

      circleArray.length = 0;
      for (let i = 0; i < 100; i++) {
        const radius = Math.floor(Math.random() * 3) + 3; // 3 - 5
        const pos = {
          x: Math.floor(Math.random() * (sizes.x - radius * 2 + 1)) + radius,
          y: Math.floor(Math.random() * (sizes.y - radius * 2 + 1)) + radius,
        };
        const val = {
          x: (Math.random() - 0.5) * 0.2,
          y: (Math.random() - 0.5) * 0.2,
        };
        const fillColor = colors[Math.floor(Math.random() * colors.length)];

        circleArray.push(
          new Circle(pos.x, pos.y, radius, val.x, val.y, fillColor)
        );
      }
      cancelAnimationFrame(reqAF.current);
      window.removeEventListener("resize", onResize);
      animate();
    } else {
      didMount.current = true;
      canvas.current.width = sizes.x;
      canvas.current.height = sizes.y;

      ctx.current = canvas.current.getContext("2d");
      for (let i = 0; i < 100; i++) {
        const radius = Math.floor(Math.random() * 11) + 5;
        const pos = {
          x: Math.floor(Math.random() * (sizes.x - radius * 2 + 1)) + radius,
          y: Math.floor(Math.random() * (sizes.y - radius * 2 + 1)) + radius,
        };
        const val = {
          x: Math.random() - 0.5,
          y: Math.random() - 0.5,
        };
        const fillColor = colors[Math.floor(Math.random() * colors.length)];

        circleArray.push(
          new Circle(pos.x, pos.y, radius, val.x, val.y, fillColor)
        );
      }
      animate();
    }
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
    };
    // eslint-disable-next-line
  }, [sizes, colorMode]);

  return <motion.canvas {...fadeIn} ref={canvas}></motion.canvas>;
};

export default Canvas;
