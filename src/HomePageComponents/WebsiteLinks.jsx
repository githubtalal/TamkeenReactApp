import { useEffect, useState } from "react"
import { Container } from "react-bootstrap"
import { HomePageServices } from "../Services/HomePageServices"
import Loading from "../Components/Loading"

const WebsiteLinks = () => {

    const [websiteLinks, setWebsiteLinks] = useState([])
    const [isLoading, setLoading] = useState(false)

    function loadWebsiteLinks() {
        setLoading(true)
        setWebsiteLinks(HomePageServices.getWebsiteLinks)
        setLoading(false)
    }

    useEffect(() => {
        loadWebsiteLinks()
    }, [])

    return (
        (isLoading) ?
            <Loading />
            :
            <div className='websites-links d-flex justify-content-around align-items-center'>

                {
                    websiteLinks.map(websiteLink => (
                        <div className="website-link d-flex justify-content-center align-items-center">
                            <img src={websiteLink.icon} alt="" />
                            <img src={websiteLink.text} alt='' />
                            {websiteLink.textColor ? (<span style={{ color: `${websiteLink.textColor}`, fontWeight: '700', fontSize: '40px', verticalAlign: 'center', marginInlineStart: '6px' }}>{websiteLink.text}</span>) : ''}
                        </div>
                    ))
                }

            </div>

    )
}

export default WebsiteLinks