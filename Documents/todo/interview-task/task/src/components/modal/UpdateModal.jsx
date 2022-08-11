import React, { useContext, useState } from 'react'
import styled from "styled-components";
import axios from 'axios'

export default function UpdateModal({
    isUpdateModal,
    getId,
    setUpdateModal,
    handleUpdateModal,
    setTitle,
    setRmEmail,
    setRmPhone,
    rmphone,
    rmemail,
    title,
}) {
    const [submit, setSubmit] = useState(false)
    const [error, setError] = useState("")
    const [errorMessage, setErrorMessage] = useState()
    const phoneValidation = (e) => {
        setRmPhone(e.target.value)
        if (rmphone?.length > 9) {
            setErrorMessage("Please enter a 10 digit number")
        } else {
            setErrorMessage("")
        }
    }
    //---------------Prevent 'e' from input type number------------------------------
    var inputBox = document.getElementById("input-phone");

    var invalidChars = [
        "-",
        "+",
        "e",
    ];
    inputBox?.addEventListener("keydown", function (e) {
        if (invalidChars.includes(e.key)) {
            e.preventDefault();
        }
    });
    //-------------------------------------------------------------------------------
    const assignHandler = () => {
        rmphone && rmemail && title &&
            axios
                .put(`https://62f4b574535c0c50e7609290.mockapi.io/user/users/${getId}`, {
                    name: title,
                    email: rmemail,
                    phone: rmphone,
                },
                )
                .then(() => {
                    setUpdateModal(false)
                })
                .catch((error) => {
                    console.log(error);

                });
    }
    setTimeout(() => {
        setErrorMessage("");
        setError("")
    }, 10000);
    //----------------------------Email validation-----------------------------------
    const handleMail = (e) => {
        let str = e.target.value;

        if (
            /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(str) &&
            str.includes(".com")
        ) {
            setError("");
        } else {
            setError("Enter a valid mail id");
        }
    };
    return (

        <>
            <MainContainer>
                {isUpdateModal ? (
                    <Overlay onClick={() => handleUpdateModal()}></Overlay>
                ) : (
                    ""
                )}
                <BackContainer style={{ transform: isUpdateModal && "scale(1,1)" }}>
                    <Modal>
                        <Container>
                            <TopContainer>
                                <CoverText>Update</CoverText>
                                <ImageContainer onClick={() => handleUpdateModal()}>
                                    <img src="https://stikcon-website.sgp1.digitaloceanspaces.com/stikcon-admin-images/close.svg" alt="Cross" />
                                </ImageContainer>
                            </TopContainer>
                            <Cover>
                                <Label>Name</Label>
                                <TextArea value={title} onChange={(e) => { setTitle(e.target.value); setSubmit(false); setError('') }} />
                                <Error>{submit && !title && "This field is required"} </Error>
                            </Cover>
                            <Cover>
                                <Label>Email</Label>
                                <TextArea value={rmemail} onChange={(e) => { setRmEmail(e.target.value); handleMail(e); setSubmit(false) }} />

                                <Error>{error === "email - Enter a valid email address." ? setError("Enter a valid email address") : ""}{error}{submit && !rmemail && "This field is required"} </Error>
                            </Cover>
                            <Cover>
                                <Label>Phone</Label>
                                <TextArea id="input-phone" type="number" value={rmphone} onChange={(e) => { phoneValidation(e) }} />
                                <Error>{errorMessage}{submit && !rmphone && "This field is required"}</Error>
                            </Cover>
                            <CoverSubmit>
                                <button class="button-55" role="button" onClick={handleUpdateModal}>Cancel</button>
                                <button class="button-55" role="button" onClick={() => { assignHandler(); setSubmit(true); }}>Save</button>
                            </CoverSubmit>
                        </Container>
                    </Modal>
                </BackContainer>
            </MainContainer>
        </>
    );
}
const BackContainer = styled.div`
    position:fixed;
    transition:0.3s;
    transform:scale(0,0);
    width:100%;
    height:113vh;
    z-index:1000;
    left:0;
    top:0px;
`;
const Overlay = styled.div`
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(2px);
    position: fixed;
    z-index: 10;
    left: 0;
    top: 0px;
    width: 100%;
    min-height: 100vh;
    max-height: 100vh;
    filter: blur(1px);
`;
const Modal = styled.div`
    width: 90%;
    max-width: 580px;
    margin: 0 auto;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    transition: 0.5s;
    z-index: 101;
    border-radius: 5px;
    background: #fff;
    @media all and (max-width:1380px){
        left:58%;
    } 
`;
const MainContainer = styled.div``;
const CoverText = styled.h3`
    margin-bottom:25px !important;
`;
const Container = styled.div`
    padding: 30px;
`;
const TopContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;
    align-items: baseline;
    border-bottom:1px solid #BEBEBE;
`;
const ImageContainer = styled.div`
    width: 20px;
    cursor: pointer;
    & img{
        display: block;
        width: 100%;
    }
`;
const Cover = styled.div`
    margin-bottom: 20px;
    overflow: hidden;

`;
const Label = styled.div`
    color: #929292;
    margin-bottom: 5px;
`;
const TextArea = styled.input`
    resize: none;
    border: 1px solid #BEBEBE;
    width: 100%;
    background:#f1f1f1;
    padding:15px;
    outline: unset;
    outline-color: #0884df !important;
    &:hover{
		border: 1px solid #0883e0;
	}
`;
const CoverSubmit = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top:40px;
    button{
        margin-right: 20px;
        height: 35px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;
const Error = styled.p`
    color:red;
    font-size:12px;
    height:20px;
`;