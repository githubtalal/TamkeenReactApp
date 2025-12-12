import { ApiConfig } from "../API/ApiConfig"

export const ArticlesServices = {
    getUserArticles: function (params = {}) {
        return fetch(`${ApiConfig.BASE_URL_TAMKEEN}${ApiConfig.ENDPOINTS.ARTICLES}?page=${params.page_number ?? 0}`, {
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
    getArticleDetails: function (params = {}) {
        return fetch(`${ApiConfig.BASE_URL_TAMKEEN}${ApiConfig.ENDPOINTS.ARTICLE}/${params.articleId}?_format=json`, {
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
    updateArticle: function (params = {}) {
        return fetch(`${ApiConfig.BASE_URL_TAMKEEN}${ApiConfig.ENDPOINTS.ARTICLE}/${params.articleId}?_format=json`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + `${params.credentials}`,
                'X-CSRF-Token': `${params.csrf_token}`
            },
            body: JSON.stringify({
                "type": [{
                        "target_id": `${params.body.type.value}`
                    }],
                "body": [{
                    "value": `${params.body.description.value}`
                }],
               // "field_image": [params.field_image],
                "title": {
                    "value": `${params.body.title.value}`
                }
            })
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(serverError => { throw new Error(serverError.message) })
            } else {
                return res.json()
            }
        })
    },
   uploadArticleImage: function (params = {}) {
       return fetch(`${ApiConfig.BASE_URL_TAMKEEN}${ApiConfig.ENDPOINTS.UPLOAD_ARTICLE_IMAGE}?_format=json`, {
           method: "POST",
           headers: {
               "Content-Type": "application/octet-stream",
               "X-CSRF-Token": `${params.csrf_token}`,
               "Content-Disposition": `filename="${params.file_name}"`,
               "Authorization": 'Basic ' + `${params.credentials}`
           },
           body: JSON.stringify({
               'field_image': params.selected_file
           })
       })
       .then(res => {
           if (!res.ok) {
               return res.json().then(serverError => {throw new Error(serverError.message)})
           }else {
               return res.json()
           }
       })
   },
    deleteArticle: function (params = {}) {
        return fetch(`${ApiConfig.BASE_URL_TAMKEEN}${ApiConfig.ENDPOINTS.ARTICLE}/${params.articleId}?_format=json`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": `${params.csrf_token}`,
                "Authorization": "Basic " + `${params.credentials}`
            }
        })
        .then(res => {
            return res
        })
    }
}