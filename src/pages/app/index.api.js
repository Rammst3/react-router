import axios from 'axios'

export async function getUserPermList(payload) {
  // console.log(payload)
  return axios.post(`${AUTH_SERVICE}/api/token/check`, {
    ...payload
  }).then(resp => {
    return Promise.resolve(resp)
  }).catch(e => {
    return null
  })
}