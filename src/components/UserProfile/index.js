import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import LoadingView from '../LoadingView'
import ProfileComponent from '../ProfileComponent'
import SomethingWentWrong from '../SomethingWentWrong'
import './index.css'

const loadingStatus = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const UserProfile = props => {
  const [myDetails, setMyDetails] = useState({})
  const [loading, setLoading] = useState(loadingStatus.initial)
  const jwtToken = Cookies.get('jwt_token')
  const {match} = props
  const {params} = match

  const getMyProfileDetails = async () => {
    setLoading(loadingStatus.progress)
    const url = `https://apis.ccbp.in/insta-share/users/${params.id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      console.log(data)
      const profile = data.user_details
      const updatedData = {
        id: profile.id,
        userId: profile.user_id,
        userName: profile.user_name,
        profilePic: profile.profile_pic,
        followersCount: profile.followers_count,
        followingCount: profile.following_count,
        userBio: profile.user_bio,
        posts: profile.posts,
        postsCount: profile.posts_count,
        stories: profile.stories,
      }
      setMyDetails(updatedData)
      setLoading(loadingStatus.success)
    } else {
      setLoading(loadingStatus.failure)
    }
  }

  useEffect(() => {
    getMyProfileDetails()
  }, [])

  const loadingBasedRender = () => {
    switch (loading) {
      case loadingStatus.progress:
        return <LoadingView />
      case loadingStatus.success:
        return <ProfileComponent details={myDetails} isUser />
      case loadingStatus.failure:
        return <SomethingWentWrong retryFunction={getMyProfileDetails} />
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

export default UserProfile
