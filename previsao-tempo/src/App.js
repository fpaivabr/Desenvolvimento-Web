import React, { useState } from 'react';
import { Container, Grid, Typography, Box, createTheme, ThemeProvider } from '@mui/material';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import ErrorBanner from './components/ErrorBanner';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: '#red',
    },
    background: {
      default: '#fff',
    },
  },
});

const App = () => {
  const [dadosMeteorologicos, setDadosMeteorologicos] = useState(null);
  const [erro, setErro] = useState('');

  const buscarDadosMeteorologicos = async (cidade) => {
    try {
      const chaveApi = process.env.REACT_APP_WEATHER_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${chaveApi}`;
      const resposta = await fetch(url);
      const dados = await resposta.json();
      setDadosMeteorologicos(dados);
      setErro('');
    } catch (erro) {
      setErro('Falha ao buscar dados meteorológicos');
      setDadosMeteorologicos(null);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Box style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
          <Grid container justifyContent="center" alignItems="center" spacing={2}>
            <Grid item>
              <Typography variant="h4" gutterBottom>
                Previsão do Tempo
              </Typography>
            </Grid>
            <Grid item>
            <img
              src="https://img.freepik.com/vetores-premium/icone-de-previsao-do-tempo-sol-e-nuvens_739746-68.jpg"
              alt="Weather Icon"
              style={{ height: '48px', borderRadius: '8px' }}
            />
            </Grid>
          </Grid>
          <Box mt={4}>
            <SearchBar aoBuscar={buscarDadosMeteorologicos} />
          </Box>
          <Grid container justifyContent="center" spacing={3}>
            <Grid item xs={12}>
              {erro ? <ErrorBanner mensagem={erro} /> : <WeatherDisplay dadosMeteorologicos={dadosMeteorologicos} />}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default App;