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
  Hidden,
} from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { TranslationKey, InlineLocale } from '~/src/translations/types';
import copy from 'copy-to-clipboard';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Alert from '@material-ui/lab/Alert';

enum CalculatorName {
  Nanosecond,
  Microsecond,
  Millisecond,
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

const title: InlineLocale = {
  zh: '时间单位换算工具',
  en: 'Time Unit Conversion Tool',
};
export const TimeConterter: React.FC = () => {
  const { t, locale } = useTranslation();
  const [ns, setNs] = React.useState<null | BigNumber>(null);
  const [fixedType, setFixedType] = React.useState<
    Partial<{ [key in CalculatorName]: string | null | undefined }>
  >({});

  const textArea = React.useRef<HTMLTextAreaElement>(null);

  const [error, setError] = React.useState<null | string>(null);
  const [success, setSuccess] = React.useState<null | string>(null);

  const checkAndSetNs = (
    name: CalculatorName,
    value: string,
    calc: (input: BigNumber) => BigNumber
  ) => {
    if (value) {
      const dotTimes = (value.match(/\./g) || []).length;
      if (dotTimes > 1) {
        setError(`. appear ${dotTimes} times`);
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

  const copyText = (name: string, text: string) => {
    const result = copy(text);
    if (result) {
      setSuccess(t('copySuccess'));
    } else {
      setError(t('copyFailure'));
    }
  };

  const data: Array<[
    TranslationKey,
    string,
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  ]> = [
    [
      'timeUnitNanosecond',
      fixedType[CalculatorName.Nanosecond] ?? ns?.toString(10) ?? '',
      e => checkAndSetNs(CalculatorName.Nanosecond, e.currentTarget.value, bn => bn),
    ],
    [
      'timeUnitMicrosecond',
      fixedType[CalculatorName.Microsecond] ?? ns?.dividedBy(1000).toString(10) ?? '',
      e =>
        checkAndSetNs(CalculatorName.Microsecond, e.currentTarget.value, bn =>
          bn.multipliedBy(1000)
        ),
    ],
    [
      'timeUnitMillisecond',
      fixedType[CalculatorName.Millisecond] ?? ns?.dividedBy(1000000).toString(10) ?? '',
      e =>
        checkAndSetNs(CalculatorName.Millisecond, e.currentTarget.value, bn =>
          bn.multipliedBy(1000000)
        ),
    ],
    [
      'timeUnitSecond',
      fixedType[CalculatorName.Second] ?? ns?.dividedBy(oneSecond).toString(10) ?? '',
      e =>
        checkAndSetNs(CalculatorName.Second, e.currentTarget.value, bn =>
          bn.multipliedBy(oneSecond)
        ),
    ],
    [
      'timeUnitMinute',
      fixedType[CalculatorName.Minute] ??
        ns
          ?.dividedBy(oneSecond)
          .dividedBy(60)
          .toFixed() ??
        '',
      e =>
        checkAndSetNs(CalculatorName.Minute, e.currentTarget.value, bn =>
          bn.multipliedBy(oneSecond).multipliedBy(60)
        ),
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
        checkAndSetNs(CalculatorName.Hour, e.currentTarget.value, bn =>
          bn.multipliedBy(oneSecond).multipliedBy(60 * 60)
        ),
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
          bn.multipliedBy(oneSecond).multipliedBy(60 * 60 * 24)
        ),
    ],

    [
      'timeUnitWeek',
      fixedType[CalculatorName.Week] ??
        ns
          ?.dividedBy(oneSecond)
          .dividedBy(60 * 60 * 24 * 7)
          .toFixed(0)
          .toString() ??
        '',
      e =>
        checkAndSetNs(CalculatorName.Week, e.currentTarget.value, bn =>
          bn.multipliedBy(oneSecond).multipliedBy(60 * 60 * 24 * 7)
        ),
    ],
    [
      'timeUnitMonth',
      fixedType[CalculatorName.Month] ??
        ns
          ?.dividedBy(oneSecond)
          .dividedBy(60 * 60 * 24 * 365)
          .multipliedBy(12)
          .toFixed(0)
          .toString() ??
        '',
      e =>
        checkAndSetNs(CalculatorName.Month, e.currentTarget.value, bn =>
          bn
            .multipliedBy(oneSecond)
            .multipliedBy(60 * 60 * 24 * 365)
            .dividedBy(12)
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
          bn.multipliedBy(oneSecond).multipliedBy(60 * 60 * 24 * 365)
        ),
    ],
  ];

  return (
    <Box>
      <Snackbar
        open={!!error || !!success}
        autoHideDuration={2000}
        onClose={e => {
          setError(null);
          setSuccess(null);
        }}
      >
        <Alert
          onClose={e => {
            setError(null);
            setSuccess(null);
          }}
          severity={error ? 'error' : success ? 'success' : 'info'}
        >
          {error || success}
        </Alert>
      </Snackbar>
      <Box textAlign="center" justifyContent="center">
        <Typography variant="h3">{title[locale]}</Typography>
        <Box pt={4}>
          <Button
            color="primary"
            variant="contained"
            onClick={e => {
              setNs(null);
              setFixedType({});
            }}
          >
            {t('reset')}
          </Button>
        </Box>
      </Box>
      <Box pt={2} pb={16} justifyContent="center" alignItems="center" textAlign="center">
        <form>
          <Grid container spacing={4} justify="center">
            {data.map((e, i) => {
              const [k, v, h] = e;
              return (
                <Grid key={i} item xs={12} md={6}>
                  <Box px={16}>
                    <TextField label={t(k)} value={v} onChange={h}></TextField>
                    {v && (
                      <Button startIcon={<FileCopyIcon />} onClick={e => copyText(k, v)}>
                        {t('copy')}
                      </Button>
                    )}
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </form>
      </Box>
      <TimeUnitSvg />
    </Box>
  );
};
