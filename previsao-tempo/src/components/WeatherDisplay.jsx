// WeatherDisplay.jsx
import React from 'react';
import { Card, Typography } from '@mui/material';

const WeatherDisplay = ({ dadosMeteorologicos }) => {
  if (!dadosMeteorologicos) {
    return null;
  }

  const { name, main } = dadosMeteorologicos;
  const temperatura = main.temp - 273.15;
  const sensacaoTermica = main.feels_like - 273.15;
  const tempMin = main.temp_min - 273.15;
  const tempMax = main.temp_max - 273.15;

  return (
    <Card>
      <Typography variant="h5">{name}</Typography>
      <Typography>{`Temperatura: ${temperatura.toFixed(2)}°C`}</Typography>
      <Typography>{`Sensação Térmica: ${sensacaoTermica.toFixed(2)}°C`}</Typography>
      <Typography>{`Mínima: ${tempMin.toFixed(2)}°C`}</Typography>
      <Typography>{`Máxima: ${tempMax.toFixed(2)}°C`}</Typography>
      <Typography>{`Pressão: ${main.pressure} hPa`}</Typography>
      <Typography>{`Umidade: ${main.humidity}%`}</Typography>
    </Card>
  );
};

export default WeatherDisplay;
