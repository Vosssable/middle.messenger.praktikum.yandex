
export interface SignUpBodyInterface {
  first_name: string,
  login: string,
  email: string,
  password: string,
  phone: string
}


export interface ProfileInfoInterface {
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  display_name: string,
  phone: string
}

export interface GetChatsInterface {
  offset?: number,
  limit?: number,
  title?: string
}
