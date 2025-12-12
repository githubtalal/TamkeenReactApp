import { ApiConfig } from "../API/ApiConfig";

export const UserProfileServices = {
    updateUserProfile: function (params = {}) {
        const updatedData = {
            "field_name": [
                {
                    "value": `${params.first_name}`
                }
            ],
            "field_surname": [
                {
                    "value": `${params.last_name}`
                }
            ]

        }
        return fetch(`${ApiConfig.BASE_URL_TAMKEEN}${ApiConfig.ENDPOINTS.USER}/${params.user_id}?_format=json`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': `${params.csrf_token}`,
                'Authorization': 'Basic ' + `${params.credentials}`
            },
            body: JSON.stringify(updatedData)
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(serverError => { throw new Error(serverError.message) })
                } else {
                    return res.json()
                }
            })
    },
    uploadUserImage: function (params = {}) {
        return fetch(`${ApiConfig.BASE_URL_TAMKEEN}${ApiConfig.ENDPOINTS.UPLOAD_USER_IMAGE}?_format=json`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/octet-stream',
                "X-CSRF-Token": `${params.csrf_token}`,
                "Content-Disposition": `filename="${params.file_name}"`,
                'Authorization': 'Basic ' + `${params.credentials}`
            }
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(serverError => { throw new Error(serverError.message) })
                } else {
                    return res.json()
                }
            })
    },
    getAllUsers: function (params = {}) {
        return fetch(`${ApiConfig.BASE_URL_TAMKEEN}${ApiConfig.ENDPOINTS.USERS}?_format=json&&page=${params.page_number ?? 0}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + `${params.credentials}`
            }
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(serverError => { throw new Error(serverError.message) })
            } else {
                return res.json()
            }
        })
    },
    getUserProfile: function (params = {}) {
        return fetch(`${ApiConfig.BASE_URL_TAMKEEN}${ApiConfig.ENDPOINTS.USER}/${params.user_id}?_format=json`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + `${params.credentials}`
            }
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(serverError => { throw new Error(serverError.message) })
            } else {
                return res.json()
            }
        })
    },
    deleteUser: function (params = {}) {
        return fetch(`${ApiConfig.BASE_URL_TAMKEEN}${ApiConfig.ENDPOINTS.USER}/${params.user_id}?_format=json`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': `${params.csrf_token}`,
                'Authorization': 'Basic ' + `${params.credentials}`
            }
        })
        .then(res => {
            return res
        })
    }
}