import Image from "next/image";
import Header from "./components/page-elements/header/header";
import Footer from "./components/page-elements/footer/footer";
import Loader from "./components/shared/loader";
import Body from "./components/page-elements/body/body-wrapper";

export default function Home() {
  return (
    <>
      <Header></Header>
      <Body/>
      <Footer></Footer>
    </>
  );
}
