import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';

const SearchBar = ({ aoBuscar }) => {
  const [cidade, setCidade] = useState('');

  const manipularEnvio = () => {
    aoBuscar(cidade);
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={8}>
        <TextField
          label="Cidade"
          variant="outlined"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <Button variant="contained" color="primary" onClick={manipularEnvio} fullWidth>
          Buscar
        </Button>
      </Grid>
    </Grid>
  );
};
export default SearchBar;