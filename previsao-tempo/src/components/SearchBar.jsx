// SearchBar.jsx
import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const SearchBar = ({ aoBuscar }) => {
  const [cidade, setCidade] = useState('');

  const manipularEnvio = () => {
    aoBuscar(cidade);
  };

  return (
    <div>
      <TextField label="Cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} />
      <Button onClick={manipularEnvio}>Buscar</Button>
    </div>
  );
};

export default SearchBar;