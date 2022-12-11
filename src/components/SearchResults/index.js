import {useContext, useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import PostItem from '../PostItem'
import LoadingView from '../LoadingView'
import SomethingWentWrong from '../SomethingWentWrong'
import TabContext from '../../context/TabContext'
import './index.css'

const loadingStatus = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const SearchResults = props => {
  const {details, searchingStatus} = props
  const {getSearchResults} = useContext(TabContext)

  const renderNoResultsView = () => (
    <div className="no-results-container">
      <img
        src="https://res.cloudinary.com/dqwufvygi/image/upload/v1665925315/Instagram%20Clone/Groupno_results-image_z3wnqg.svg"
        alt="search not found"
        className="no-results-img"
      />
      <h1 className="no-results-heading">Search Not Found</h1>
      <p className="no-results-description">
        Try different keyword or search again
      </p>
    </div>
  )

  const loadingBasedRender = () => {
    switch (searchingStatus) {
      case loadingStatus.progress:
        return <LoadingView />
      case loadingStatus.success:
        return (
          <>
            {details.length === 0 ? (
              renderNoResultsView()
            ) : (
              <>
                <h1 className="search-results-heading">Search Results</h1>
                <div className="search-results-container">
                  <ul className="search-results-list">
                    {details.map(item => (
                      <PostItem details={item} key={item.postId} />
                    ))}
                  </ul>
                </div>
              </>
            )}
          </>
        )
      case loadingStatus.failure:
        return <SomethingWentWrong retryFunction={getSearchResults} />
      default:
        return null
    }
  }

  return <div className="search-results">{loadingBasedRender()}</div>
}

export default SearchResults
