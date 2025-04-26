function formatDateToLocal(date: string, onlyTime?: boolean, ): string {
  const messageDate = new Date(date)

  const today = new Date()

  const isToday =
    messageDate.getDate() === today.getDate() &&
    messageDate.getMonth() === today.getMonth() &&
    messageDate.getFullYear() === today.getFullYear()

  const hours = messageDate.getHours().toString().padStart(2, '0'),
   minutes = messageDate.getMinutes().toString().padStart(2, '0')

  if (isToday || onlyTime) {
    if (onlyTime || (onlyTime === undefined && isToday)) {
      return `${hours}:${minutes}`// для вывода в чатлистах только времени (да и в чатах тоже)
    } else if (onlyTime === false) {
      return `Сегодня`
    }
  }

  const notTodayButThisWeek =
    messageDate.getDate() !== today.getDate() &&
    messageDate.getMonth() === today.getMonth() &&
    messageDate.getFullYear() === today.getFullYear()

  if (notTodayButThisWeek) {
    const weekdays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
      weekday = weekdays[messageDate.getDay()];
    return `${weekday}`
  }

  const day = messageDate.getDate().toString().padStart(2, '0'),
   month = (messageDate.getMonth() + 1).toString().padStart(2, '0'),
   year = messageDate.getFullYear()

  return `${day}.${month}.${year} г.`
}

function compareDate(dateOld: string, dateNew: string) {
  const oldDate = new Date(dateOld),
    newDate = new Date(dateNew)

  return oldDate.getDate() !== newDate.getDate()
}

export  {formatDateToLocal, compareDate}
