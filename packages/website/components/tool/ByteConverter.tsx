import React from 'react';
import useTranslation from '~/src/hooks/useTranslation';
import {
  Box,
  TextField,
  Typography,
  Button,
  Grid,
  IconButton,
  Snackbar,
  InputLabel,
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
import { ResetFab } from '../fab/ResetFab';

const title: InlineLocale = {
  zh: '字节单位换算工具',
  en: 'Byte Unit Conversion Tool',
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
  B: {
    v: 8,
    name: 'Byte',
  },
  Ki: {
    v: 2 ** 10 * 8,
    name: 'kibi',
  },
  Mi: {
    v: 2 ** 20 * 8,
    name: 'mebi',
  },
  Gi: {
    v: 2 ** 30 * 8,
    name: 'gibi',
  },
  Ti: {
    v: 2 ** 40 * 8,
    name: 'tebi',
  },
  Pi: {
    v: 2 ** 50 * 8,
    name: 'pebi',
  },
  Ei: {
    v: 2 ** 60 * 8,
    name: 'exbi',
  },
  Zi: {
    v: 2 ** 70 * 8,
    name: 'zebi',
  },
  Yi: {
    v: 2 ** 80 * 8,
    name: 'yobi',
  },
};

const decimals = {
  k: {
    v: 1000,
    name: 'kilo',
  },
  M: {
    v: 1000 ** 2,
    name: 'mega',
  },
  G: {
    v: 1000 ** 3,
    name: 'giga',
  },
  T: {
    v: 1000 ** 4,
    name: 'tera',
  },
  P: {
    v: 1000 ** 5,
    name: 'peta',
  },
  E: {
    v: 1000 ** 6,
    name: 'exa',
  },
  Z: {
    v: 1000 ** 7,
    name: 'zetta',
  },
  Y: {
    v: 1000 ** 8,
    name: 'yotta',
  },
};

type Units = typeof units;

type UnitKey = keyof Units;

type Decimal = typeof decimals;

type DecimalKey = keyof Decimal;

export const ByteConverter: React.FC = () => {
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
        byteValue = new BigNumber(ns.dividedBy(8).toFixed()).dividedBy(v).toString(10);
      } else {
        byteValue = '';
      }
    }

    return [
      key,
      byteValue,
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        checkAndSetNs(key, e.currentTarget.value, bn => bn.multipliedBy(v).multipliedBy(8)),
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
          <Link href="https://en.wikipedia.org/wiki/Byte" target="_blank">
            <HelpIcon />
          </Link>
        </Typography>
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
      <ResetFab
        onClick={() => {
          setNs(null);
          setFixedType({});
        }}
      />
    </Box>
  );
};
