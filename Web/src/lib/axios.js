
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost/projects/My-Projects/GP%20-%20website/3-%20website/V2.6%20tiitles/backend/api/', 
  withCredentials: true ,
  // headers: {
  //   'Content-Type': 'application/json',
  // },
});

export default api;