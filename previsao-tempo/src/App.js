// App.js
import React, { useState } from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import ErrorBanner from './components/ErrorBanner';
import './App.css';

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
    <Container>
      <Box style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Previsão do Tempo
        </Typography>
        <Grid container justify="center" spacing={3}>
          <Grid item xs={12}>
            <SearchBar aoBuscar={buscarDadosMeteorologicos} />
          </Grid>
          <Grid item xs={12}>
            {erro ? <ErrorBanner mensagem={erro} /> : <WeatherDisplay dadosMeteorologicos={dadosMeteorologicos} />}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default App;