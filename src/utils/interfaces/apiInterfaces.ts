
export interface SignUpBodyInterface {
  first_name: string,
  login: string,
  email: string,
  password: string,
  phone: string
}

// first_name: 'Alex',
//   second_name: 'Alex',
//   login: 'Alex123456',
//   email: 'Alex@mail.ru',
//   password: '1qa@WS3ed',
//   phone: '89190009191'
// {"id":3551}

export interface ProfileInfoInterface {
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  display_name: string,
  phone: string
}