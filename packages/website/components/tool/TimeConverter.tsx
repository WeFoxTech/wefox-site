import React from 'react';
import useTranslation from '~/src/hooks/useTranslation';
import { Box } from '@material-ui/core';
import TimeUnitSvg from '~/components/svgs/TimeUnit';

export const TimeConterter: React.FC = () => {
  const { t, locale } = useTranslation();

  return (
    <Box>
      <TimeUnitSvg />
    </Box>
  );
};
