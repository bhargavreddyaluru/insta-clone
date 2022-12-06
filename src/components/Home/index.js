import {useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import ReactSlick from '../ReactSlick'
import LoadingView from '../LoadingView'
import PostItem from '../PostItem'
import './index.css'

const loadingStatus = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const Home = () => {
  const [postsList, setPostsList] = useState([])
  const [loading, setLoading] = useState(loadingStatus.initial)
  const jwtToken = Cookies.get('jwt_token')

  useEffect(() => {
    const getPostsList = async () => {
      setLoading(loadingStatus.progress)
      const url = 'https://apis.ccbp.in/insta-share/posts'
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
      const response = await fetch(url, options)
      const data = await response.json()
      if (response.ok) {
        const updatedData = data.posts.map(item => ({
          postId: item.post_id,
          userId: item.user_id,
          userName: item.user_name,
          profilePic: item.profile_pic,
          postDetails: item.post_details,
          likesCount: item.likes_count,
          comments: item.comments,
          createdAt: item.created_at,
        }))
        setPostsList(updatedData)
        setLoading(loadingStatus.success)
      }
    }
    getPostsList()
  }, [jwtToken])

  const loadingBasedRender = () => {
    switch (loading) {
      case loadingStatus.progress:
        return <LoadingView />
      case loadingStatus.success:
        return (
          <ul className="posts-list">
            {postsList.map(item => (
              <PostItem key={item.postId} details={item} />
            ))}
          </ul>
        )
      default:
        return null
    }
  }

  return (
    <div className="home-container">
      <Header />
      <ReactSlick />
      <div className="posts-container">{loadingBasedRender()}</div>
    </div>
  )
}

export default Home
