
import axios, { AxiosResponse } from 'axios';

const BASE_URL = 'https://frontend-take-home-service.fetch.com';

interface LoginRequestBody {
  name: string;
  email: string;
}


export const login =  async (name:string, email:string) => {
    const body: LoginRequestBody = { name, email };
    try {
        const response: AxiosResponse = await axios.post(`${BASE_URL}/auth/login`, body, {
          withCredentials: true, 
        });
  
        console.log('Successfully logged in!');
        console.log('Response:', response.data);
        return response.data
      } catch (error) {
        console.error('Login failed: ', error);
      }
}

export const logout = async () =>{
    try {
        const response: AxiosResponse = await axios.post(`${BASE_URL}/auth/logout`);
  
        console.log('Successfully logged out');
        console.log('Response:', response.data);
      } catch (error) {
        console.error('Logout failed: ', error);
      }
}

export const get_dogbreeds = async  () =>{
    try {
        const response: AxiosResponse = await axios.get(`${BASE_URL}/dogs/breeds`, { withCredentials: true })
        console.log('get_dogbreeds() Response:', response.data)
        return response.data
    } catch (error) {
        console.error('get_dogbreeds() failed: ', error);
    }
}

