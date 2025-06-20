const shuffleArray = <T extends { id: number }>(array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }

  if (array[0]?.id === 0 && array.length > 1) {
    const randomIndex = Math.floor(Math.random() * (array.length - 1)) + 1
    ;[array[0], array[randomIndex]] = [array[randomIndex], array[0]]
  }
  return array
}

export default shuffleArray
