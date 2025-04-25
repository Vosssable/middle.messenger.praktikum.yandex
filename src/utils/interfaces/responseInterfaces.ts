
export interface ChatListResponseInterface {
  id: number
  title: string
  avatar: string
  unread_count: number
  created_by: number
  last_message: LastChatMessageInterface
}

interface LastChatMessageInterface {
  user: ChatUserInterface
  time: string
  content: string
}

interface ChatUserInterface {
  first_name: string
  second_name: string
  avatar: string
  email: string
  login: string
  phone: string
}
