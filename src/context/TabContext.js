import React from 'react'

const TabContext = React.createContext({
  activeTab: 'HOME',
  changeActiveTab: () => {},
})

export default TabContext
