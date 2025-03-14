import React from "react";
import { ActivitiesNearbyData } from "../../static_data/activities_nearby";
import { SkyingSlopesNearbyData } from "../../static_data/activities_nearby";
import { motion } from "framer-motion";
import { useState } from "react";
import Footer from "../footer/footer";
interface ActivitiesNearbyDataSchema {
  title: string;
  location: string;
  text: string;
  link: string;
  image: string;
}
const ActivitiesNearby: React.FC = () => {
  //Animations
  const [duration] = useState<number>(1.5);
  const [opacityStart] = useState<number>(0);
  const [opacityEnd] = useState<number>(1);
  const [locationStart] = useState<number>(100);
  const [locationEnd] = useState<number>(0);
  const [modeOnce] = useState<boolean>(true);
  const [modeAmount] = useState<any>("all");
  return (
    <>
      <section className="activities-nearby">
        <h1>Čo môžete nájsť v okolí chaty</h1>
        <article>
          {ActivitiesNearbyData.map(
            (activity: ActivitiesNearbyDataSchema, index: number) => (
              <div className="particular-activity" key={index}>
                <motion.span
                  initial={{ opacity: opacityStart, x: -locationStart }}
                  whileInView={{
                    opacity: opacityEnd,
                    x: locationEnd,
                    transition: { duration: duration },
                  }}
                  viewport={{ once: modeOnce, amount: modeAmount }}
                >
                  <h2>{activity.title}</h2>
                  <p>
                    <i>{activity.location}</i>
                  </p>
                  <p>{activity.text}</p>
                  <a href={`${activity.link}`} target={"_blank"}>
                    {activity.link}
                  </a>
                </motion.span>
                <motion.article
                  className="image-container"
                  style={{ backgroundImage: `url(${activity.image})` }}
                  initial={{ opacity: opacityStart, x: locationStart }}
                  whileInView={{
                    opacity: opacityEnd,
                    x: locationEnd,
                    transition: { duration: duration },
                  }}
                  viewport={{ once: modeOnce, amount: modeAmount }}
                ></motion.article>
              </div>
            )
          )}
        </article>
      </section>
      <section className="activities-nearby">
        <h1>Lyžiarské stredíska v okolí</h1>
        <article>
          {SkyingSlopesNearbyData.map((activity, index: number) => (
            <div className="particular-activity" key={index}>
              <motion.span
                initial={{ opacity: opacityStart, x: -locationStart }}
                whileInView={{
                  opacity: opacityEnd,
                  x: locationEnd,
                  transition: { duration: duration },
                }}
                viewport={{ once: modeOnce, amount: modeAmount }}
              >
                <h2>{activity.title}</h2>
                <p>
                  <i>{activity.location}</i>
                </p>
                <p>{activity.text}</p>
                <a href={`${activity.link}`} target={"_blank"}>
                  {activity.link}
                </a>
              </motion.span>
              <motion.article
                className="image-container"
                style={{ backgroundImage: `url(${activity.image})` }}
                initial={{ opacity: opacityStart, x: locationStart }}
                whileInView={{
                  opacity: opacityEnd,
                  x: locationEnd,
                  transition: { duration: duration },
                }}
                viewport={{ once: modeOnce, amount: modeAmount }}
              ></motion.article>
            </div>
          ))}
        </article>
      </section>
      <Footer />
    </>
  );
};

export default ActivitiesNearby;
