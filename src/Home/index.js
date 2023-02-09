import { styled } from "@mui/system";

import Connect from "./components/Connect";
import Header from "./components/Header";
import BakeCard from "./components/BakeCard";
import ReferralBoard from "./components/ReferralBoard";
import NutritionFacts from "./components/NutritionFacts";
import ReferralLink from "./components/ReferralLink";
import { useAuthContext } from "../providers/AuthProvider";
import Footer from "./components/Footer";


const Wrapper = styled("div")(({ theme }) => ({
  maxWidth: 1000,
  margin: "0 auto",
  [theme.breakpoints.down("md")]: {
    maxWidth: "100%",
  },
}));

export default function Home() {
  const { address } = useAuthContext();

  return (
    <Wrapper>
      <Connect />
      <Header />
      <div className="row m-3">
        <div className="col m-4">
        <BakeCard />
        </div>
        <div className="col m-4">
        <ReferralBoard />
        </div>
      </div>
      <div className="row m-3">
        <div className="col m-4">
          <NutritionFacts />
        </div>
        <div className="col m-4">
          <ReferralLink address={address} />
        </div>
      </div>
      <Footer />
    </Wrapper>
  );
}
