import React from 'react';
import { Card, Typography, Box, Grid } from '@mui/material';
//import { WiDaySunny, WiCloudy, WiRain } from 'react-icons/wi';
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm, WiDayCloudy } from 'react-icons/wi';

const WeatherDisplay = ({ dadosMeteorologicos }) => {
  if (!dadosMeteorologicos) {
    return null;
  }

  const { name, main, weather } = dadosMeteorologicos;
  const temperatura = main.temp - 273.15;
  const sensacaoTermica = main.feels_like - 273.15;
  const tempMin = main.temp_min - 273.15;
  const tempMax = main.temp_max - 273.15;

// Escolhe o ícone apropriado e a cor
let IconComponent = null;
let iconColor = '#000000';

switch (weather[0].main) {
  case 'Clear':
    IconComponent = WiDaySunny;
    iconColor = '#ffcc00';
    break;
  case 'Clouds':
    IconComponent = WiCloudy;
    iconColor = '#808080';
    break;
  case 'Rain':
  case 'Drizzle':
    IconComponent = WiRain;
    iconColor = '#0000ff';
    break;
  case 'Snow':
    IconComponent = WiSnow;
    iconColor = '#ffffff';
    break;
  case 'Thunderstorm':
    IconComponent = WiThunderstorm;
    iconColor = '#000000';
    break;
  default:
    IconComponent = WiDayCloudy; // Ícone padrão para qualquer outro tempo
    iconColor = '#808080'; // Cor padrão para qualquer outro tempo
    break;
}

  // Estilo para os ícones
  const iconStyles = {
    fontSize: '1.5rem',
    color: iconColor,
  };

  return (
    <Card>
      <Box padding={2}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs>
            <Grid container alignItems="center" spacing={1}>
              <Grid item>
                <Typography variant="h5">{name}</Typography>
              </Grid>
              <Grid item>
                {IconComponent && <IconComponent style={iconStyles} />}
              </Grid>
            </Grid>
            <Typography>{`Temperatura: ${temperatura.toFixed(2)}°C`}</Typography>
            <Typography>{`Sensação Térmica: ${sensacaoTermica.toFixed(2)}°C`}</Typography>
            <Typography>{`Mínima: ${tempMin.toFixed(2)}°C`}</Typography>
            <Typography>{`Máxima: ${tempMax.toFixed(2)}°C`}</Typography>
            <Typography>{`Pressão: ${main.pressure} hPa`}</Typography>
            <Typography>{`Umidade: ${main.humidity}%`}</Typography>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};
export default WeatherDisplay;