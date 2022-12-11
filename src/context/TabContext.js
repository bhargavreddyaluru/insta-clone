import React from 'react'

const TabContext = React.createContext({
  searchResults: [],
  changeSearchResults: () => {},
  isSearching: 'INITIAL',
  changeSearchingStatus: () => {},
  isSearch: false,
  changeSearch: () => {},
  getSearchResults: () => {},
  searchInput: '',
  changeSearchInput: () => {},
})

export default TabContext
