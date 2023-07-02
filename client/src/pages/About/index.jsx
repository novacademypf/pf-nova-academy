import Layout from "../../Layout";
import Footer from "../../components/Footer/Footer";

const About = () => {
  return (
    <Layout>
      <h2 className="h-screen flex flex-col">ABOUT</h2>
      <footer
        className="bg-dark-gray text-primary-blue static bottom-0 w-full h-max justify-start"
        style={{ marginLeft: "-500px" }}
      >
        <Footer />
      </footer>
    </Layout>
  );
};

export default About;