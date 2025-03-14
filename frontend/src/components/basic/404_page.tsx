import { Link } from "react-router-dom";

const FourOFourPage: React.FC = () => {
  return (
    <section className="four-o-four">
      <h1>Kód 404</h1>
      <h2>Táto časť stránky sa nenašla...</h2>
      <Link to={"/"}>Kliknite tu a vráte sa domov</Link>
    </section>
  );
};

export default FourOFourPage;
