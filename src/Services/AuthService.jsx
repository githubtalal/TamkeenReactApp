import { ApiConfig } from "../API/ApiConfig"

export const AuthService = {
    getCurrentUsrProfile: function (params = {}) {

        const userId = params.userId
        const credentials = params.credentials

        const url = `${ApiConfig.BASE_URL_TAMKEEN}${ApiConfig.ENDPOINTS.USER}/${userId}?_format=json`
        return fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + `${credentials}`
            }
        })
        .then((res) => {
            if (!res.ok) {
                return res.json().then((serverError) => { throw new Error(serverError.message) })
            } else {
                return res.json()
            }
        })

    },
    loginUser: function (name, pass) {
        const url= `${ApiConfig.BASE_URL_TAMKEEN}${ApiConfig.ENDPOINTS.USER}${ApiConfig.ENDPOINTS.LOGIN}?_format=json`
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    "name": `${name}`,
                    "pass": `${pass}`
                }
            )
        })
    },
    registerUser: function(registerData) {
        console.log(registerData)
        const url = `${ApiConfig.BASE_URL_TAMKEEN}${ApiConfig.ENDPOINTS.USER}${ApiConfig.ENDPOINTS.REGISTER}?_format=json`
        return  fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerData)
        })
            .then((res) => {
                if (!res.ok) {
                    return res.json().then((serverError) => { throw new Error(serverError.message) })
                } else {
                    return res.json()
                }

            })
    },
    getCurrentUsrImage: function(params = {}) {
        const userId = params.userId
        const credentials = params.credentials

        const url = `${ApiConfig.BASE_URL_TAMKEEN}${ApiConfig.ENDPOINTS.USER}/${userId}?_format=json`
        return fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + `${credentials}`
            }
        })
        .then((res) => {
            if (!res.ok) {
                return res.json().then((serverError) => { throw new Error(serverError.message) })
            } else {
                return res.json()
            }
        })
        .then(data => {
            return data.user_picture.length > 0 ? data.user_picture[0].url : ''
        })
    }
}
