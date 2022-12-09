import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import LoadingView from '../LoadingView'
import './index.css'


const loadingStatus = {
    initial: 'INITIAL',
    progress: 'PROGRESS',
    success: 'SUCCESS',
    failure: 'FAILURE',
}

const MyProfile = () => {
    const [myDetails, setMyDetails] = useState({})
    const [loading, setLoading] = useState(loadingStatus.initial)
    const jwtToken = Cookies.get('jwt_token')

    useEffect(() => {
        const getMyProfileDetails = async () => {
            setLoading(loadingStatus.progress)
            const url = 'https://apis.ccbp.in/insta-share/my-profile'
            const options = {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            }
            const response = await fetch(url, options)
            const data = await response.json()
            if (response.ok) {
                const { profile } = data
                const updatedData = {
                    id: profile.id,
                    userId: profile.user_id,
                    userName: profile.user_name,
                    profilePic: profile.profile_pic,
                    followersCount: profile.followers_count,
                    followingCount: profile.following_count,
                    userBio: profile.user_bio,
                    posts: profile.posts,
                }
                setMyDetails(updatedData)
                console.log(updatedData)
                setLoading(loadingStatus.success)
            }
        }
        getMyProfileDetails()
    }, [])

    const loadingBasedRender = () => {
        switch (loading) {
            case loadingStatus.progress:
                return <LoadingView />
            case loadingStatus.success:
                return <ul className="posts-list">Ll</ul>
            default:
                return null
        }
    }

    return (
        <div className="my-profile-container">
            <Header />
            {loadingBasedRender()}
        </div>
    )
}

export default MyProfile
