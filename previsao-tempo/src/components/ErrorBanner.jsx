import React from 'react';
import { Alert } from '@mui/material';

const ErrorBanner = ({ mensagem }) => (
  <Alert severity="error">{mensagem}</Alert>
);
export default ErrorBanner;

