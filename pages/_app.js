import React, { useState } from "react";
import "../styles/globals.css";
import Layout from "./components/Layout";
import { AnimateSharedLayout, motion } from "framer-motion";

export default function MyApp({ Component, pageProps, router }) {
  const [search, setsearch] = useState("");
  const [isSearchOpen, setisSearchOpen] = useState(false);
  const changeHandler = (e) => {
    if (e.key === "Enter") {
      setsearch(e.target.value);
      setisSearchOpen(false);
    }
    setsearch(e.target.value);
  };

  return (
    <AnimateSharedLayout>
      <Layout
        router={router}
        search={search}
        isSearchOpen={isSearchOpen}
        setisSearchOpen={setisSearchOpen}
        setsearch={setsearch}
        changeHandler={changeHandler}
      >
        <motion.div
          key={router.route}
          initial="pageInitial"
          animate="pageAnimate"
          variants={{
            pageInitial: {
              opacity: 0,
            },
            pageAnimate: {
              opacity: [1, 0.5, 1],
              transition: 1,
            },
          }}
        >
          <Component {...pageProps} searchValue={search} />
        </motion.div>
      </Layout>
    </AnimateSharedLayout>
  );
}
