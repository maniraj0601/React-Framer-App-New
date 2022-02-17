import React, { useEffect } from "react";
import Header from "./Header";
import SearchBar from "./SearchBar";
import { AnimatePresence, motion } from "framer-motion";
import styles from "../../styles/Header.module.css";

function Layout({
  children,
  router,
  search,
  isSearchOpen,
  setisSearchOpen,
  setsearch,
  changeHandler,
}) {
  const handleSearchBar = () => {
    setisSearchOpen(true);
  };

  const handleClose = () => {
    setisSearchOpen(false);
    setsearch("");
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    setisSearchOpen(false);
  }, [router.route]);

  return (
    <motion.div className="layout">
      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {isSearchOpen ? (
          <SearchBar
            handleSearchBar={handleSearchBar}
            inputValue={search}
            changeHandler={changeHandler}
            handleClose={handleClose}
            setsearch
          />
        ) : (
          <Header handleSearchBar={handleSearchBar} setsearch={setsearch} />
        )}
      </AnimatePresence>
      {children}
    </motion.div>
  );
}

export default Layout;
