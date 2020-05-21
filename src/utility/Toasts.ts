import {IErrorToast, ISuccessToast} from '@/types/UI/IToast'

/**
 * @class Toast
 * Creates a Bootstrap 4 Toast popup
 */

class Toast {
  /**
   * @param {Vue} vInstance - Vue Instance
   * @param {string} message - message body
   * @param {string} title - title of toast popup
   * @param {number | undefined} autoHideDelay - duration of toast popup
   * @param {string | undefined} colorVariant - used to color the toast ie: primary, secondary, success, danger....
   * @static
   * @returns void
   */
  public static successToast({ vInstance, message, title, autoHideDelay, colorVariant }: ISuccessToast): void {
    //@ts-ignore
    vInstance.$bvToast.toast(message, {
      title: title,
      variant: colorVariant || 'success',
      autoHideDelay: autoHideDelay || 4000,
    })
  }

  public static errorToast({vInstance, message, title, autoHideDelay, colorVariant, errors}: IErrorToast): void {
      // @ts-ignore
          if (errors !== undefined) {
          const numOfErrors = errors
          if (Array.isArray(numOfErrors)) {
              if (numOfErrors.length > 0) {
                  for (let i = 0; numOfErrors.length > i; i++) {
                      //@ts-ignore
                      vInstance.$bvToast.toast(numOfErrors[i].description, {
                          title: numOfErrors[i].code,
                          variant: 'danger',
                          autoHideDelay: autoHideDelay || 4000,
                      })
                  }
              }
              return
          }
      }
      //@ts-ignore
      vInstance.$bvToast.toast(message, {
          title: title,
          variant: colorVariant || 'danger',
          autoHideDelay: autoHideDelay || 4000,
      })
  }

}

export default Toast
