export default class Helper {
  static clickedButton(elementId: string): void {
    const clickedBTN = document.getElementById(elementId) as HTMLButtonElement
    clickedBTN.classList.add('clicked')

    setTimeout(() => {
      clickedBTN.classList.remove('clicked')
    }, 100)
  }

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

  // static debounce(n: number, fn: (...params: any[]) => any, immediately = false) {
  //   let timer: number | undefined = undefined
  //   return function (this: any, ...args: any[]) {
  //     if (timer === undefined && immediately) {
  //       fn.apply(this, args)
  //     }
  //     clearTimeout(timer)
  //     timer = setTimeout(() => fn.apply(this, args), n)
  //     return timer
  //   }
  // }
}
