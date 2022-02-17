import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import myData from "../public/myData.json";
import { motion } from "framer-motion";
import Rating from "./components/Rating";

export default function Home(props) {
  const { data, searchValue } = props;
  const [array, setarray] = useState(data);

  useEffect(() => {
    const res = data.filter((ele) => {
      return ele.name.toLowerCase().search(searchValue.toLowerCase()) != -1;
    });
    setarray(res);
  }, [searchValue]);

  const containerVariant = {
    hidden: {
      y: "100px",
    },
    visible: {
      y: 0,
      transition: { delayChildren: 0.2, staggerChildren: 0.2 },
    },
  };

  const listVariant = {
    hidden: {
      opacity: 0,
      y: 10,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.listContainer}
        variants={containerVariant}
        initial="hidden"
        animate="visible"
      >
        {array?.map((listItem, index) => {
          const {
            id,
            name,
            age,
            picture,
            fees,
            background,
            location: { city, state },
            rating: { value, color },
            about: { profession },
          } = listItem;
          return (
            <motion.div
              className={styles.listRow}
              custom={index}
              key={id}
              variants={listVariant}
              // animate="visible"
              whileHover={{ scale: 1.05 }}
            >
              <Link href="profile/[name]" as={`/profile/${name}`} passHref>
                <motion.div
                  layoutId={id}
                  className={styles.listItem}
                  style={{ backgroundColor: background }}
                >
                  <Image
                    src={picture}
                    alt={name}
                    className={styles.profileImage}
                    width={60}
                    height={85}
                    unoptimized={true}
                  />
                  <div className={styles.textContainer}>
                    <p className={styles.bigText}>
                      {name}, {age}
                    </p>
                    <p className={styles.smallText}>
                      {city}, {state}
                    </p>
                    <span className={styles.smallText}>{profession}</span>
                    <div className={styles.ratingContainer}>
                      <span>
                        {Array(5)
                          .fill()
                          .map((_, index) => (
                            <Rating
                              key={index}
                              filled={index < value}
                              color={color}
                            />
                          ))}
                      </span>
                    </div>
                  </div>
                  <div className={styles.priceContainer}>
                    <p className={styles.priceAmount}>${fees}</p>
                    <p className={styles.priceSubText}>per day</p>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

export const getStaticProps = async () => {
  const { data } = myData;
  return {
    props: {
      data,
    },
  };
};
