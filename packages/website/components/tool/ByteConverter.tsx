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
  InputAdornment,
  FormControl,
  Input,
} from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { TranslationKey, InlineLocale } from '~/src/translations/types';
import copy from 'copy-to-clipboard';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Alert from '@material-ui/lab/Alert';

const title: InlineLocale = {
  zh: '字节单位换算工具',
  en: 'Byte Unit Conversion Tool',
};

const units = {
  bit: 1,
  Byte: 8,
  KiB: 2 ** 10 * 8,
  MiB: 2 ** 20 * 8,
  GiB: 2 ** 30 * 8,
  TiB: 2 ** 40 * 8,
  PiB: 2 ** 50 * 8,
  EiB: 2 ** 60 * 8,
  ZiB: 2 ** 70 * 8,
  YiB: 2 ** 80 * 8,
};

type Units = typeof units;

type UnitKey = keyof Units;

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

  const copyText = (name: UnitKey, text: string) => {
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
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  ]> = Object.keys(units).map(ele => {
    const key = ele as UnitKey;
    return [
      key,
      fixedType[key] ?? ns?.dividedBy(units[key]).toString(10) ?? '',
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        checkAndSetNs(key, e.currentTarget.value, bn => bn.multipliedBy(units[key])),
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
          <Grid container spacing={1} justify="center">
            {data.map((e, i) => {
              const [k, v, h] = e;
              return (
                <Grid key={i} item xs={12} md={6}>
                  <Box>
                    <FormControl>
                      <InputLabel htmlFor={`byte-unit-${k}`}>{k}</InputLabel>
                      <Input
                        id={`byte-unit-${k}`}
                        value={v}
                        onChange={h}
                        fullWidth
                        type="number"
                        multiline
                        endAdornment={
                          <InputAdornment position="end">
                            {v && (
                              <Button startIcon={<FileCopyIcon />} onClick={e => copyText(k, v)}>
                                {t('copy')}
                              </Button>
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
