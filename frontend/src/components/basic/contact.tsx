import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { useState } from "react";

const Contact = () => {
  //Animation variables
  const [duration] = useState<number>(0.8);
  const [opacityStart] = useState<number>(0);
  const [opacityEnd] = useState<number>(1);
  const [locationStart] = useState<number>(-60);
  const [locationEnd] = useState<number>(0);
  const [modeOnce] = useState<boolean>(true);
  const [modeAmount] = useState<any>("some");
  return (
    <section className="contact">
      <motion.article
        initial={{ opacity: opacityStart, y: locationStart }}
        whileInView={{
          opacity: opacityEnd,
          y: locationEnd,
          transition: { duration: duration },
        }}
        viewport={{ once: modeOnce, amount: modeAmount }}
      >
        <h2>Kontakt na nás</h2>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorum rem
          veniam commodi numquam tenetur. Aliquid mollitia dolorem officia
          maiores culpa odit voluptates earum alias neque ducimus. Mollitia
          blanditiis beatae ut?
        </p>
      </motion.article>
      <article>
        <span>
          <motion.div
            initial={{ opacity: opacityStart, y: locationStart }}
            whileInView={{
              opacity: opacityEnd,
              y: locationEnd,
              transition: { duration: duration, delay: 0.5 },
            }}
            viewport={{ once: modeOnce, amount: modeAmount }}
          >
            <FontAwesomeIcon icon={faEnvelope} />
            <p>email</p>
          </motion.div>
          <motion.div
            initial={{ opacity: opacityStart, y: locationStart }}
            whileInView={{
              opacity: opacityEnd,
              y: locationEnd,
              transition: { duration: duration, delay: 1 },
            }}
            viewport={{ once: modeOnce, amount: modeAmount }}
          >
            <FontAwesomeIcon icon={faPhone} />
            cislo
          </motion.div>
          <motion.div
            initial={{ opacity: opacityStart, y: locationStart }}
            whileInView={{
              opacity: opacityEnd,
              y: locationEnd,
              transition: { duration: duration, delay: 1.5 },
            }}
            viewport={{ once: modeOnce, amount: modeAmount }}
          >
            <FontAwesomeIcon icon={faLocationDot} />
            Hágy 113, 059 04 Reľov
          </motion.div>
        </span>
        <motion.span
          initial={{ opacity: opacityStart, y: locationStart }}
          whileInView={{
            opacity: opacityEnd,
            y: locationEnd,
            transition: { duration: duration, delay: 1 },
          }}
          viewport={{ once: modeOnce, amount: modeAmount }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2513.5358653935546!2d20.371316376384303!3d49.30270697139575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473e1bb1481fdf89%3A0xe04dab28099bcf90!2zSMOhZ3kgMTEzLCAwNTkgMDQgUmXEvm92!5e1!3m2!1sen!2ssk!4v1740513830494!5m2!1sen!2ssk"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </motion.span>
      </article>
    </section>
  );
};

export default Contact;
