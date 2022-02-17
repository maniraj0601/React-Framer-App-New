import React from "react";
import styles from "../../styles/SearchBar.module.css";
import { FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const SearchBar = ({ inputValue, handleClose, changeHandler }) => {
  const dropIn = {
    hidden: {
      y: "-150px",
      opacity: 0.5,
    },
    visible: {
      opacity: 1,
      y:0,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      y: "-100vh",
      opacity: 0.5,
    },
  };
  return (
    <motion.div
      variants={dropIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={styles.searchContainer}
    >
      <div className={styles.inputContainer}>
        <button className={styles.closeButton} onClick={handleClose}>
          <FaTimes />
        </button>
        <motion.div
          initial="pageInitial"
          animate="pageAnimate"
          exit="pageExit"
          variants={{
            pageInitial: {
              opacity: 0,
            },
            pageAnimate: {
              transition: { delay: 0.1, duration: 0.5 },
              opacity: 1,
            },
            pageExit: {
              opacity: 0,
            },
          }}
          className={styles.searchWrapper}
        >
          <input
            type="text"
            autoFocus
            className={styles.inputSearch}
            placeholder="Search here"
            value={inputValue}
            onChange={changeHandler}
            onKeyPress={changeHandler}
          />
        </motion.div>
        <motion.div
          initial="pageInitial"
          animate="pageAnimate"
          exit="pageExit"
          variants={{
            pageInitial: {
              width: 0,
              borderBottom: 0,
              borderBottom: "2px solid #000",
            },
            pageAnimate: {
              width: "100%",
              transition: { delay: 0.5, duration: 0.6 },
            },
            pageExit: {
              width: 0,
              transition: { duration: 0.6 },
            },
          }}
        ></motion.div>
      </div>
    </motion.div>
  );
};

export default SearchBar;
