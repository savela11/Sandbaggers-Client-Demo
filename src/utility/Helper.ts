export default class Helper {
  static formatDate(date: string): string {
    const d = new Date(date);
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [month, day, year].join("-");
  }

  static formatPhone(phoneNumber: string): string {
    const x = phoneNumber.replace(/\D/g, "").match(/(\d{0,3})(\d{0,3})(\d{0,4})/) as RegExpMatchArray;
    phoneNumber = !x[2] ? x[1] : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
    return phoneNumber;
  }

  static formatLongString(text: string, length: number): string {
    if (text == null) {
      return "";
    }
    if (text.length <= length) {
      return text;
    }
    text = text.substring(0, length);
    const last = text.lastIndexOf(" ");
    text = text.substring(0, last);
    return text + "...";
  }

  static randomNumber(num: number): number {
    let loadingTime = Math.floor(Math.random() * 4000);
    if (loadingTime < 1000) {
      loadingTime = loadingTime + num;
    }
    return loadingTime;
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

  static debounce(callback: any, wait: number): any {
    let timerId: number;
    return (...args: any[]) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        callback(...args);
      }, wait);
    };
  }


  static searchByFullName(arr: Array<any>, searchInput: string): Array<any> {
    return arr.filter((a) => {
      const space = a.fullName.lastIndexOf(" ");
      const firstName = a.fullName.substring(0, space);
      const lastName = a.fullName.substring(space + 1);
      if (lastName.toLowerCase().startsWith(searchInput.toLowerCase()) || firstName.toLowerCase().startsWith(searchInput.toLowerCase())) {
        return a;
      }
    });
  }
}
