import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import edit from '../../components/assets/images/edit-icon.png'
import UpdateModal from '../modal/UpdateModal';

function StudentList({ isBox, isUpdateModal, setUpdateModal }) {
    const [getDatas, setGetDatas] = useState([])
    const [getId, setGetId] = useState()
    const [title, setTitle] = useState()
    const [rmemail, setRmEmail] = useState()
    const [rmphone, setRmPhone] = useState()

    const handleUpdateModal = () => {
        setUpdateModal(!isUpdateModal)
    }
    useEffect(() => {
        axios
            .get('https://62f4b574535c0c50e7609290.mockapi.io/user/users',)
            .then((response) => {
                setGetDatas(response.data)
            })
            .catch((error) => {
                // setError(true)
            });
    }, [isBox, isUpdateModal]);
    return (
        <>
            <Container>
                <table class="wp-table">
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                    </tr>
                    {
                        getDatas.map((item) => (
                            <tr onClick={() => setGetId(item.id)}>
                                <td>
                                    {item.name}
                                </td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                                <Image onClick={() => {
                                    setUpdateModal(true);
                                    setTitle(item.name);
                                    setRmEmail(item.email);
                                    setRmPhone(item.phone)
                                }}>
                                    <img src={edit} alt="image" />
                                </Image>

                            </tr>
                        ))
                    }
                </table>
                <UpdateModal
                    isUpdateModal={isUpdateModal}
                    getId={getId}
                    setUpdateModal={setUpdateModal}
                    handleUpdateModal={handleUpdateModal}
                    setTitle={setTitle}
                    setRmEmail={setRmEmail}
                    setRmPhone={setRmPhone}
                    rmphone={rmphone}
                    rmemail={rmemail}
                    title={title}
                />
            </Container>
        </>
    )
}

export default StudentList

const Container = styled.div`
    padding: 20px 50px;
`;
const Image = styled.div`
    width: 25px;
    cursor: pointer;
    img{
        display: block;
        width: 100%;
    }
`;