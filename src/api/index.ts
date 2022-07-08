import { AppState } from './../state/appStateReducer';
export const save = (payload: AppState) => {
  return fetch('http://localhost:4000/save', {
    method: "POST",
    headers: {
      Accept: "application/json",
      ContentType: "application/json"
    },
    body: JSON.stringify(payload)
  }).then((res) => {
    if(res.ok) return res.json()
    else throw new Error("Error while saving the state.")
  })
}

export const load = () => {
  return fetch('http://localhost:4000/load').then(res => {
    if (res.ok) return res.json() as Promise<AppState>
    else throw new Error("Error while loading the state.")
  })
}