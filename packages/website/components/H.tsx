import { Typography, Box } from '@material-ui/core';

interface Props {
  center?: boolean;
}

export const H1: React.FC<Props> = ({ children, center }) => {
  return (
    <Box clone textAlign={center ? 'center' : null}>
      <Typography variant="h1">{children}</Typography>
    </Box>
  );
};
export const H2: React.FC<Props> = ({ children, center }) => {
  return (
    <Box clone textAlign={center ? 'center' : null}>
      <Typography variant="h2">{children}</Typography>
    </Box>
  );
};
export const H3: React.FC<Props> = ({ children, center }) => {
  return (
    <Box clone textAlign={center ? 'center' : null}>
      <Typography variant="h3">{children}</Typography>
    </Box>
  );
};
export const H4: React.FC<Props> = ({ children, center }) => {
  return (
    <Box clone textAlign={center ? 'center' : null}>
      <Typography variant="h4">{children}</Typography>
    </Box>
  );
};
export const H5: React.FC<Props> = ({ children, center }) => {
  return (
    <Box clone textAlign={center ? 'center' : null}>
      <Typography variant="h5">{children}</Typography>
    </Box>
  );
};
export const H6: React.FC<Props> = ({ children, center }) => {
  return (
    <Box clone textAlign={center ? 'center' : null}>
      <Typography variant="h6">{children}</Typography>
    </Box>
  );
};
