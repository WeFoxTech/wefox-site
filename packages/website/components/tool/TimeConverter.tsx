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
import { TranslationKey } from '~/src/translations/types';

enum CalculatorName {
  Second,
  Minute,
  Hour,
  Day,
  Week,
  Month,
  Year,
}

const oneSecond = 1000000000;
const oneYear = new BigNumber(oneSecond * 60 * 60 * 24 * 365, 10);

export const TimeConterter: React.FC = () => {
  const { t, locale } = useTranslation();
  const [ns, setNs] = React.useState<null | BigNumber>(null);
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
          setNs(calc(new BigNumber(value, 10)).multipliedBy(oneSecond));
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

  const data: Array<[
    TranslationKey,
    string,
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  ]> = [
    [
      'timeUnitSecond',
      fixedType[CalculatorName.Second] ?? ns?.dividedBy(oneSecond).toString(10) ?? '',
      e => checkAndSetNs(CalculatorName.Second, e.currentTarget.value, bn => bn),
    ],
    [
      'timeUnitMinute',
      fixedType[CalculatorName.Minute] ??
        ns
          ?.dividedBy(oneSecond)
          .dividedBy(60)
          .toFixed() ??
        '',
      e => checkAndSetNs(CalculatorName.Minute, e.currentTarget.value, bn => bn.multipliedBy(60)),
    ],

    [
      'timeUnitHour',
      fixedType[CalculatorName.Hour] ??
        ns
          ?.dividedBy(oneSecond)
          .dividedBy(60)
          .dividedBy(60)
          .toString() ??
        '',
      e =>
        checkAndSetNs(CalculatorName.Hour, e.currentTarget.value, bn => bn.multipliedBy(60 * 60)),
    ],

    [
      'timeUnitDay',
      fixedType[CalculatorName.Day] ??
        ns
          ?.dividedBy(oneSecond)
          .dividedBy(60 * 60 * 24)
          .toString() ??
        '',
      e =>
        checkAndSetNs(CalculatorName.Day, e.currentTarget.value, bn =>
          bn.multipliedBy(60 * 60 * 24)
        ),
    ],

    [
      'timeUnitWeek',
      fixedType[CalculatorName.Week] ??
        ns
          ?.dividedBy(oneSecond)
          .dividedBy(60 * 60 * 24 * 7)
          .toString() ??
        '',
      e =>
        checkAndSetNs(CalculatorName.Week, e.currentTarget.value, bn =>
          bn.multipliedBy(60 * 60 * 24 * 7)
        ),
    ],
    [
      'timeUnitMonth',
      fixedType[CalculatorName.Month] ??
        ns
          ?.dividedBy(oneSecond)
          .dividedBy(60 * 60 * 24 * 30)
          .toString() ??
        '',
      e =>
        checkAndSetNs(CalculatorName.Month, e.currentTarget.value, bn =>
          bn.multipliedBy(60 * 60 * 24 * 30)
        ),
    ],
    [
      'timeUnitYear',
      fixedType[CalculatorName.Year] ??
        ns
          ?.dividedBy(oneSecond)
          .dividedBy(60 * 60 * 24 * 365)
          .toString() ??
        '',
      e =>
        checkAndSetNs(CalculatorName.Year, e.currentTarget.value, bn =>
          bn.multipliedBy(60 * 60 * 24 * 365)
        ),
    ],
  ];

  return (
    <Box>
      <Typography>{error}</Typography>
      <Box pt={16} pb={8} justifyContent="center" alignItems="center" textAlign="center">
        <form>
          {data.map((e, i) => {
            const [k, v, h] = e;
            return <TextField fullWidth label={t(k)} value={v} onChange={h}></TextField>;
          })}

          <Grid container spacing={4} justify="center" alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                label={t('timeUnitSecond')}
                fullWidth
                value={
                  fixedType[CalculatorName.Second] ?? ns?.dividedBy(oneSecond).toString(10) ?? ''
                }
                onChange={e =>
                  checkAndSetNs(CalculatorName.Second, e.currentTarget.value, bn => bn)
                }
              ></TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label={t('timeUnitMinute')}
                fullWidth
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
                    bn.multipliedBy(60)
                  )
                }
              ></TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label={t('timeUnitHour')}
                value={
                  fixedType[CalculatorName.Hour] ??
                  ns
                    ?.dividedBy(oneSecond)
                    .dividedBy(60)
                    .dividedBy(60) ??
                  ''
                }
                onChange={e =>
                  checkAndSetNs(CalculatorName.Hour, e.currentTarget.value, bn =>
                    bn.multipliedBy(60 * 60)
                  )
                }
              ></TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label={t('timeUnitDay')}
                value={
                  fixedType[CalculatorName.Day] ??
                  ns?.dividedBy(oneSecond).dividedBy(60 * 60 * 24) ??
                  ''
                }
                onChange={e =>
                  checkAndSetNs(CalculatorName.Day, e.currentTarget.value, bn =>
                    bn.multipliedBy(60 * 60 * 24)
                  )
                }
              ></TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label={t('timeUnitWeek')}
                value={
                  fixedType[CalculatorName.Week] ??
                  ns?.dividedBy(oneSecond).dividedBy(60 * 60 * 24 * 7) ??
                  ''
                }
                onChange={e =>
                  checkAndSetNs(CalculatorName.Week, e.currentTarget.value, bn =>
                    bn.multipliedBy(60 * 60 * 24 * 7)
                  )
                }
              ></TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label={t('timeUnitMonth')}
                value={
                  fixedType[CalculatorName.Month] ??
                  ns?.dividedBy(oneSecond).dividedBy(60 * 60 * 24 * 30) ??
                  ''
                }
                onChange={e =>
                  checkAndSetNs(CalculatorName.Month, e.currentTarget.value, bn =>
                    bn.multipliedBy(60 * 60 * 24 * 30)
                  )
                }
              ></TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label={t('timeUnitYear')}
                value={
                  fixedType[CalculatorName.Year] ??
                  ns?.dividedBy(oneSecond).dividedBy(60 * 60 * 24 * 365) ??
                  ''
                }
                onChange={e =>
                  checkAndSetNs(CalculatorName.Year, e.currentTarget.value, bn =>
                    bn.multipliedBy(60 * 60 * 24 * 365)
                  )
                }
              ></TextField>
            </Grid>
          </Grid>
        </form>
      </Box>
      <TimeUnitSvg />
    </Box>
  );
};
