import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { CabinFeaturesDataLeft } from "../../../static_data/cabin_features_data";
import { CabinFeaturesDataRight } from "../../../static_data/cabin_features_data";
import { motion } from "framer-motion";

interface CabinFeaturesData {
  name: string;
  icon: any;
}
const CabinFeatures = () => {
  const [duration] = useState<number>(1);
  const [opacityStart] = useState<number>(0);
  const [opacityEnd] = useState<number>(1);
  const [locationStart] = useState<number>(100);
  const [locationEnd] = useState<number>(0);
  const [modeOnce] = useState<boolean>(true);
  const [modeAmount] = useState<any>("some");

  const imageIcons = ["Pre rodiny s deťmi", "Čiastočne oplotené"];
  return (
    <section className="cabin-features">
      <article>
        {CabinFeaturesDataLeft.map((features: CabinFeaturesData) => (
          <motion.div
            className="particular-feature"
            initial={{ opacity: opacityStart, x: -locationStart }}
            whileInView={{
              opacity: opacityEnd,
              x: locationEnd,
              transition: { duration: duration },
            }}
            viewport={{ once: modeOnce, amount: modeAmount }}
          >
            {" "}
            {imageIcons.includes(features.name) ? (
              <img src={features.icon} />
            ) : (
              <FontAwesomeIcon icon={features.icon} />
            )}
            <p>{features.name}</p>
          </motion.div>
        ))}
      </article>

      <article>
        {CabinFeaturesDataRight.map(
          (features: CabinFeaturesData, index: number) => (
            <motion.div
              className="particular-feature"
              key={index}
              initial={{ opacity: opacityStart, x: locationStart }}
              whileInView={{
                opacity: opacityEnd,
                x: locationEnd,
                transition: { duration: duration },
              }}
              viewport={{ once: modeOnce, amount: modeAmount }}
            >
              {imageIcons.includes(features.name) ? (
                <img src={features.icon} />
              ) : (
                <FontAwesomeIcon icon={features.icon} />
              )}
              <p>{features.name}</p>
            </motion.div>
          )
        )}
      </article>
    </section>
  );
};

export default CabinFeatures;
