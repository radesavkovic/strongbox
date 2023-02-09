import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";

const BnbInput = styled("input")({
  // fontSize: 24,
  color: "white",
  fontWeight: 500,
  padding: "12px 90px 12px 16px",
  textAlign: "right",
  borderRadius: 3,
  border: "none",
  background: "rgb(34 40 50)",
  width: "100%",
  outline: "none",
  "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
    WebkitAppearance: "none",
    margin: 0,
    MozAppearance: "textfield",
  },
});

export default function PriceInput({ value, max, onChange = () => {} }) {
  return (
    <Box position="relative">
      <BnbInput
        type="number"
        min={0}
        max={max}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <Typography
        // fontSize={24}
        position="absolute"
        top={9}
        right={18}
        fontWeight={500}
        lineHeight= {1.8}
        // color="black"
      >
        BNB
      </Typography>
    </Box>
  );
}
