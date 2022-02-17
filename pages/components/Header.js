import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../styles/Header.module.css";
import { FaArrowLeft,FaSearch } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

const Header = ({handleSearchBar,setsearch}) => {
  const router = useRouter();
  const {
    query: { name },
  } = router;

  const [value, setValue] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    setValue(0);
  }, [name]);

  return (
    <Link href="/" passHref>
      <>
        <AnimatePresence initial={false} custom={value}>
          {name ? (
            <motion.div
              className={styles.header}
              initial="enter"
              animate="center"
              exit="exit"
              onClick={() => {
                setValue(name);
                router.push("/");
                setsearch("")
              }}
            >
              <FaArrowLeft className={styles.arrowIcon} />
              <div className={styles.hamburger}>
                <div className={styles.bar1}></div>
                <div className={styles.bar2}></div>
                <div className={styles.bar3}></div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              className={styles.header}
              onClick={() => window.scrollTo(0, 0)}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <div className={styles.hamburger}>
                <div className={styles.bar1}></div>
                <div className={styles.bar2}></div>
                <div className={styles.bar3}></div>
              </div>
              <span className={styles.logo}>LOGO</span>
              <button  className={styles.searchButton} onClick={handleSearchBar}>
                <FaSearch />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    </Link>
  );
};

export default Header;
