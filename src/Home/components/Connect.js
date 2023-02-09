import Button from "@mui/material/Button";
import { styled } from "@mui/system";

import { useAuthContext } from "../../providers/AuthProvider";

const ConnectButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(180deg, #323D4E 0%, #1E2531 100%)",
  boxShadow: "inset 6px 14px 14px rgba(0, 0, 0, 0.25)",
  borderRadius: "4px",
  border: "solid 3px black",
  // color: "linear-gradient(180deg, #F123FF 0%, #DF2122 100%)",
  // backgroundClip: "text",
  // textFillColor: "transparent",
  // textShadow: "0px 4px 4px rgba(0, 0, 0, 0.6)",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const FAQButton = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const SmallScreenConnectButton = styled(Button)(({ theme }) => ({
  display: "none",
  marginTop: 10,
  marginBottom: 48,
  width: "95%",
  marginLeft: "auto",
  marginRight: "auto",
  [theme.breakpoints.down("md")]: {
    display: "block",
  },
}));

export default function Connect({ responsive = true }) {
  const { address, loading, connect, disconnect } = useAuthContext();

  // return (
  //   <>
  //     <ConnectButton
  //       className={address ? "btn-connect" : "btn-disconnect"}
  //       color="secondary"
  //       variant="contained"
  //       disabled={loading}
  //       onClick={() => (address ? disconnect() : connect())}
  //     >
  //       {address ? "Connected" : "Connect"}
  //     </ConnectButton>

  //     <FAQButton
  //       color="secondary"
  //       variant="contained"
  //       disabled={false}
  //       onClick={""}
  //     >
  //       FAQ
  //     </FAQButton>
  //   </>
  // );

  return responsive ? (
    <div className="d-flex gap-3 items-center justify-content-end">
      <ConnectButton
        className={address ? "btn-connect" : "btn-disconnect"}
        color="secondary"
        variant="contained"
        disabled={loading}
        onClick={() => (address ? disconnect() : connect())}
      >
        {address ? "Connected" : "Connect"}
      </ConnectButton>

      <FAQButton
        className="btn-contained"
        color="secondary"
        variant="contained"
        disabled={false}
        onClick={""}
      >
        FAQ
      </FAQButton>
    </div>
  ) : (
    <SmallScreenConnectButton
      className={address ? "btn-connect" : "btn-disconnect"}
      color="secondary"
      variant="contained"
      disabled={loading}
      onClick={() => (address ? disconnect() : connect())}
    >
      {address ? "Connected" : "Connect"}
    </SmallScreenConnectButton>
  );
}
