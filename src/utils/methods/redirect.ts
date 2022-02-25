import { collection, getDocs, where, query } from 'firebase/firestore';
import { database } from '$utils/firebase';

export const redirectToURL = async (id: string) => {
  const q = query(collection(database, 'database'), where('short', '==', id));
  const querySnapshot = await getDocs(q);

  let url: string;
  querySnapshot.forEach((doc) => {
    url = doc.data().url;
  });

  if (!url) return { error: 'Not found' };
  return { result: url };
};

export const getDataAboutURL = async (id: string) => {
  const q = query(collection(database, 'database'), where('short', '==', id));
  const querySnapshot = await getDocs(q);

  let queryData: {
    url: string;
    short: string;
  };
  querySnapshot.forEach((doc) => {
    queryData = {
      url: doc.data().url,
      short: 'https://' + import.meta.env.VITE_DOMAIN + '/short' + '/' + id,
    };
    return;
  });

  if (!queryData) return { error: 'Not found' };
  return { result: queryData };
};
