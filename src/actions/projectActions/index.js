import {api} from "../../config";
import {getTokenFromLocalStorage} from "../localStorage";



export async function getAllProject() {
    let key = await getTokenFromLocalStorage()
    let response = await api.get(`/projects.json`, {
        params: {
            key: key
        }
    });

    console.log('responce', response)
}