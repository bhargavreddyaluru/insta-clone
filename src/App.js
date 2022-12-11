import {Route, Switch} from 'react-router-dom'
import {useState} from 'react'
import Cookies from 'js-cookie'
import Login from './components/Login'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import TabContext from './context/TabContext'
import MyProfile from './components/MyProfile'
import UserProfile from './components/UserProfile'
import NotFound from './components/NotFound'

import './App.css'

const loadingStatus = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const App = () => {
  const [searchResults, setSearchResults] = useState([])
  const [isSearch, setSearch] = useState(false)
  const [isSearching, setSearchingStatus] = useState('INITIAL')
  const jwtToken = Cookies.get('jwt_token')
  const [searchInput, setSearchInput] = useState('')

  const changeSearchInput = val => {
    setSearchInput(val)
  }

  const changeSearchingStatus = val => {
    setSearchingStatus(val)
  }

  const changeSearchResults = data => {
    setSearchResults(data)
  }

  const changeSearch = val => {
    setSearch(val)
  }

  const getSearchResults = async input => {
    changeSearch(true)
    changeSearchingStatus(loadingStatus.progress)
    const url = `https://apis.ccbp.in/insta-share/posts?search=${input}`
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
      changeSearchResults(updatedData)
      changeSearchingStatus(loadingStatus.success)
    } else {
      changeSearchingStatus(loadingStatus.failure)
    }
  }

  return (
    <TabContext.Provider
      value={{
        searchResults,
        changeSearchResults,
        isSearch,
        changeSearch,
        isSearching,
        changeSearchingStatus,
        getSearchResults,
        searchInput,
        changeSearchInput,
      }}
    >
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/my-profile" component={MyProfile} />
        <ProtectedRoute exact path="/users/:id" component={UserProfile} />
        <Route component={NotFound} />
      </Switch>
    </TabContext.Provider>
  )
}

export default App
