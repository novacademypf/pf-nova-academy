import Carrousel from "../../components/Carrousel";
import Banner from "../../components/Banner/Banner";
import Layout from "../../Layout/";
import SearchBar from "../../components/SearchBar/SearchBar";
import Footer from "../../components/Footer/Footer";

const Landing = () => {
  return (
    <>
      <Layout>
        <Banner />
        <SearchBar />
        <Carrousel />
      </Layout>
      <Footer />
    </>


  );
};

export default Landing;
