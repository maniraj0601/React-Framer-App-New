import React from "react";
import Image from "next/image";
import styles from "../../styles/Profile.module.css";
import myData from "../../public/myData.json";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import Rating from "../components/Rating";

export default function Profile(props) {
  const router = useRouter();
  const { name } = router.query;
  const {
    id,
    age,
    picture,
    fees,
    experience,
    background,
    shadow,
    location: { city, state },
    rating: { value, color },
    about: { profession, bio },
  } = props;

  const containerVariant = {
    hidden: {
      x: 0,
    },
    visible: {
      x: 0,
      transition: { delayChildren: 1.2, staggerChildren: 0.2 },
    },
  };

  const listVariant = {
    hidden: {
      opacity: 0,
      x: 60,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1 },
    },
  };

  return (
    <AnimatePresence>
      <div className={styles.container}>
        <motion.div
          layoutId={id}
          className={styles.background}
          style={{ backgroundColor: background }}
          initial={{
            x: 0,
            y: 0,
          }}
        >
          <motion.div
            animate={{
              originX: 0,
              originY: 0,
              opacity: 1,
              scale: 1,
            }}
            transition={{ delay: 0.2, duration: 1 }}
            initial={{
              originX: 0,
              originY: 0,
              opacity: 0,
              scale: 0.1,
            }}
          >
            <Image
              src={picture}
              alt="name"
              className={styles.profileImage}
              width={300}
              height={380}
              unoptimized={true}
            />
          </motion.div>
          <motion.div
            className={styles.imageContainer}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 1.2 }}
            initial={{
              x: "20%",
              opacity: 0,
            }}
          >
            <div className={styles.textContainerProfile}>
              <p
                className={styles.bigTextProfile}
                style={{ textShadow: `0px 3px 6px ${shadow}` }}
              >
                {name}, {age}
              </p>
              <p
                className={styles.smallTextProfile}
                style={{ textShadow: `0px 3px 6px ${shadow}` }}
              >
                {profession}
              </p>
            </div>
            <div className={styles.ratingContainer}>
              <span>
                {Array(5)
                  .fill()
                  .map((_, index) => (
                    <Rating key={index} filled={index < value} color={color} />
                  ))}
              </span>
            </div>
            <div className={styles.priceContainerProfile}>
              <p className={styles.priceAmount}>${fees}</p>
              <p className={styles.priceSubText}>per day</p>
            </div>
          </motion.div>
        </motion.div>
        <div className={styles.wrapper}>
          <motion.div
            className={styles.locationContainer}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            initial={{
              opacity: 0,
            }}
          >
            <p className={styles.greyText}>Location</p>
            <p className={styles.smallText}>
              {city}, {state}
            </p>
          </motion.div>
          <motion.div
            className={styles.experienceContainer}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            initial={{
              opacity: 0,
              x: 0,
            }}
          >
            <p className={styles.greyText}>Experience</p>
            <motion.div
              className={styles.experienceContainerRow}
              variants={containerVariant}
              initial="hidden"
              animate="visible"
            >
              {experience.map((item, index) => (
                <motion.div
                  className={styles.pictureItemWrapper}
                  key={index}
                  variants={listVariant}
                >
                  <Image
                    src={item}
                    alt="name"
                    className={styles.pictureItem}
                    width={140}
                    height={175}
                    unoptimized={true}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          <motion.div
            className={styles.bioContainer}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            initial={{
              opacity: 0,
            }}
          >
            <p className={styles.greyText}>{`About ${name}`}</p>
            <p className={styles.bioSubText}>{bio}</p>
          </motion.div>

          <div className={styles.buttonContainer}>
            <button className={styles.buttonEle}>{`Hire ${name}`}</button>
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
}

export const getServerSideProps = async (context) => {
  const res = await myData.data.filter(
    (ele) => ele.name === context.params.name
  );
  return {
    props: res[0],
  };
};
