export const slideLeftFade = {
  initial: { x: 30, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: -30, opacity: 0 },
  transition: { duration: 0.5, delay: 0.2 },
};

export const slideDownFade = {
  initial: {
    translateY: -10,
    opacity: 0,
    height: 0,
  },
  animate: {
    translateY: 0,
    opacity: 1,
    height: "auto",
  },
  transition: {
    duration: 0.2,
  },
  exit: {
    translateY: -10,
    opacity: 0,
    height: 0,
  },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 1, delay: 1.2 },
};
