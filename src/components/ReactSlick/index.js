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

  useEffect(() => {
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
      }
    }
    getStoriesList()
  }, [jwtToken])

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
                      alt="company logo"
                    />
                    <p className="story-username">{userName}</p>
                  </div>
                )
              })}
            </Slider>
          </div>
        )
      default:
        return null
    }
  }

  return <div className="slick-main-container">{loadingBasedRender()}</div>
}

export default ReactSlick
