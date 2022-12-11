import {useContext, useState} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FaSearch} from 'react-icons/fa'
import TabContext from '../../context/TabContext'
import './index.css'

const Header = props => {
  const [searchInput, setSearchInput] = useState('')
  const {history, match} = props
  const {changeSearch, getSearchResults} = useContext(TabContext)

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const onChangeSearchInput = event => {
    setSearchInput(event.target.value)
  }

  const onClickSearchButton = async () => {
    history.push('/')
    getSearchResults(searchInput)
  }

  const renderNavItems = () => (
    <nav className="nav-container">
      <ul className="nav-items-list">
        <Link to="/" className="nav-item">
          <li
            className={match.path === '/' ? 'active' : null}
            onClick={() => {
              changeSearch(false)
            }}
          >
            Home
          </li>
        </Link>
        <Link to="/my-profile" className="nav-item">
          <li className={match.path === '/my-profile' ? 'active' : null}>
            Profile
          </li>
        </Link>
      </ul>
    </nav>
  )

  const renderSearchContainer = () => (
    <div className="search-container">
      <input
        type="search"
        className="search-input"
        placeholder="Search Caption"
        onChange={onChangeSearchInput}
        value={searchInput}
      />
      <button
        type="button"
        className="search-button"
        onClick={onClickSearchButton}
      >
        <FaSearch />
      </button>
    </div>
  )

  const renderLogOutButton = () => (
    <div>
      <button type="button" className="logout-button" onClick={onClickLogout}>
        Logout
      </button>
    </div>
  )

  return (
    <div className="main-header-container">
      <div className="sub-header-container">
        <div className="header-logo-container">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dqwufvygi/image/upload/v1665299514/Instagram%20Clone/GroupInsta-share_dwov61.svg"
              alt="website logo"
              className="header-logo"
            />
          </Link>
          <h1 className="header-heading">Insta Share</h1>
        </div>
        <div className="header-right-container">
          {renderSearchContainer()}
          {renderNavItems()}
          {renderLogOutButton()}
        </div>
      </div>
      <hr className="line" />
    </div>
  )
}

export default withRouter(Header)
