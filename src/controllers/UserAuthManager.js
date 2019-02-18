import Util from '@/controllers/Util.js'
import Constants from '@/controllers/Constants.js'

export default class UserAuthManager{
    static COOKIE_NAME = 'USER_AUTH_TOKEN'
    static PRE_COOKIE_VALUE = 'xrem'
    static isAuthenticatedUser(){
        return new Promise((ok, err) => {
            const cookie = Util.getCookie(UserAuthManager.COOKIE_NAME)
            if (cookie && cookie.indexOf(UserAuthManager.PRE_COOKIE_VALUE) === 0) {
                ok({ok: true, cookie: cookie})
            }else{
                ok({ok: false, code: Constants.Error.USER_NOT_AUTHENTICATED})
            }
        })
    }
    static createNewAuthUser(name){
        return new Promise((ok, err) => {
            const userId = Util.uuid()
            const cookieValue = `${UserAuthManager.PRE_COOKIE_VALUE}-${userId}`
            Util.setCookie(UserAuthManager.COOKIE_NAME, cookieValue, 365)
            ok({ok:true, userId: cookieValue})
        })
    }
}