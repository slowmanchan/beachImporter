export function dateMinusADay(date: string): string {
  const d = new Date(date)
  d.setDate(d.getDate()-1)
  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const day = d.getDate()
  return `${year}-${month}-${day}`
}

export function fullDateString(date: string): string {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const day = d.getDate()
  return `${year}-${month}-${day}`
}