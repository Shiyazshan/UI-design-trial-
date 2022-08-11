import React, { useContext, useState } from 'react'
import styled from "styled-components";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export default function CreateModal({ isBox, setBox, handleCategoryModal }) {
    const [title, setTitle] = useState()
    const [submit, setSubmit] = useState(false)
    const [error, setError] = useState("")
    const [rmemail, setRmEmail] = useState()
    const [rmphone, setRmPhone] = useState()
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
                .post("https://62f4b574535c0c50e7609290.mockapi.io/user/users", {
                    name: title,
                    email: rmemail,
                    phone: rmphone,
                },
                )
                .then(() => {
                    navigate("/")
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
    const navigate = useNavigate()
    return (

        <>
            <Main>
                <Container>
                    <TopContainer>
                        <CoverText>New Student</CoverText>
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
                        <button class="button-55" role="button" onClick={() => navigate("/")}>Cancel</button>
                        <button class="button-55" role="button" onClick={() => { assignHandler(); setSubmit(true); }}>Save</button>
                    </CoverSubmit>
                </Container>
            </Main>
        </>
    );
}
const Main = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;
const CoverText = styled.h3`
    margin-bottom:25px !important;
    color: #fff;
`;
const Container = styled.div`
    padding: 30px;
    width: 40%;
    background:#5B6467;
`;
const TopContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;
    align-items: baseline;
    border-bottom:1px solid #BEBEBE;
`;
const Cover = styled.div`
    margin-bottom: 20px;
    overflow: hidden;

`;
const Label = styled.div`
        color: #fff;
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