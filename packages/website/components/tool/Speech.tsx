import React from 'react';
import PlayForWorkIcon from '@material-ui/icons/PlayForWork';
import VoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import Alert, { AlertProps } from '@material-ui/lab/Alert';
import RefreshIcon from '@material-ui/icons/Refresh';

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
import { Voice, voiceList } from './voicelist';
import useTranslation from '../../src/hooks/useTranslation';
import { InlineLocale } from '~/src/translations/types';

const cfgKey = 'speech_cfg';

interface State {
  key?: string;
  voiceList: Voice[];
  lastTokenTs?: number;
  regin?: string;
  // text?: string;
  token?: string;
  loadingList?: boolean;
  ts?: number;
  errorMsg?: string;
}

const initialState: State = {
  regin: 'eastasia',
  voiceList: voiceList,
};

interface Action {
  type: 'reset' | 'fix';
  newState?: Partial<State>;
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'reset':
      return initialState;

    case 'fix':
      return Object.assign({}, state, action.newState);
    default:
      throw new Error();
  }
}

export const Speech: React.FC = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const { t, locale } = useTranslation();
  const initText: InlineLocale = {
    zh: '你好，欢迎光临，这里是微狐科技，需要帮助可以联系我们。',
    en: 'Hello and welcome, this is WeFox Technology, you can contact us if you need help.',
  };
  const title: InlineLocale = {
    zh: '文字转语音工具',
    en: 'Text-to-speech tool',
  };
  const [text, setText] = React.useState(initText[locale]);
  const [gender, setGender] = React.useState('');
  const [voiceType, setVoiceType] = React.useState('');
  const [language, setLanguage] = React.useState('');

  const fetchToken = async () => {
    if (!state.regin || !state.key) {
      console.log(`regin: ${state.regin}  key: ${state.key}`);
      throw new Error('key or regin not set correctly!');
    }

    const rsp = await fetch(
      `https://${state.regin}.api.cognitive.microsoft.com/sts/v1.0/issuetoken`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Ocp-Apim-Subscription-Key': state.key as string,
        },
      }
    );
    if (rsp.status < 300) {
      const token = await rsp.text();
      dispatch({ type: 'fix', newState: { token, lastTokenTs: Date.now() } });
      return token;
    } else {
      const error = `error fetch token : ${rsp.statusText}`;
      console.error(error);
      throw new Error(error);
    }
  };

  const checkToken = async () => {
    if (!state.lastTokenTs) {
      return await fetchToken();
    }

    if (state.lastTokenTs && Date.now() - state.lastTokenTs > 8 * 60 * 1000) {
      return await fetchToken();
    }
  };

  const fetchVoiceList = async () => {
    const token = await checkToken();
    const url = `https://${state.regin}.tts.speech.microsoft.com/cognitiveservices/voices/list`;
    const rsp = await fetch(url, { headers: { Authorization: `Bearer ${token ?? state.token}` } });
    const body = await rsp.json();
    if (Array.isArray(body)) {
      dispatch({ type: 'fix', newState: { voiceList: body as Voice[] } });
    }
  };

  React.useEffect(() => {
    console.log(`save`);
    save();
  }, [state.lastTokenTs, state.token]);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const cfg = window.localStorage.getItem(cfgKey);
      if (cfg) {
        const parsed = JSON.parse(cfg);
        if (parsed) {
          dispatch({
            type: 'fix',
            newState: {
              key: parsed.key,
              regin: parsed.regin,
              token: parsed.token,
              lastTokenTs: parsed.lastTokenTs,
            },
          });
        }
      }
    }
  }, []);

  const save = () => {
    if (typeof window !== 'undefined' && state.key && state.regin) {
      window.localStorage.setItem(
        cfgKey,
        JSON.stringify({
          key: state.key,
          regin: state.regin,
          token: state.token,
          lastTokenTs: state.lastTokenTs,
        })
      );
    }
  };

  const loadVoicelist = async () => {
    dispatch({ type: 'fix', newState: { loadingList: true, voiceList: undefined } });
    await fetchVoiceList();
    dispatch({ type: 'fix', newState: { loadingList: false } });
  };

  const onAlertClose = () => {
    dispatch({ type: 'fix', newState: { errorMsg: undefined } });
  };

  const play = async (voice: Voice) => {
    voice.loading = true;
    dispatch({ type: 'fix', newState: { voiceList: state.voiceList } });
    let token;
    try {
      token = await checkToken();
    } catch (err) {
      voice.loading = false;
      dispatch({ type: 'fix', newState: { errorMsg: err.message, voiceList: state.voiceList } });
      return;
    }
    const _url = `https://${state.regin}.tts.speech.microsoft.com/cognitiveservices/v1`;
    const body = `
    <speak version='1.0' xml:lang='${voice.Locale}'><voice xml:lang='${voice.Locale}' xml:gender='${voice.Gender}'
        name='${voice.ShortName}'>
    ${text}
    </voice></speak>`;

    const headers = {
      Authorization: `Bearer ${token ?? state.token}`,
      'Content-Type': 'application/ssml+xml',
      'X-Microsoft-OutputFormat': 'audio-24khz-160kbitrate-mono-mp3',
    };

    const rsp = await fetch(_url, { method: 'POST', headers, body });

    if (rsp.status > 300) {
      console.error(`download voice failed!`);
      console.log(rsp.status);
      console.log(rsp.statusText);
      console.log(rsp);
      throw new Error('download voice failed');
    }

    const blob = await rsp.blob();
    const url = window.URL.createObjectURL(blob);
    voice.blobUrl = url;
    voice.loading = false;
    dispatch({ type: 'fix', newState: { voiceList: state.voiceList } });
  };

  const changeText = (newText: string) => {
    // dispatch({ type: 'fix', newState: { text: newText } });
    setText(newText);
  };

  const textBlur = () => {
    console.log(`blur`);
    const voiceList = state.voiceList?.map(e => {
      return { ...e, blobUrl: undefined, loading: false };
    });
    dispatch({ type: 'fix', newState: { voiceList, ts: Date.now() } });
  };

  return (
    <Box pb={8} component="form">
      <Typography variant="h2">{title[locale]}</Typography>
      <Snackbar open={!!state.errorMsg} autoHideDuration={6000} onClose={onAlertClose}>
        <Alert onClose={onAlertClose} severity="error">
          {state.errorMsg}
        </Alert>
      </Snackbar>

      <TextField
        title="set key"
        required
        type="password"
        fullWidth
        label="your azure speech service key"
        value={state.key}
        onBlur={save}
        onChange={e => dispatch({ type: 'fix', newState: { key: e.target.value } })}
      ></TextField>

      <TextField
        fullWidth
        label="your azure speech service regin"
        value={state.regin}
        onBlur={save}
        onChange={e => dispatch({ type: 'fix', newState: { regin: e.target.value } })}
      ></TextField>

      <Divider />

      <Box py={4} display="flex" alignItems="center" justifyContent="center" flexDirection="column">
        <Box
          clone
          minWidth={{
            xs: '95vw',
            sm: '90vw',
            lg: '50vw',
          }}
          mb={4}
        >
          <TextareaAutosize
            aria-label="text to speech"
            value={text}
            rowsMin={8}
            onChange={e => changeText(e.target.value)}
            onBlur={textBlur}
          ></TextareaAutosize>
        </Box>
        <Grid container spacing={3} justify="center">
          <Grid item>
            <InputLabel id="filter-gender-label">Gender</InputLabel>
            <Select
              labelId="filter-gender-label"
              id="filter-gender-select"
              value={gender}
              onChange={e => setGender(e.target.value as string)}
            >
              <MenuItem value={''}>None</MenuItem>
              <MenuItem value={'Female'}>Female</MenuItem>
              <MenuItem value={'Male'}>Male</MenuItem>
            </Select>
          </Grid>

          <Grid item>
            <InputLabel id="filter-language-label">Language</InputLabel>
            <Select
              labelId="filter-language-label"
              id="filter-language-select"
              value={language}
              onChange={e => setLanguage(e.target.value as string)}
            >
              <MenuItem value={''}>None</MenuItem>
              <MenuItem value={'en'}>en</MenuItem>
              <MenuItem value={'zh'}>zh</MenuItem>
            </Select>
          </Grid>

          <Grid item>
            <InputLabel id="filter-voicetype-label">VoiceType</InputLabel>

            <Select
              labelId="filter-voicetype-label"
              id="filter-voicetype-select"
              value={voiceType}
              onChange={e => setVoiceType(e.target.value as string)}
            >
              <MenuItem value={''}>None</MenuItem>
              <MenuItem value={'Standard'}>Standard</MenuItem>
              <MenuItem value={'Neural'}>Neural</MenuItem>
            </Select>
          </Grid>
          <Grid item>
            {state.loadingList ? (
              <CircularProgress size={48} />
            ) : (
              <Button
                color="primary"
                variant="contained"
                onClick={loadVoicelist}
                startIcon={<RefreshIcon />}
              >
                reload voice list
              </Button>
            )}
          </Grid>
        </Grid>
      </Box>

      <Divider />

      <Grid container spacing={4}>
        {state.voiceList
          ?.filter(e => {
            if (gender || language || voiceType) {
              if (gender && language && voiceType) {
                return (
                  e.Gender === gender && e.Locale.startsWith(language) && e.VoiceType === voiceType
                );
              }
              if (gender && language) {
                return e.Gender === gender && e.Locale.startsWith(language);
              }
              if (gender && voiceType) {
                return e.Gender === gender && e.VoiceType === voiceType;
              }
              if (language && voiceType) {
                return e.Locale.startsWith(language) && e.VoiceType === voiceType;
              }
              if (gender) return e.Gender === gender;
              if (language) return e.Locale.startsWith(language);
              if (voiceType) return e.VoiceType === voiceType;
            } else {
              return true;
            }
          })
          .map((e, i) => {
            const key = `${i}-${e.blobUrl}-${e.loading}`;
            return (
              <Grid key={key} item>
                {e.loading ? (
                  <CircularProgress />
                ) : e.blobUrl ? (
                  <audio controls key={key}>
                    <source src={e.blobUrl} type="audio/mp3" />
                  </audio>
                ) : (
                  <IconButton onClick={ev => play(e)}>
                    <PlayForWorkIcon />
                  </IconButton>
                )}
                <TextField
                  value={e.Name}
                  label="Name"
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  value={e.ShortName}
                  label="ShortName"
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  value={e.Gender}
                  label="Gender"
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  value={e.Locale}
                  label="Locale"
                  InputProps={{
                    readOnly: true,
                  }}
                />
                {/* <TextField
                value={e.SampleRateHertz}
                label="SampleRateHertz"
                InputProps={{
                  readOnly: true,
                }}
              /> */}
                <TextField
                  value={e.VoiceType}
                  label="VoiceType"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            );
          })}
      </Grid>
    </Box>
  );
};
