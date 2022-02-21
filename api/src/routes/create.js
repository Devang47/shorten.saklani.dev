import { Router } from "express";
import { addDoc, collection, getDocs, where, query } from "firebase/firestore";

import { database } from "../utils/firebase.utils.js";
import { getRandomString, validURL } from "../utils/basic.utils.js";

export const createRoute = new Router()

createRoute.post('/', async (req, res) => {
    const { url } = req.body
    const { key } = req.query

    if (!key || key !== process.env.PRIVATEKEY) return res.status(401).send('Invalid KEY').end()
    if (!validURL(url)) return res.status(400).send('Invalid URL').end()

    const result = await createReference(url)
    res.send({ result }).status(200).end()
})

createRoute.get('/:id', async (req, res) => {
    const { id } = req.params

    const q = query(collection(database, 'database'), where("short", "==", id));
    const querySnapshot = await getDocs(q);

    let queryData;
    querySnapshot.forEach((doc) => {
        queryData = {
            url: doc.data().url,
            short: 'https://' + process.env.DOMAIN + '/' + id
        }
        return
    });

    if (!queryData) return res.status(404).send({ error: 'Not found' }).end()
    res.send(queryData).end()
})

export const createReference = async (url) => {
    const randomURL = getRandomString()

    try {
        const collectionRef = collection(database, 'database')
        const data = {
            url,
            short: randomURL,
            createdAt: new Date(),
            clicks: 0
        }

        await addDoc(collectionRef, data)
        return 'https://' + process.env.DOMAIN + '/' + randomURL
    } catch (e) {
        console.error("Error adding document: ", e)
        return null
    }
}
