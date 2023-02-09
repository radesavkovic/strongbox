import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import logo from "../../assets/FullLogo.png";
import logo_open from "../../assets/FullLogo_open.png";
import Connect from "./Connect";
import { useAuthContext } from '../../providers/AuthProvider';

const Wrapper = styled("div")(({ theme }) => ({
  textAlign: "center",
  paddingBottom: 24,
  [theme.breakpoints.down("md")]: {
    h5: {
      fontSize: 20,
      margin: 0,
    },
  },
}));

export default function Header() {
  const { address } = useAuthContext();
  return (
    <Wrapper>
      {address ? (
        <img src={logo_open} alt="" width={"36%"} style={{ marginTop: 10 }} />
      ) : (
        <img src={logo} alt="" width={"36%"} style={{ marginTop: 10 }} />
      )}
      
      <Connect responsive={false} />
      <Typography variant="h6" marginTop={3}>
        The BNB Reward Pool with the most<br/> organic daily returns!
      </Typography>
    </Wrapper>
  );
}
