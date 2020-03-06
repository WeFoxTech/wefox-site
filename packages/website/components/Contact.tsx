import {
  Box,
  Container,
  Typography,
  Hidden,
  Grid,
  Tooltip,
  Link as MuiLink,
} from '@material-ui/core';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkIcon from '@material-ui/icons/Link';
import MailIcon from '@material-ui/icons/MailOutline';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import OutMailIcon from '@material-ui/icons/DraftsOutlined';
import PhoneIcon from '@material-ui/icons/Phone';
import useTranslation from '../src/hooks/useTranslation';
import { contactInfo } from '../src/config';
import { githubOrg } from '../src/consts';

const Email: React.FC = () => (
  <Tooltip
    title={
      <>
        <AlternateEmailIcon />
        <Typography component="span" className="text-with-icon">
          {contactInfo.email}
        </Typography>
      </>
    }
  >
    <MuiLink href={`mailto:${contactInfo.email}`}>
      <MailIcon />
      <Typography component="span" className="text-with-icon">
        {contactInfo.email}
      </Typography>
    </MuiLink>
  </Tooltip>
);

const GitHub: React.FC = () => (
  <Tooltip
    title={
      <>
        <LinkIcon />
        <Typography component="span" className="text-with-icon">
          {`github.com/${contactInfo.githubOrg}`}
        </Typography>
      </>
    }
  >
    <MuiLink href="https://github.com/WefoxTech" target="_blank">
      <GitHubIcon />
      <Typography component="span" className="text-with-icon">
        {`github.com/${contactInfo.githubOrg}`}
      </Typography>
    </MuiLink>
  </Tooltip>
);

const Tel: React.FC = () => (
  <Tooltip
    title={
      <>
        <PhoneIcon />
        <Typography component="span" className="text-with-icon">
          {contactInfo.tel}
        </Typography>
      </>
    }
  >
    <MuiLink href={`tel:${contactInfo.tel}`}>
      <PhoneIcon />
      <Typography component="span" className="text-with-icon">
        {contactInfo.tel}
      </Typography>
    </MuiLink>
  </Tooltip>
);

const inLineContacts = [<Tel />, <Email />, <GitHub />];
export const Contact: React.FC = () => {
  const { t, locale } = useTranslation();
  return (
    <>
      <Grid container spacing={3} justify="center">
        <Grid item>
          <Box
            border={1}
            borderRadius={20}
            p={1}
            m={1}
            borderColor="primary.main"
            textAlign="center"
          >
            <img width="200" src="//img.wefox.tech/qr/contact_me.jpg" />
            <Hidden only={['md', 'lg', 'xl']} implementation="css">
              <FingerprintIcon fontSize="large" color="primary" />
              <Typography component="span"> {t('phoneQrUsage')}</Typography>
            </Hidden>
            <Hidden only={['xs', 'sm']} implementation="css">
              <Typography>{t('qrUsage')}</Typography>
            </Hidden>
          </Box>
        </Grid>
        <Grid item>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            py={8}
          >
            {inLineContacts.map((e, i) => (
              <Box key={i}>{e}</Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
