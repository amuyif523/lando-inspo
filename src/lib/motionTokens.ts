export const motionDurations = {
  fast: 0.35,
  base: 0.6,
  slow: 0.9,
};

export const motionEasing = {
  smooth: [0.22, 1, 0.36, 1] as const,
  swift: [0.16, 1, 0.3, 1] as const,
  glide: [0.33, 1, 0.68, 1] as const,
};

export const sectionRevealVariants = {
  hidden: {
    opacity: 0,
    y: 32,
    filter: "blur(6px)",
  },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: motionDurations.base,
      ease: motionEasing.smooth,
      delay,
    },
  }),
};

export const dataCardVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    rotateX: -6,
  },
  visible: (index = 0) => ({
    opacity: 1,
    scale: 1,
    rotateX: 0,
    transition: {
      duration: motionDurations.fast,
      ease: motionEasing.swift,
      delay: index * 0.06,
    },
  }),
};

export const holoTileVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: (index = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: motionDurations.base,
      ease: motionEasing.smooth,
      delay: index * 0.05,
    },
  }),
};

export const holoSheenVariants = {
  rest: {
    opacity: 0,
    x: "-120%",
  },
  hover: {
    opacity: 0.45,
    x: "120%",
    transition: {
      duration: motionDurations.slow,
      ease: motionEasing.glide,
    },
  },
};
