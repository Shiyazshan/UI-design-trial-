import React from 'react'
import AppRouter from './AppRouter'
import { Routes, Route } from 'react-router-dom'

function MainRouter() {
    return (
        <Routes>
            <Route path="/*" element={<AppRouter />} />
        </Routes>
    )
}

export default MainRouter