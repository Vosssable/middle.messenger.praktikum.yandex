import { HTTPTransport } from "../helpers/fetchRequest"
import { SignUpBodyInterface } from "../interfaces/apiInterfaces"

const fetch = new HTTPTransport()

export function signIn(login: string, password: string) {
  return fetch.post("/auth/signin", {
    data: JSON.stringify({ "login": login, "password": password }),
    headers: {
      "Content-Type": "application/json"
    }
  })
}

export function logOut() {
  return fetch.post("/auth/logout", {
    headers: {
      "Content-Type": "application/json"
    }
  })
}

export function signUp(body: SignUpBodyInterface) {
  return fetch.post("/auth/signup", {
    data: JSON.stringify({...body}),
    headers: {
      "Content-Type": "application/json"
    }
  })
}

export function getUser() {
  return fetch.get("/auth/user", {
    headers: {
      "Content-Type": "application/json"
    }
  })
}
