import { Route, Switch } from 'react-router-dom'
import { useState } from 'react'
import Login from './components/Login'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import TabContext from './context/TabContext'

import './App.css'

const App = () => {
    const [activeTab, setActiveTab] = useState('HOME')

    const changeActiveTab = id => {
        setActiveTab(id)
    }

    return (
        <TabContext.Provider value={{ activeTab, changeActiveTab }}>
            <Switch>
                <Route exact path="/login" component={Login} />
                <ProtectedRoute exact path="/" component={Home} />
                <ProtectedRoute exact path="/my-profile" component={MyProfile} />
            </Switch>
        </TabContext.Provider>
    )
}

export default App
