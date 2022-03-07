import { validURL } from '$utils/general';
import axios from 'axios';

export const createShortURL = async (url: string) => {
  if (!validURL(url)) return { error: 'Invalid URL!!', result: null };

  return await createReference(url);
};

export const createReference = async (url: string) => {
  try {
    const result = await axios.post(`${import.meta.env.VITE_SERVER_URL}/create/`, {
      url,
      created: new Date(),
    });
    console.log(result);
    return { result: result.data.shortenedUrl };
  } catch (error) {
    return { error };
  }
};

export const getFullURL = async (id: string) => {
  try {
    const result = await axios.post(`${import.meta.env.VITE_SERVER_URL}/get/`, {
      url: id,
    });
    console.log(result);
    return { result: result.data.url };
  } catch (error) {
    return { error };
  }
};
