import React from 'react';
import useTranslation from '~/src/hooks/useTranslation';
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
  InputAdornment,
  FormControl,
  Input,
  Tooltip,
} from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { TranslationKey, InlineLocale } from '~/src/translations/types';
import copy from 'copy-to-clipboard';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Alert from '@material-ui/lab/Alert';
import Link from '~/src/Link';
import HelpIcon from '@material-ui/icons/Help';

const title: InlineLocale = {
  zh: '比特单位换算工具',
  en: 'Bit Unit Conversion Tool',
};

interface DataItem {
  v: number;
  name: string;
}

const units = {
  b: {
    v: 1,
    name: 'bit',
  },
  Kibit: {
    v: 2 ** 10,
    name: 'kibi',
  },
  Mibit: {
    v: 2 ** 20,
    name: 'mebi',
  },
  Gibit: {
    v: 2 ** 30,
    name: 'gibi',
  },
  Tibit: {
    v: 2 ** 40,
    name: 'tebi',
  },
  Pibit: {
    v: 2 ** 50,
    name: 'pebi',
  },
  Eibit: {
    v: 2 ** 60,
    name: 'exbi',
  },
  Zibit: {
    v: 2 ** 70,
    name: 'zebi',
  },
  Yibit: {
    v: 2 ** 80,
    name: 'yobi',
  },
};

const decimals = {
  kbit: {
    v: 1000,
    name: 'kilobit',
  },
  Mbit: {
    v: 1000 ** 2,
    name: 'megabit',
  },
  Gbit: {
    v: 1000 ** 3,
    name: 'gigabit',
  },
  Tbit: {
    v: 1000 ** 4,
    name: 'terabit',
  },
  Pbit: {
    v: 1000 ** 5,
    name: 'petabit',
  },
  Ebit: {
    v: 1000 ** 6,
    name: 'exabit',
  },
  Zbit: {
    v: 1000 ** 7,
    name: 'zettabit',
  },
  Ybit: {
    v: 1000 ** 8,
    name: 'yottabit',
  },
};

type Units = typeof units;

type UnitKey = keyof Units;

type Decimal = typeof decimals;

type DecimalKey = keyof Decimal;

export const BitConverter: React.FC = () => {
  const { t, locale } = useTranslation();
  const [ns, setNs] = React.useState<null | BigNumber>(null);
  const [fixedType, setFixedType] = React.useState<
    Partial<{ [key: string]: string | null | undefined }>
  >({});

  const textArea = React.useRef<HTMLTextAreaElement>(null);

  const [error, setError] = React.useState<null | string>(null);
  const [success, setSuccess] = React.useState<null | string>(null);

  const checkAndSetNs = (name: string, value: string, calc: (input: BigNumber) => BigNumber) => {
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

  const copyText = (name: UnitKey | DecimalKey, text: string) => {
    const result = copy(text);
    if (result) {
      setSuccess(t('copySuccess'));
    } else {
      setError(t('copyFailure'));
    }
  };

  const data: Array<[
    UnitKey,
    string,
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    DataItem
  ]> = Object.keys(units).map(ele => {
    const key = ele as UnitKey;
    const item = units[key];
    const { v, name } = item;
    return [
      key,
      fixedType[key] ?? (key === 'b' ? ns?.toFixed(0) ?? '' : ns?.dividedBy(v).toString(10) ?? ''),
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        checkAndSetNs(key, e.currentTarget.value, bn => bn.multipliedBy(v)),
      item,
    ];
  });

  const decimalData: Array<[
    DecimalKey,
    string,
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    DataItem
  ]> = Object.keys(decimals).map(ele => {
    const key = ele as DecimalKey;
    const item = decimals[key];
    const { v, name } = item;
    let byteValue = fixedType[key];
    if (!byteValue) {
      if (ns) {
        byteValue = new BigNumber(ns.toFixed()).dividedBy(v).toString(10);
      } else {
        byteValue = '';
      }
    }

    return [
      key,
      byteValue,
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        checkAndSetNs(key, e.currentTarget.value, bn => bn.multipliedBy(v)),
      item,
    ];
  });

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
        <Typography variant="h3">
          {title[locale]}
          <Link href="https://en.wikipedia.org/wiki/Bit" target="_blank">
            <HelpIcon />
          </Link>
        </Typography>

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
          <Grid container spacing={1} justify="center">
            {data.map((e, i) => {
              const [k, v, h, item] = e;
              return (
                <Grid key={i} item xs={12} md={6}>
                  <Box>
                    <FormControl>
                      <InputLabel htmlFor={`binary-unit-${k}`}>{item.name}</InputLabel>
                      <Input
                        id={`binary-unit-${k}`}
                        value={v}
                        onChange={h}
                        fullWidth
                        type="number"
                        multiline
                        endAdornment={
                          <InputAdornment position="end">
                            <Typography>{k}</Typography>
                            {v && (
                              <Tooltip title={t('copy')}>
                                <IconButton onClick={e => copyText(k, v)}>
                                  <FileCopyIcon />
                                </IconButton>
                              </Tooltip>
                            )}
                          </InputAdornment>
                        }
                      ></Input>
                    </FormControl>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
          <Box py={4}></Box>
          <Grid container spacing={1} justify="center">
            {decimalData.map((e, i) => {
              const [k, v, h, item] = e;
              return (
                <Grid key={i} item xs={12} md={6}>
                  <Box>
                    <FormControl>
                      <InputLabel htmlFor={`decimal-unit-${k}`}>{item.name}</InputLabel>
                      <Input
                        id={`decimal-unit-${k}`}
                        value={v}
                        onChange={h}
                        fullWidth
                        type="number"
                        multiline
                        endAdornment={
                          <InputAdornment position="end">
                            <Typography>{k}</Typography>
                            {v && (
                              <Tooltip title={t('copy')}>
                                <IconButton onClick={e => copyText(k, v)}>
                                  <FileCopyIcon />
                                </IconButton>
                              </Tooltip>
                            )}
                          </InputAdornment>
                        }
                      ></Input>
                    </FormControl>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </form>
      </Box>
    </Box>
  );
};
