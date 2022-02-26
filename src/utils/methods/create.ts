import { collection, addDoc } from 'firebase/firestore';
import { getRandomString, validURL } from '$utils/general';
import { database } from '$utils/firebase';

export const createShortURL = async (url: string, key: string) => {
  if (!key || key !== import.meta.env.VITE_PRIVATEKEY) return { error: 'Invalid KEY!!' };
  if (!validURL(url)) return { error: 'Invalid URL!!', result: null };

  const result = await createReference(url);
  return { ...result, error: null };
};

export const createReference = async (url: string) => {
  const randomURL = getRandomString();

  try {
    const collectionRef = collection(database, 'database');
    const data = {
      url,
      short: randomURL,
      createdAt: new Date(),
      clicks: 0,
    };

    await addDoc(collectionRef, data);
    return { result: 'https://' + import.meta.env.VITE_DOMAIN + '/go/' + randomURL };
  } catch (e) {
    console.error('Error adding document: ', e);
    return { error: 'Error adding document' };
  }
};
