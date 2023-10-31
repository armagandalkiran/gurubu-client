import Footer from "./components/common/footer";
import Navbar from "./components/common/navbar";
import Greeting from "./components/page/greeting";
import Howto from "./components/page/howto";
import "./styles/page/style.scss";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Greeting />
      <Howto />
      <Footer />
    </main>
  );
}
