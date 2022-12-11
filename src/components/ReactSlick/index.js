import {useState, useEffect} from 'react'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import LoadingView from '../LoadingView'
import './index.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 7,
  slidesToScroll: 1,
}

const loadingStatus = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const ReactSlick = () => {
  const [storiesList, setStoriesList] = useState([])
  const [loading, setLoading] = useState(loadingStatus.initial)
  const jwtToken = Cookies.get('jwt_token')

  const getStoriesList = async () => {
    setLoading(loadingStatus.progress)
    const url = 'https://apis.ccbp.in/insta-share/stories'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const updatedData = data.users_stories.map(item => ({
        userId: item.user_id,
        userName: item.user_name,
        storyUrl: item.story_url,
      }))
      setStoriesList(updatedData)
      setLoading(loadingStatus.success)
    } else {
      setLoading(loadingStatus.failure)
    }
  }

  useEffect(() => {
    getStoriesList()
  }, [])

  const onClickTryAgain = () => {
    getStoriesList()
  }

  const renderFailureView = () => (
    <div className="stories-failure-container">
      <img
        src="https://res.cloudinary.com/dqwufvygi/image/upload/v1666112932/Instagram%20Clone/Iconsomething-went-wrong_u66nvd.svg"
        alt="failure view"
        className="stories-failure-icon"
      />
      <p className="stories-failure-description">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="stories-try-again-button"
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
          <div className="slick-container">
            <Slider {...settings}>
              {storiesList.map(eachLogo => {
                const {userId, storyUrl, userName} = eachLogo
                return (
                  <div className="slick-item" key={userId}>
                    <img
                      className="logo-image"
                      src={storyUrl}
                      alt="user story"
                    />
                    <p className="story-username">{userName}</p>
                  </div>
                )
              })}
            </Slider>
          </div>
        )
      case loadingStatus.failure:
        return renderFailureView()
      default:
        return null
    }
  }

  return <div className="slick-main-container">{loadingBasedRender()}</div>
}

export default ReactSlick
