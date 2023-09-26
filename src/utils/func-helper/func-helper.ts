export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  // console.log('clearTimeout')

  let timerId: ReturnType<typeof setTimeout>

  return function (...args: Parameters<T>): void {
    clearTimeout(timerId)

    timerId = setTimeout(() => {
      func(...args)
    }, delay)
  }
}

export const changerForTime = (time: string) => {
  const date = new Date(time)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()

  return `${day}.${month}.${year}`
}
