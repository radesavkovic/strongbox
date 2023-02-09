/* eslint-disable react-hooks/exhaustive-deps */
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
// import Divider from "@mui/material/Divider";
import { styled } from "@mui/system";
import { useLocation } from "react-router-dom";
import Web3 from "web3";

import PriceInput from "../../components/PriceInput";
import { useContractContext } from "../../providers/ContractProvider";
import { useAuthContext } from "../../providers/AuthProvider";
import { useEffect, useState } from "react";
import { config } from "../../config";

const CardWrapper = styled(Card)({
  background: "#1B212C",
  marginBottom: 24,
  height: "100%",
});

const ButtonContainer = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    "> div": {
      marginLeft: 0,
      marginRight: 0,
    },
  },
}));

let timeout = null;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function BakeCard() {
  const { contract, wrongNetwork, getBnbBalance, fromWei, toWei, web3 } =
    useContractContext();
  const { address, chainId } = useAuthContext();
  const [contractBNB, setContractBNB] = useState(0);
  const [walletBalance, setWalletBalance] = useState({
    bnb: 0,
    beans: 0,
    rewards: 0,
    rumors: 0,
    referral: 0,
  });
  const [bakeBNB, setBakeBNB] = useState(0);
  const [calculatedBeans, setCalculatedBeans] = useState(0);
  const [loading, setLoading] = useState(false);
  const query = useQuery();

  const fetchContractBNBBalance = () => {
    if (!web3 || wrongNetwork) {
      setContractBNB(0);
      return;
    }
    getBnbBalance(config.contractAddress).then((amount) => {
      setContractBNB(fromWei(amount));
    });
  };

  const fetchWalletBalance = async () => {
    if (!web3 || wrongNetwork || !address) {
      setWalletBalance({
        bnb: 0,
        beans: 0,
        rewards: 0,
        rumors: 0,
        referral: 0,
      });
      return;
    }

    try {
      const [bnbAmount, beansAmount, rewardsAmount, rumorsAmount, referralAmount] = await Promise.all([
        getBnbBalance(address),
        contract.methods
          .getMyMiners(address)
          .call()
          .catch((err) => {
            console.error("myminers", err);
            return 0;
          }),
        contract.methods
          .beanRewards(address)
          .call()
          .catch((err) => {
            console.error("beanrewards", err);
            return 0;
          }),
        contract.methods
          .getMyEggs(address)
          .call()
          .catch((err) => {
            console.error("myrumors", err);
            return 0;
          }),
          contract.methods
          .refferalsAmountData(address)
          .call()
          .catch((err) => {
            console.error("referralreward", err);
            return 0;
          }),
      ]);
      console.log('[BNB Amount] = ', bnbAmount)
      setWalletBalance({
        bnb: fromWei(`${bnbAmount}`),
        beans: beansAmount,
        rewards: fromWei(`${rewardsAmount}`),
        rumors: rumorsAmount,
        referral: referralAmount,
      });
    } catch (err) {
      console.error(err);
      setWalletBalance({
        bnb: 0,
        beans: 0,
        rewards: 0,
        rumors: 0,
        referral: 0,
      });
    }
  };

  useEffect(() => {
    fetchContractBNBBalance();
  }, [web3, chainId]);

  useEffect(() => {
    fetchWalletBalance();
  }, [address, web3, chainId]);

  const onUpdateBakeBNB = (value) => {
    setBakeBNB(value);
  };

  const getRef = () => {
    const ref = Web3.utils.isAddress(query.get("ref"))
      ? query.get("ref")
      : "0x0000000000000000000000000000000000000000";
    return ref;
  };

  const bake = async () => {
    setLoading(true);

    const ref = getRef();

    try {
      await contract.methods.buyEggs(ref).send({
        from: address,
        value: toWei(`${bakeBNB}`),
      });
    } catch (err) {
      console.error(err);
    }
    fetchWalletBalance();
    fetchContractBNBBalance();
    setLoading(false);
  };

  const reBake = async () => {
    setLoading(true);

    const ref = getRef();

    try {
      await contract.methods.hatchEggs(ref).send({
        from: address,
      });
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const eatBeans = async () => {
    setLoading(true);

    try {
      await contract.methods.sellEggs().send({
        from: address,
      });
    } catch (err) {
      console.error(err);
    }
    fetchWalletBalance();
    fetchContractBNBBalance();
    setLoading(false);
  };

  return (
    <CardWrapper>
      {loading && <LinearProgress color="secondary" />}
      <CardContent>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography>Contract</Typography>
          <Typography>{contractBNB} BNB</Typography>
        </Grid>
        <hr/>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography>Wallet</Typography>
          <Typography>{walletBalance.bnb} BNB</Typography>
        </Grid>
        <hr/>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography>Yours RUMORS</Typography>
          <Typography>{walletBalance.rumors} RUMORS</Typography>
        </Grid>
        <hr/>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography>Yours BOXES</Typography>
          <Typography>{walletBalance.beans} BOXES</Typography>
        </Grid>
        <hr/>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography>Current FARMER Price</Typography>
          <Typography>{walletBalance.beans} BNB</Typography>
        </Grid>
        <hr/>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography>Total Referral Reward</Typography>
          <Typography>{walletBalance.beans} RUMORS</Typography>
        </Grid>
        <hr />
        <Box paddingTop={1} paddingBottom={1}>
          <Box>
            <PriceInput
              max={+walletBalance.bnb}
              value={bakeBNB}
              onChange={(value) => onUpdateBakeBNB(value)}
            />
          </Box>
          <Box marginTop={3} marginBottom={3}>
            <Button
              className="btn-contained"
              variant="contained"
              fullWidth
              disabled={wrongNetwork || !address || +bakeBNB === 0 || loading}
              onClick={bake}
            >
              EXECUTION
            </Button>
          </Box>
          <hr />
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography>
              Your BOXES
            </Typography>
            <Typography>
              {walletBalance.beans} BOXES
            </Typography>
          </Grid>
          <hr/>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography>
              Current FARMER Price
            </Typography>
            <Typography>
              {walletBalance.rewards} BNB
            </Typography>
          </Grid>
          <ButtonContainer container>
            <Grid item flexGrow={1} marginRight={1} marginTop={3}>
              <Button
                className="btn-contained"
                variant="outlined"
                color="secondary"
                fullWidth
                disabled={wrongNetwork || !address || loading}
                onClick={reBake}
              >
                RE-PLANT<br/>SEEDS
              </Button>
            </Grid>
            <Grid item flexGrow={1} marginLeft={1} marginTop={3}>
              <Button
                className="btn-main"
                variant="contained"
                color="secondary"
                fullWidth
                disabled={wrongNetwork || !address || loading}
                onClick={eatBeans}
              >
                HARVEST<br/>SEEDS
              </Button>
            </Grid>
          </ButtonContainer>
        </Box>
      </CardContent>
    </CardWrapper>
  );
}
