import {api} from '../../config'

export async function getProject(username, password) {
     let credentials = btoa(username + ':' + password);
     let basicAuth = 'Basic ' + credentials;

     let response = await api.get(`/users/current.json`, {
         headers: {
             'Authorization': basicAuth
         }
     })

    if (response.status !== 200) throw new Error('Some error')
    return response.data
}