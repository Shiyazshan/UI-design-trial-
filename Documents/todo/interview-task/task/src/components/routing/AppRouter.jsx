import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CreateModal from '../modal/CreateModal'
import UpdateModal from '../modal/UpdateModal'
import LandingPage from '../screens/LandingPage'

function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/edit" element={<UpdateModal />} />
            <Route path="/create" element={<CreateModal />} />
        </Routes>
    )
}

export default AppRouter