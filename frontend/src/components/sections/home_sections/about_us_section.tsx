import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const AboutUsSection: React.FC = () => {
  const text = [
    `  Veľká skupina? Veľký priestor! Pre RODINY s DEŤMI... BAZÉN, futbalové
        IHRISKO, Spoločenská miestnosť, GRIL, stolný tenis, stolný futbal,
        TRAMPOLÍNA, detský kútik, spoločenské hry a množstvo ďalších atrakcií.`,
    ` Chata Lutra Montana sa nachádza v obci Reľov, v Kežmarskom okrese. Táto
        najjužnejšia zamagurská obec patrí zároveň aj medzi najstaršie obce v
        tejto oblasti. Okolie Vás očarí pokojom a krásnou prírodou.`,
    ` Ponúkame svojim hosťom rôzne typy ubytovacích jednotiek s celkovou
        kapacitou až pre 25 hostí. Dobre sa tu budú cítiť páry aj rodiny s
        deťmi. A rovnako je možné usporiadať si u nás rodinnú oslavu či firemnú
        akciu - radi Vám objekt prenajmeme ako celok. Majitelia sa počas dňa v
        objekte nezdržiavajú.`,
  ];
  const [duration] = useState<number>(1.5);
  const [opacityStart] = useState<number>(0);
  const [opacityEnd] = useState<number>(1);
  const [locationStart] = useState<number>(-40);
  const [locationEnd] = useState<number>(0);
  const [modeOnce] = useState<boolean>(true);
  const [modeAmount] = useState<any>("some");

  return (
    <section className="about-us">
      <motion.h2
        initial={{ opacity: opacityStart, y: locationStart }}
        whileInView={{
          opacity: opacityEnd,
          y: locationEnd,
          transition: { duration: duration },
        }}
        viewport={{ once: modeOnce, amount: modeAmount }}
      >
        Vitajte na chate Lutra Montana
      </motion.h2>
      {text.map((paragraf) => (
        <motion.p
          initial={{ opacity: opacityStart, y: locationStart }}
          whileInView={{
            opacity: opacityEnd,
            y: locationEnd,
            transition: { duration: duration },
          }}
          viewport={{ once: modeOnce, amount: modeAmount }}
        >
          {paragraf}
        </motion.p>
      ))}
      <motion.p
        initial={{ opacity: opacityStart, y: locationStart }}
        whileInView={{
          opacity: opacityEnd,
          y: locationEnd,
          transition: { duration: duration },
        }}
        viewport={{ once: modeOnce, amount: modeAmount }}
      >
        O podmienkach ktoré sa týkaju ubytovania zistite viac{" "}
        <Link to={"/podmienkyubytovania"}>na tomto linku</Link>
      </motion.p>
    </section>
  );
};

export default AboutUsSection;
