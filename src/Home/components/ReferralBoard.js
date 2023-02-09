import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { styled } from "@mui/system";

import { useContractContext } from "../../providers/ContractProvider";
import { useAuthContext } from "../../providers/AuthProvider";
import { useEffect, useState } from "react";
import { config } from "../../config";

const CardWrapper = styled(Card)({
  background: "#1B212C",
  marginBottom: 24,
  height: "100%",
});

var referrals = [
  {
    label: "0x135***d2a8",
    value: 17574310727,
  },
  {
    label: "0xc90***4b7b",
    value: 8807155128,
  },
  {
    label: "0x22d***3260",
    value: 8668332479,
  },
  {
    label: "Oxe08***e509",
    value: 8328050887,
  },
  {
    label: "Oxfb9***9406",
    value: 6837564458,
  },
  {
    label: "Oxd8c***d4d6",
    value: 5651782028,
  },
  {
    label: "ox7dc***41de",
    value: 3903432881,
  },
  {
    label: "0x950***2629",
    value: 3394134809,
  },
  {
    label: "0x367***e168",
    value: 2699691847,
  },
  // {
  //   label: "OxdOd***3d66",
  //   value: 2513395719,
  // },
];

export default function ReferralBoard() {
  const { contract, wrongNetwork, web3 } = useContractContext();
  const { address, chainId } = useAuthContext();

  const [referralCount, setReferralCount] = useState(0);

  const fetchReferralData = async () => {
    if (!web3 || wrongNetwork) {
      referrals = [];
      return;
    }

    try {
      const [referralCount] = await Promise.all([
        contract.methods
          .totalRefferalCount()
          .call()
          .catch((err) => {
            console.error("referralcount", err);
            return 0;
          }),
      ]);

      setReferralCount(referralCount);
    } catch (err) {
      console.error(err);
      setReferralCount(0);
    }
  };

  useEffect(() => {
    fetchReferralData();
  }, [address, web3, chainId]);

  useEffect(() => {
    const loadFunc = async () => {
      const minIndex = referralCount - 10 > 0 ? referralCount - 10 : 0;
      for (let index = referralCount; index > minIndex; index--) {
        // async function iii()
        // {
          const [referralObj] = await Promise.all([
            contract.methods
              .referralsData(index)
              .call()
              .catch((err) => {
                console.error("referraldata", err);
                return 0;
              }),
          ]);
        // }
        //  iii();
  
        referrals.push({
          label: referralObj.refAddress,
          value: referralObj.amount,
        })
      }
    }

    loadFunc();
  }, [referralCount]);

  return (
    <CardWrapper>
      <CardContent>
        <Typography gutterBottom variant="h5" textAlign="center">
          Referral Leaderboard
        </Typography>
        <Box paddingTop={3.8} paddingBottom={1}>
          {referrals.map((f) => (
            <>
            <Grid container key={f.label} justifyContent="space-between">
              <Typography gutterBottom>
                {f.label}
              </Typography>
              <Typography gutterBottom>{f.value} SEEDS</Typography>
            </Grid>
            <hr />
            </>
          ))}
        </Box>
      </CardContent>
    </CardWrapper>
  );
}
