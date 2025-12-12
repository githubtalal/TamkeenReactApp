import tablet from '../assets/tablet.jpg'
import plant from '../assets/plant.jpg'
import buisenessMan from '../assets/buisenessMan.jpg'
import feather from '../assets/feather.png'
import longVector from '../assets/longVector.png'
import shortVector from '../assets/shortVector.png'
import writer1 from '../assets/writer1.jpg'
import writer2 from '../assets/writer2.jpg'
import writer3 from '../assets/writer3.jpg'
import jobCoverImg3 from '../assets/jobCoverImg3.png'
import jobCoverImg1 from '../assets/jobCoverImg1.png'
import lArticleLogo4 from '../assets/lArticleLogo4.png'
import youtubeIcon from '../assets/youtubeIcon.png'
import youtubeText from '../assets/youtubeText.png'
import verizonIcon from '../assets/nike.png'
import verizonText from '../assets/verizon.png'
import slackIcon from '../assets/slackIcon.png'
import googleIcon from '../assets/google.png'

import { ApiConfig } from '../API/ApiConfig'

export const HomePageServices = {
    getArticlesIntro: [
        {
            title: 'Articula – Your Gateway to Premium Articles',
            description: 'Discover high-quality articles written by experts and creators in various scientific and technical fields.Join a community of readers and writers and explore exclusive, knowledge-driven content.',
            btn1: 'Start Reading',
            btn2: 'Create Account',
            img1: tablet,
            img2: plant,
            img3: buisenessMan,
            fthr: feather,
            lVector: longVector,
            sVector: shortVector
        },
        {
            title: 'Articula – Your Gateway to Premium Articles',
            description: 'Discover high-quality articles written by experts and creators in various scientific and technical fields.Join a community of readers and writers and explore exclusive, knowledge-driven content.',
            btn1: 'Start Reading',
            btn2: 'Create Account',
            img1: tablet,
            img2: plant,
            img3: buisenessMan,
            fthr: feather,
            lVector: longVector,
            sVector: shortVector
        },
        {
            title: 'Articula – Your Gateway to Premium Articles',
            description: 'Discover high-quality articles written by experts and creators in various scientific and technical fields.Join a community of readers and writers and explore exclusive, knowledge-driven content.',
            btn1: 'Start Reading',
            btn2: 'Create Account',
            img1: tablet,
            img2: plant,
            img3: buisenessMan,
            fthr: feather,
            lVector: longVector,
            sVector: shortVector
        },
        {
            title: 'Articula – Your Gateway to Premium Articles',
            description: 'Discover high-quality articles written by experts and creators in various scientific and technical fields.Join a community of readers and writers and explore exclusive, knowledge-driven content.',
            btn1: 'Start Reading',
            btn2: 'Create Account',
            img1: tablet,
            img2: plant,
            img3: buisenessMan,
            fthr: feather,
            lVector: longVector,
            sVector: shortVector
        }
    ],
    getLatestArticles: function (params = {}) {

        const userId = params.userId
        const credentials = params.credentials

        return fetch(`${ApiConfig.BASE_URL_TAMKEEN}${ApiConfig.ENDPOINTS.ARTICLES}?orderBy=created&limit=5&items_per_page=5&sort=desc`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Basic ' + `${credentials}`
            }
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then((serverError) => { throw new Error(serverError.message) })
                } else {
                    return res.json()
                }
            })
    },
    getArticleCategories: function () {

        return fetch(`${ApiConfig.BASE_URL_TAMKEEN}${ApiConfig.ENDPOINTS.ARTICLE_CATEGORY}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
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
    getTopWriters: [
        {
            wImg: writer1,
            wName: 'Mohammad alhaj',
            articleTitle: '2021 Complete Python Bootcamp From Zero to Hero...',
            articleRate: '4.7',
            nO_Articles: 13
        },
        {
            wImg: writer2,
            wName: 'Mohammad alhaj',
            articleTitle: '2021 Complete Python Bootcamp From Zero to Hero...',
            articleRate: '4.7',
            nO_Articles: 13
        },
        {
            wImg: writer3,
            wName: 'Mohammad alhaj',
            articleTitle: '2021 Complete Python Bootcamp From Zero to Hero...',
            articleRate: '4.7',
            nO_Articles: 13
        },
        {
            wImg: writer2,
            wName: 'Mohammad alhaj',
            articleTitle: '2021 Complete Python Bootcamp From Zero to Hero...',
            articleRate: '4.7',
            nO_Articles: 13
        },
        {
            wImg: writer1,
            wName: 'Mohammad alhaj',
            articleTitle: '2021 Complete Python Bootcamp From Zero to Hero...',
            articleRate: '4.7',
            nO_Articles: 13
        },
        {
            wImg: writer2,
            wName: 'Mohammad alhaj',
            articleTitle: '2021 Complete Python Bootcamp From Zero to Hero...',
            articleRate: '4.7',
            nO_Articles: 13
        },
    ],
    getJobApprtunities: [
        [
            {
                salary: '$300',
                jobCat: 'FEATURED',
                jobTitle: 'System Analysis',
                yearOfExperience: 2,
                jobCover: jobCoverImg3
            },
            {
                salary: '$300',
                jobCat: 'FEATURED',
                jobTitle: 'System Analysis',
                yearOfExperience: 2,
                jobCover: jobCoverImg1
            },
            {
                salary: '$300',
                jobCat: 'FEATURED',
                jobTitle: 'System Analysis',
                yearOfExperience: 2,
                jobCover: lArticleLogo4
            },
            {
                salary: '$300',
                jobCat: 'FEATURED',
                jobTitle: 'System Analysis',
                yearOfExperience: 2,
                jobCover: jobCoverImg3
            }
        ],
        [
            {
                salary: '$300',
                jobCat: 'FEATURED',
                jobTitle: 'System Analysis',
                yearOfExperience: 2,
                jobCover: jobCoverImg1
            },
            {
                salary: '$300',
                jobCat: 'FEATURED',
                jobTitle: 'System Analysis',
                yearOfExperience: 2,
                jobCover: lArticleLogo4
            }
        ]
    ],
    getWebsiteLinks: [
        {
            icon: '',
            text: 'AMG.CO',
            textColor: '#000000'
        },
        {
            icon: youtubeIcon,
            text: youtubeText,
            textColor: ''
        },
        {
            icon: verizonIcon,
            text: verizonText,
            textColor: ''
        },
        {
            icon: slackIcon,
            text: 'slack',
            textColor: '#000000'
        },
        {
            icon: googleIcon,
            text: '',
            textColor: ''
        },
        {
            icon: '',
            text: 'Lenovo',
            textColor: '#E60012'
        }
    ]
}