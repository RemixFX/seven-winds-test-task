import { StyleLine } from "./button-group.types"

// Возвращает число-отступ в зависимости от вложенности
export function setStyleLevel(level: number): number {
  return (level * 20) + 12
}

//Возвращает массив с объектами, определяющими все предыдущие уровни вложенности
export function setStyleStreamLine(arrStream: boolean[]): StyleLine[] {
  return arrStream.map((line, index) => {
    if (line) {
      return {
        line,
        padding: -29 - ((arrStream.length - (index + 1)) * 20)
      }
    }
    return { line, padding: 0 }
  })
}