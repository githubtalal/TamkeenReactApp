import { ApiConfig } from "../API/ApiConfig"

export const CategoriesServices = {
    getCategories: function() {
        return fetch(`${ApiConfig.BASE_URL_TAMKEEN}${ApiConfig.ENDPOINTS.ARTICLE_CATEGORY}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => {
            if(!res.ok) {
                return res.json().then(serverError => {throw new Error(serverError.message)})
            }else {
                return res.json()
            }
        })
    }
}