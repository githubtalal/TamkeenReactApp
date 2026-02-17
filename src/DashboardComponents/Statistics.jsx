import React, { useEffect, useState } from 'react'
import { ArticlesServices } from '../Services/ArticlesServices'
import { UserProfileServices } from '../Services/UserProfileServices'
import { CategoriesServices } from '../Services/CategoriesServices'
import { HomePageServices } from '../Services/HomePageServices'
import { AboutUsServices } from '../Services/AboutUsServices'
import Loading from '../Components/Loading'

const Statistics = ({ currentPage }) => {
    const [nO_Articles, setNoArticles] = useState()
    const [nO_Users, setNoUsers] = useState()
    const [nO_Testimonials, setNoTestimonials] = useState()

    const [isNoArticlesLoading, setNoArticlesLoading] = useState(false)
    const [isNoUsersLoading, setNoUsersLoading] = useState(false)
    const [isNoBlogsLoading, setNoBlogsLoading] = useState(false)
    const [isNoTestimonialsLoading, setNoTestimonialsLoading] = useState(false)

    const userInfo = JSON.parse(localStorage.getItem('theUserData'))

    const loadNoArticles = () => {
        setNoArticlesLoading(true)
        ArticlesServices.getUserArticles({
            'credentials': userInfo.ps
        })
            .then(data => {
                setNoArticles(data.pager.total_items)
                setNoArticlesLoading(false)
            })
            .catch(error => console.log(error))
            .finally(() => console.log('Done total of articles'))
    }

    const loadNoUsers = () => {
        setNoUsersLoading(true)
        UserProfileServices.getAllUsers({
            'credentials': userInfo.ps
        })
            .then(data => {
                setNoUsers(data.pager.total_items)
                setNoUsersLoading(false)
            })
            .catch(error => console.log(error))
            .finally(() => console.log('Done total of users'))
    }

    const loadNoBlogs = () => {
        setNoBlogsLoading(true)
        ArticlesServices.getBlogs({
            "credentials": userInfo.ps
        })
            .then(data => {
                setNoBlogs(data.pager.total_items)
                setNoBlogsLoading(false)
            })
            .catch(error => console.log(error))
            .finally(() => console.log('Done total of Blogs'))
    }

    const loadNotestimonials = () => {
        setNoTestimonialsLoading(true)
        AboutUsServices.getTopTestimonials()
            .then(data => {
                setNoTestimonials(data.length)
                setNoTestimonialsLoading(false)
            })
            .catch(error => console.log(error))
            .finally(() => console.log('Done total of testimonials'))
    }

    useEffect(() => {
        loadNoArticles()
        loadNoUsers()
        loadNotestimonials()
    }, [])

    return (
        <div className='statistics d-flex align-items-center justify-content-between'>
            <div className='nO_Users rounded p-3 text-center' data-aos="zoom-in" data-aos-delay="1000" data-aos-duration="1000" style={{ width: 'calc(100% / 3)', backgroundColor: `${currentPage.includes('usersList') ? "#49369d7d" : "#9f93d74a"}` }}>
                <h3>Total Users</h3>
                {
                    (isNoUsersLoading) ?
                        <Loading />
                        :
                        <p className='mt-2'>{nO_Users}</p>
                }

            </div>
            <div className='nO_Articles rounded p-3 text-center' data-aos="zoom-in" data-aos-delay="1000" data-aos-duration="1000" style={{ width: 'calc(100% / 3)', backgroundColor: `${currentPage.includes('articlesList') ? "#49369d7d" : "#9f93d74a"}` }}>
                <h3>Total Articles</h3>
                {
                    (isNoArticlesLoading) ?
                        <Loading />
                        :
                        <p className='mt-2'>{nO_Articles}</p>
                }

            </div>
            <div className='nO_Testimonials rounded p-3 text-center' data-aos="zoom-in" data-aos-delay="1000" data-aos-duration="1000" style={{ width: 'calc(100% / 3)', backgroundColor: `${currentPage.includes('testimonialsList') ? "#49369d7d" : "#9f93d74a"}` }}>
                <h3>Total Testimonials</h3>
                {
                    (isNoTestimonialsLoading) ?
                        <Loading />
                        :
                        <p className='mt-2'>{nO_Testimonials}</p>
                }

            </div>
        </div>
    )
}

export default Statistics
