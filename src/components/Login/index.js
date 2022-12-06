import {Redirect} from 'react-router-dom'
import {useState} from 'react'
import Cookies from 'js-cookie'
import './index.css'

const Login = props => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const jwtToken = Cookies.get('jwt_token')

  const onSubmitForm = async event => {
    event.preventDefault()
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {username: userName, password}
    const options = {method: 'POST', body: JSON.stringify(userDetails)}
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      Cookies.set('jwt_token', data.jwt_token, {expires: 30})
      setUserName('')
      setPassword('')
      const {history} = props
      history.replace('/')
    } else {
      setError(data.error_msg)
    }
  }

  if (jwtToken !== undefined) {
    return <Redirect to="/" />
  }

  return (
    <div className="main-container">
      <div className="img-container">
        <img
          src="https://res.cloudinary.com/dqwufvygi/image/upload/v1665300077/Instagram%20Clone/Layer_2login-page-image_xy0dqq.svg"
          alt="website login"
          className="login-image"
        />
      </div>
      <div className="details-container">
        <form className="login-form" onSubmit={onSubmitForm}>
          <div className="form-logo-container">
            <img
              src="https://res.cloudinary.com/dqwufvygi/image/upload/v1665299514/Instagram%20Clone/GroupInsta-share_dwov61.svg"
              alt="website logo"
              className="login-logo"
            />
            <h1 className="form-heading">Insta Share</h1>
          </div>
          <div className="input-container">
            <label htmlFor="username" className="label-text">
              USERNAME
            </label>
            <input
              id="username"
              type="text"
              placeholder="Username"
              className="input-field"
              value={userName}
              onChange={event => {
                setUserName(event.target.value)
              }}
            />
          </div>
          <div className="input-container">
            <label htmlFor="password" className="label-text">
              PASSWORD
            </label>
            <input
              id="password"
              type="password"
              placeholder="Username"
              className="input-field"
              value={password}
              onChange={event => {
                setPassword(event.target.value)
              }}
            />
          </div>
          {error !== '' && <p className="error-text">{error}</p>}
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
