import React from 'react';
import PlayForWorkIcon from '@material-ui/icons/PlayForWork';
import VoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';

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
} from '@material-ui/core';

const cfgKey = 'speech_cfg';

interface Voice {
  Name: string;
  ShortName: string;
  Gender: 'Female' | 'Male';
  Locale: string;
  SampleRateHertz: string;
  VoiceType: string;
  blobUrl?: string;
  loading?: boolean;
}

interface State {
  key?: string;
  voiceList?: Voice[];
  lastTokenTs?: number;
  regin?: string;
  text?: string;
  token?: string;
  loadingList?: boolean;
}

const initialState: State = {
  regin: 'eastasia',
  text: '微狐科技欢迎你！',
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
  const fetchToken = async () => {
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

  const transAction = async () => {
    if (!state.voiceList) {
      dispatch({ type: 'fix', newState: { loadingList: true } });
    }

    if (!state.token) {
      await fetchToken();
    }

    if (!state.voiceList) {
      await fetchVoiceList();
      dispatch({ type: 'fix', newState: { loadingList: false } });
    }
  };

  const play = async (voice: Voice) => {
    voice.loading = true;
    dispatch({ type: 'fix', newState: { voiceList: state.voiceList } });

    const token = await checkToken();
    const _url = `https://${state.regin}.tts.speech.microsoft.com/cognitiveservices/v1`;
    const body = `
    <speak version='1.0' xml:lang='${voice.Locale}'><voice xml:lang='${voice.Locale}' xml:gender='${voice.Gender}'
        name='${voice.ShortName}'>
    ${state.text}
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
    const voiceList = state.voiceList?.map(e => {
      delete e.blobUrl;
      delete e.loading;
      return e;
    });
    dispatch({ type: 'fix', newState: { voiceList, text: newText } });
  };

  return (
    <Box pb={8}>
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
            xs: 480,
            lg: 720,
          }}
        >
          <TextareaAutosize
            aria-label="text to speech"
            value={state.text}
            rowsMin={8}
            onChange={e => changeText(e.target.value)}
          ></TextareaAutosize>
        </Box>
        <Box py={2}>
          {state.loadingList ? (
            <CircularProgress size={48} />
          ) : (
            <Button
              color="primary"
              variant="contained"
              onClick={transAction}
              startIcon={<KeyboardVoiceIcon />}
            >
              text for speech
            </Button>
          )}
        </Box>
      </Box>

      <Divider />

      <Grid container spacing={4}>
        {state.voiceList?.map((e, i) => {
          return (
            <Grid item>
              {e.loading ? (
                <CircularProgress />
              ) : e.blobUrl ? (
                <audio controls>
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
              <TextField
                value={e.SampleRateHertz}
                label="SampleRateHertz"
                InputProps={{
                  readOnly: true,
                }}
              />
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
