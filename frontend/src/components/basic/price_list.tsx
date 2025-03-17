import React from "react";
import { PriceListData } from "../../static_data/price_list_data";
import { motion } from "framer-motion";
import { useState } from "react";
import Footer from "../footer/footer";

const PriceList: React.FC = () => {
  //Animation variables
  const [duration] = useState<number>(0.7);
  const [opacityStart] = useState<number>(0);
  const [opacityEnd] = useState<number>(1);
  const [locationStart] = useState<number>(50);
  const [locationEnd] = useState<number>(0);
  const [modeOnce] = useState<boolean>(true);
  const [modeAmount] = useState<any>(0.2);
  return (
    <>
      <section className="price-list">
        {PriceListData &&
          PriceListData.slice(0, 2).map((data, index) => (
            <article key={index}>
              <h2>{data.season}</h2>
              {data.seasonDates && <p>({data.seasonDates})</p>}
              <div className="list-of-prices">
                {data.prices &&
                  data.prices.map((price, indexPrice) => (
                    <motion.div
                      className="prticular-price"
                      key={indexPrice}
                      initial={{ opacity: opacityStart, y: locationStart }}
                      whileInView={{
                        opacity: opacityEnd,
                        y: locationEnd,
                        transition: {
                          duration: duration,
                          delay: indexPrice * 0.4,
                        },
                      }}
                      viewport={{ once: modeOnce, amount: modeAmount }}
                    >
                      <ul>
                        <li>{price.lineOne}</li>
                        <li>{price.lineTwo}</li>
                        <li>{price.lineThree}</li>
                        {price.lineFour && <li>({price.lineFour})</li>}
                      </ul>
                      <span>
                        <p>{price.time}</p>
                        <h3>{price.price}</h3>
                      </span>
                    </motion.div>
                  ))}
              </div>
            </article>
          ))}
        <article>
          {PriceListData &&
            PriceListData.slice(2, 4).map((data) => (
              <div className="sperate-container-prices">
                <h2>{data.season}</h2>
                {data.seasonDates && <p>({data.seasonDates})</p>}
                <div className="list-of-prices">
                  {data.prices &&
                    data.prices.map((price, indexPrice) => (
                      <motion.div
                        className="prticular-price"
                        key={indexPrice}
                        initial={{ opacity: opacityStart, y: locationStart }}
                        whileInView={{
                          opacity: opacityEnd,
                          y: locationEnd,
                          transition: {
                            duration: duration,
                            delay: indexPrice * 0.4,
                          },
                        }}
                        viewport={{ once: modeOnce, amount: modeAmount }}
                      >
                        <ul>
                          <li>{price.lineOne}</li>
                          <li>{price.lineTwo}</li>
                          <li>{price.lineThree}</li>
                          {price.lineFour && <li>({price.lineFour})</li>}
                        </ul>
                        <span>
                          <p>{price.time}</p>
                          <h3>{price.price}</h3>
                        </span>
                      </motion.div>
                    ))}
                </div>
              </div>
            ))}
        </article>
      </section>
      <Footer />
    </>
  );
};

export default PriceList;
