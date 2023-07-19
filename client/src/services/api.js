import axios from 'axios';

const api = axios.create({
  baseURL:'http://localhost:3001'/* 'https://pf-nova-academy-production.up.railway.app'*/,
  
  headers: {
    'Content-Type': 'application/json',
   
  },
});

export default api;