import { motion } from "framer-motion";

const pageVariants = {
  initial: {
    opacity: 0,
    y: 15,
    scale: 0.98,
    filter: "blur(4px)",
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
  },
  out: {
    opacity: 0,
    y: -10,
    scale: 0.98,
    filter: "blur(4px)",
  },
};

const pageTransition = {
  type: "spring",
  stiffness: 260,
  damping: 30,
  mass: 0.8,
};

const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;