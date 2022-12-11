import {useEffect, useState, useContext} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import ReactSlick from '../ReactSlick'
import LoadingView from '../LoadingView'
import PostItem from '../PostItem'
import TabContext from '../../context/TabContext'
import SearchResults from '../SearchResults'
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
  const {searchResults, isSearch, isSearching} = useContext(TabContext)

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
    } else {
      setLoading(loadingStatus.failure)
    }
  }

  useEffect(() => {
    getPostsList()
  }, [])

  const onClickTryAgain = () => {
    getPostsList()
  }

  const renderFailureView = () => (
    <div className="posts-failure-container">
      <img
        src="https://res.cloudinary.com/dqwufvygi/image/upload/v1666112932/Instagram%20Clone/Iconsomething-went-wrong_u66nvd.svg"
        alt="failure view"
        className="posts-failure-icon"
      />
      <p className="posts-failure-description">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="posts-try-again-button"
        onClick={onClickTryAgain}
      >
        Try again
      </button>
    </div>
  )

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
      case loadingStatus.failure:
        return renderFailureView()
      default:
        return null
    }
  }

  return (
    <div className="home-container">
      <Header />
      {isSearch ? (
        <SearchResults details={searchResults} searchingStatus={isSearching} />
      ) : (
        <>
          <ReactSlick />
          <div className="posts-container">{loadingBasedRender()}</div>
        </>
      )}
    </div>
  )
}

export default Home
