  let socket: WebSocket;



export function useSocket(ownUserId: number, chatId: number, token: string) {
  socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${ownUserId}/${chatId}/${token}`)

  socket.onopen = () => {
    window.setInterval(()=> {
      socket.send(JSON.stringify({
        content: '',
        type: 'ping',
      }))
    }, 30000)
  }

  socket.addEventListener("close", event => {
    console.log("close", event)
    if (event.wasClean) {
      console.log("Соединение закрыто чисто")
    } else {
      console.log("Обрыв соединения")
    }
    console.log(`Код: ${event.code} | Причина: ${event}`)
    if (event.code === 1006) {
      useSocket(ownUserId, chatId, token)
    }
  })

  socket.addEventListener("error", event => {
    console.log("Ошибка", event)
  })
}

export const getSocket = () => {
  return socket
}
