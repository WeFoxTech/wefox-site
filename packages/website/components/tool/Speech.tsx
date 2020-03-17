import React from 'react';
import {
  Box,
  TextField,
  Typography,
  TextareaAutosize,
  Divider,
  Button,
  Grid,
} from '@material-ui/core';
// import { useDebouncedCallback } from 'use-debounce';

const cfgKey = 'speech_cfg';

interface Voice {
  Name: string;
  ShortName: string;
  Gender: 'Female' | 'Male';
  Locale: string;
  SampleRateHertz: string;
  VoiceType: string;
}

interface State {
  key?: string;
  voiceList?: Voice[];
  lastTokenTs?: number;
  regin?: string;
  text?: string;
  currentBlobUrl?: string;
  token?: string;
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
    if (!state.token) {
      await fetchToken();
    }

    if (!state.voiceList) {
      await fetchVoiceList();
    }
  };

  const play = async (voice: Voice) => {
    const token = await checkToken();
    const _url = `https://${state.regin}.tts.speech.microsoft.com/cognitiveservices/v1`;
    const body = `
    <speak version='1.0' xml:lang='zh-CN'><voice xml:lang='zh-CN' xml:gender='Female'
        name='zh-CN-HuihuiRUS'>
    先后任职过同花顺、每日互动等上市公司，现任哈啰单车算法专家。 大数据建模和可视化两年，时间序列数据建模、自然语言处理方面三年经验，擅长机器学习、深度学习等技术。此外兴趣面还包括传统信号处理，计算机视觉，无监督学习等。
    </voice></speak>`;

    const headers = {
      Authorization: `Bearer ${token ?? state.token}`,
      'Content-Type': 'application/ssml+xml',
      'X-Microsoft-OutputFormat': 'audio-24khz-160kbitrate-mono-mp3',
    };

    const rsp = await fetch(_url, { method: 'POST', headers, body });

    console.log(rsp.status);
    console.log(rsp.statusText);

    console.log(rsp);

    const blob = await rsp.blob();
    const url = window.URL.createObjectURL(blob);

    console.log(url);

    dispatch({ type: 'fix', newState: { currentBlobUrl: url } });
  };

  return (
    <Box>
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

      <TextareaAutosize
        aria-label="text to speech"
        value={state.text}
        rowsMin={8}
      ></TextareaAutosize>

      <Button onClick={transAction}>trans</Button>

      <Divider />

      {state.currentBlobUrl && (
        <Box>
          <audio controls>
            <source src={state.currentBlobUrl} type="audio/mp3" />
          </audio>
        </Box>
      )}

      <Grid container spacing={4}>
        {state.voiceList?.map((e, i) => {
          return (
            <Grid item>
              <Button onClick={ev => play(e)}></Button>
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
