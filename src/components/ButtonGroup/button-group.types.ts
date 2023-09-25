export interface StyleLine {
  line: boolean
  padding: number
}

export interface ButtonGroupProps {
  hasChild: boolean
  hasSister: boolean
  arrStream: boolean[]
  level: number
  handleClickDelete(): void
  handleClickCreate(): void
}