import Grid from "@mui/material/Grid";

import { config } from "../../config";
import esIcon from "../assets/ESIcon.png";
import tgIcon from "../assets/TGIcon.png";
import twIcon from "../assets/TWIcon.png";

export default function Footer() {
  return (
    <Grid container justifyContent="center" spacing={2} marginTop={4}>
      <Grid item>
        <a href="https://twitter.com/BakedBeansMiner" target="__blank">
          <img src={'/img/twitter.png'} alt="" width={48} height={48} />
        </a>
      </Grid>
      <Grid item>
        <a href="https://t.me/BakedBeansMiner" target="__blank">
          <img src={'/img/tg.png'} alt="" width={48} height={48} />
        </a>
      </Grid>
      <Grid item>
        <a href={config.scanLink} target="__blank">
          <img src={'/img/linkedin.png'} alt="" width={48} height={48} />
        </a>
      </Grid>
      <Grid item>
        <a href={config.scanLink} target="__blank">
          <img src={'/img/pint.png'} alt="" width={48} height={48} />
        </a>
      </Grid>
      <Grid item>
        <a href={config.scanLink} target="__blank">
          <img src={'/img/instagram.png'} alt="" width={48} height={48} />
        </a>
      </Grid>
    </Grid>
  );
}
