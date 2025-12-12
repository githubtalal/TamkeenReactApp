import { ApiConfig } from "../API/ApiConfig"

export const FAQsServices = {
    getFAQs: function() {
        return fetch(`${ApiConfig.BASE_URL_TAMKEEN}${ApiConfig.ENDPOINTS.FAQs}`)
        .then(res => {
            if(!res.ok) {
                return res.json().then(serverError => {throw new Error(serverError.message)})
            } else {
                return res.json()
            }
        })
    }
}