import { ApiConfig } from "../API/ApiConfig"

export const ArticlesServices = {
    getUserArticles: function (params = {}) {
        return fetch(`${ApiConfig.BASE_URL_TAMKEEN}${ApiConfig.ENDPOINTS.ARTICLES}?page=${params.page_number}`, {
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
        console.log(params)
        return fetch(`${ApiConfig.BASE_URL_TAMKEEN}${ApiConfig.ENDPOINTS.ARTICLE}/${params.articleId}?_format=json`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + `${params.credentials}`,
                'X-CSRF-Token': `${params.csrf_token}`
            },
            body: JSON.stringify({
                "title": params.title,
                "type": params.type,
                "body": params.body,
                "field_image":  params.field_image,
                "field_gallery": params.field_gallery,
                "field_category": params.field_category,
                "field_tags": params.field_tags
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
                "X-CSRF-Token": `${params.sessionToken}`,
                "Content-Disposition": `file; filename="${params.file_name}"`,
                "Authorization": 'Basic ' + `${params.credentials}`
            },
            body: params.file
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(serverError => { throw new Error(serverError.message) })
                } else {
                    return res.json()
                }
            })
            .then(data => {
                return {
                    "fid": data.fid[0].value,
                    "url": ApiConfig.BASE_URL_TAMKEEN + data.uri[0].url
                }
            })
    },
    uploadGallaryImages: function (params = {}) {
        return fetch(`${ApiConfig.BASE_URL_TAMKEEN}${ApiConfig.ENDPOINTS.UPLOAD_GALLARY_IMAGES}?_format=json`, {
            method: "POST",
            headers: {
                "Content-Type": "application/octet-stream",
                "X-CSRF-Token": `${params.sessionToken}`,
                "Content-Disposition": `file; filename="${params.file_name}"`,
                "Authorization": 'Basic ' + `${params.credentials}`
            },
            body: params.file
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(serverError => { throw new Error(serverError.message) })
                } else {
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
    },
    createBlog: function (params = {}) {
        return fetch(`${ApiConfig.BASE_URL_TAMKEEN}${ApiConfig.ENDPOINTS.ARTICLE}?_format=json`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": `${params.csrf_token}`,
                "Authorization": "Basic " + `${params.credentials}`
            },
            body: JSON.stringify({
                "type": params.type,
                "title": params.title,
                "body": params.body,
                "field_image": params.field_image,
                "field_gallery": params.field_gallery,
                "field_tags": params.field_tags,
                "field_category": params.field_category
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
    getTags: function () {
        return fetch(`${ApiConfig.BASE_URL_TAMKEEN}${ApiConfig.ENDPOINTS.TAGS}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
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
    getBlogs: function (options = {}) {
        const params = new URLSearchParams()

        params.append('items_per_page', 15)
        params.append('page', options.page_number)
        if (options.searchQuery) params.append('search', options.searchQuery)
        if (options.category) params.append('category', options.category)
        if (options.tag) params.append('tag', options.tag)

        const url = `${ApiConfig.BASE_URL_TAMKEEN}${ApiConfig.ENDPOINTS.BLOGS}?${params.toString()}`
        
        return fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic " + `${options.credentials}`
            }
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(serverError => { throw new Error(serverError.message) })
                } else {
                    return res.json()
                }
            })
    }
}