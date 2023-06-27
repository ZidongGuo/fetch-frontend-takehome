
import axios, { AxiosResponse } from 'axios';
import {LoginRequestBody, QueryParameters} from './interface';


const BASE_URL = 'https://frontend-take-home-service.fetch.com';

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

export const get_dogsinfo = async  (Queryparams: QueryParameters) =>{
    try {
      const response: AxiosResponse = await axios.get(`${BASE_URL}/dogs/search`, { withCredentials: true, params:Queryparams})
      console.log('get_dogsinfo() Response:', response.data)
      return response.data
    } catch (error) {
      console.error('get_dogsinfo() failed: ', error);
    }

}

export const post_dogs = async  (Dogids: string[]) =>{
  // if (Dogids.length > 100) {
  //   throw new Error("Too many Dogids. The list should have no more than 100 strings.");
  // }
  try {
    const response: AxiosResponse = await axios.post(`${BASE_URL}/dogs`, Dogids, { withCredentials: true})
    console.log('post_dogs() Response:', response.data)
    return response.data
  } catch (error) {
    console.error('post_dogs() failed: ', error);
  }
}