import React from 'react';
import useTranslation from '~/src/hooks/useTranslation';
import TimeUnitSvg from '~/components/svgs/TimeUnit';
import {
  Box,
  TextField,
  Typography,
  TextareaAutosize,
  Divider,
  Button,
  Grid,
  IconButton,
  CircularProgress,
  Snackbar,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import BigNumber from 'bignumber.js';

enum CalculatorName {
  Second,
  Minute,
  Hour,
}

const oneSecond = 1000000000;

export const TimeConterter: React.FC = () => {
  const { t, locale } = useTranslation();

  // const [ns, setNs] = React.useState(new Decimal(oneSecond * 60 * 60 * 24 * 365));
  const [ns, setNs] = React.useState<null | BigNumber>(new BigNumber(oneSecond * 60, 10));
  const [fixedType, setFixedType] = React.useState<
    Partial<{ [key in CalculatorName]: string | null | undefined }>
  >({});

  const [error, setError] = React.useState<null | string>(null);

  const checkAndSetNs = (
    name: CalculatorName,
    value: string,
    calc: (input: BigNumber) => BigNumber
  ) => {
    if (value) {
      const dotTimes = (value.match(/\./g) || []).length;
      if (dotTimes > 1) {
        setError(`. appear ${dotTimes}`);
      } else {
        if (/\.0*$/.test(value) || /^\d*\.$/.test(value)) {
          setFixedType({ [name]: value });
        } else if (/^[\d\.]+$/.test(value)) {
          setNs(calc(new BigNumber(value, 10)));
          setFixedType({ [name]: null });
        } else {
          const charArr = value.split('');
          const lastChar = charArr.pop();
          setError(`${lastChar} is not a number`);
        }
      }
    } else {
      setNs(null);
    }
  };

  return (
    <Box>
      <Typography>{error}</Typography>
      <form>
        <TextField
          label={t('timeUnitSecond')}
          value={fixedType[CalculatorName.Second] ?? ns?.dividedBy(oneSecond).toString(10) ?? ''}
          onChange={e =>
            checkAndSetNs(CalculatorName.Second, e.currentTarget.value, bn =>
              bn.multipliedBy(oneSecond)
            )
          }
        ></TextField>
        <TextField
          label={t('timeUnitMinute')}
          value={
            fixedType[CalculatorName.Minute] ??
            ns
              ?.dividedBy(oneSecond)
              .dividedBy(60)
              .toFixed() ??
            ''
          }
          onChange={e =>
            checkAndSetNs(CalculatorName.Minute, e.currentTarget.value, bn =>
              bn.multipliedBy(oneSecond).multipliedBy(60)
            )
          }
        ></TextField>
        {/* <TextField
          label={t('timeUnitHour')}
          value={ns / oneSecond / (60 * 60)}
          onChange={e => setNs(Number(e.currentTarget.value) * oneSecond * 60 * 60)}
        ></TextField>
        <TextField
          label={t('timeUnitDay')}
          value={ns / oneSecond / (60 * 60 * 24)}
          onChange={e => setNs(Number(e.currentTarget.value) * oneSecond * 60 * 60 * 24)}
        ></TextField>
        <TextField
          label={t('timeUnitWeek')}
          value={ns / oneSecond / (60 * 60 * 24 * 7)}
          onChange={e => setNs(Number(e.currentTarget.value) * oneSecond * 60 * 60 * 24 * 7)}
        ></TextField>
        <TextField
          label={t('timeUnitMonth')}
          value={ns / oneSecond / (60 * 60 * 24 * 30)}
          onChange={e =>
            e.currentTarget.value.length < 11 &&
            setNs(Number(e.currentTarget.value) * oneSecond * 60 * 60 * 24 * 30)
          }
        ></TextField>
        <TextField
          label={t('timeUnitYear')}
          value={ns / oneSecond / (60 * 60 * 24 * 365)}
          onChange={e => {
            if (e.currentTarget.value.length < 10) {
              setNs(Number(e.currentTarget.value) * oneSecond * 60 * 60 * 24 * 365);
            }
          }}
        ></TextField> */}
      </form>

      <TimeUnitSvg />
    </Box>
  );
};
