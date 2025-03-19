import React from "react";
import AccommodationDetailsData from "../../../static_data/accommodation_details";
// import { motion } from "framer-motion";
// import { useState } from "react";
interface AccommodationDetailsData {
  title: string;
  beds: string;
  bathrooms: string;
  toilets: string;
  image: string;
}
const AccommodationDetails: React.FC = () => {
  // const [duration] = useState<number>(1.5);
  // const [opacityStart] = useState<number>(0);
  // const [opacityEnd] = useState<number>(1);
  // const [locationStart] = useState<number>(50);
  // const [locationEnd] = useState<number>(0);
  // const [modeOnce] = useState<boolean>(true);
  // const [modeAmount] = useState<any>("some");
  return (
    <section className="accommodation-details">
      <article>
        {AccommodationDetailsData.map(
          (data: AccommodationDetailsData, index: number) => (
            <div key={index}>
              <span>
                <h4>{data.title}</h4>
                <ul>
                  <li>{data.beds}</li>
                  <li>{data.bathrooms}</li>
                  <li>{data.toilets}</li>
                </ul>
              </span>
              <div
                className="container-image"
                style={{ backgroundImage: `url(${data.image})` }}
              ></div>
            </div>
          )
        )}
      </article>
    </section>
  );
};

export default AccommodationDetails;
