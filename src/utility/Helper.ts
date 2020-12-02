export default class Helper {
  static formatDate(date: string): string {
    const d = new Date(date)
    let month = '' + (d.getMonth() + 1)
    let day = '' + d.getDate()
    const year = d.getFullYear()

    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day

    return [month, day, year].join('-')
  }

  static formatLongString(text: string, length: number): string {
    if (text == null) {
      return ''
    }
    if (text.length <= length) {
      return text
    }
    text = text.substring(0, length)
    const last = text.lastIndexOf(' ')
    text = text.substring(0, last)
    return text + '...'
  }

  static randomNumber(num: number): number {
    let loadingTime = Math.floor(Math.random() * 4000)
    if (loadingTime < 1000) {
      loadingTime = loadingTime + num
    }
    return loadingTime
  }


}
