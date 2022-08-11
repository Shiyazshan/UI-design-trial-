import React, { useState } from 'react'
import styled from 'styled-components';
import StudentList from '../includes/StudentList'
import { useNavigate } from "react-router-dom";

function LandingPage() {
    const [isBox, setBox] = useState(false)
    const [isUpdateModal, setUpdateModal] = useState(false)

    const navigate = useNavigate()
    return (
        <>
            <MainContainer>
                <h1>Student datas</h1>
                <button onClick={() => { setBox(true); navigate("/create") }} class="button-55" role="button">Create</button>
            </MainContainer>
            <StudentList isUpdateModal={isUpdateModal} setUpdateModal={setUpdateModal} isBox={isBox} />
        </>
    )
}

export default LandingPage

const MainContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 50px;
`;