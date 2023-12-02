import { Middleware } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

export const toastMiddleware: Middleware = () => (next) => (action) => {
  if (action.type.endsWith('fulfilled')) {
    const message = action.payload.message || undefined
    if(message) toast.success(message);
  } else if (action.type.endsWith('rejected')) {
    const message = action.payload || 'Operation failed';
    toast.error(message);
  }

  return next(action);
};
