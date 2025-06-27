import axios from 'axios';

const api = axios.create({
  baseURL: 'https://v3.football.api-sports.io',
  headers: {
    'X-RapidAPI-Key': import.meta.env.VITE_API_FOOTBALL_KEY,
    'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
  }
});

export const getTodayMatches = async () => {
  const today = new Date().toISOString().split('T')[0];
  const res = await api.get(`/fixtures?date=${today}`);
  console.log(res.data.response); // Log the response for debugging
  return res.data.response;  
};
