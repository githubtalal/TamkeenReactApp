import marketImg from '../assets/marketImg.png'
import { ApiConfig } from '../API/ApiConfig'

export const AboutUsServices = {
    getMarketingDetails:
        [
            {
                image: marketImg,
                yearsRange: '2011-2025',
                head: 'We share knowledge with the world',
                description: 'Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent fermentum quam mauris. Fusce tempor et augue a aliquet. Donec non ipsum non risus egestas tincidunt at vitae nulla.'
            },
            {
                image: marketImg,
                yearsRange: '2011-2025',
                head: 'We share knowledge with the world',
                description: 'Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent fermentum quam mauris. Fusce tempor et augue a aliquet. Donec non ipsum non risus egestas tincidunt at vitae nulla.'
            },
            {
                image: marketImg,
                yearsRange: '2011-2025',
                head: 'We share knowledge with the world',
                description: 'Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent fermentum quam mauris. Fusce tempor et augue a aliquet. Donec non ipsum non risus egestas tincidunt at vitae nulla.'
            },
            {
                image: marketImg,
                yearsRange: '2011-2025',
                head: 'We share knowledge with the world',
                description: 'Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent fermentum quam mauris. Fusce tempor et augue a aliquet. Donec non ipsum non risus egestas tincidunt at vitae nulla.'
            }
        ],
        getTopTestimonials: function () {
            return fetch(`${ApiConfig.BASE_URL_TAMKEEN}${ApiConfig.ENDPOINTS.TESTIMONIAL}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {
                    if (!res.ok) {
                        return res.json().then((serverError) => { throw new Error(serverError.message) })
                    } else {
                        return res.json()
                    }
                })
        }
}