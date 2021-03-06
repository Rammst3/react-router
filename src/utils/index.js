import { showMessageError, showMessageSuccess, showModalError, getAjaxErrorMsg, showMessageWarn } from './handleError'
import { toLoginPage, logout } from './handleLogin'
import { checkAccessPermission } from './permission'
import { downloadFile, downloadFileByUrl } from './download-file'
import { exportPageData } from './exportTableData'
import { getValidProperty, htmlText, htmlIsEmpty, checkValidValue } from './handleForm'
import { translateText } from './translate'

export default {
  showMessageError,
  showMessageSuccess,
  showModalError,
  getAjaxErrorMsg,
  showMessageWarn,
  toLoginPage,
  logout,
  checkAccessPermission,
  downloadFile,
  exportPageData,
  getValidProperty,
  htmlText,
  htmlIsEmpty,
  checkValidValue,
  downloadFileByUrl,
  translateText
}