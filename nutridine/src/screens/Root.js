import React, { useState, useEffect } from 'react';
import { AuthForm } from '../components/AuthForm';
import { UserInfoCollectionForm } from './authentication/UserInfoCollectionForm';
import { useToast, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { validatePassword, signIn, register } from '../hooks/AuthService/authService';
import { useAuth } from '../contexts/AuthContext';

export const Root = () => {
    const { currentUser } = useAuth();

    const [regEmail, setRegEmail] = useState("");
    const [regPassword, setRegPassword] = useState("");

    const [isLogin, setIsLogin] = useState(true);
    const [isInvalid, setIsInvalid] = useState([false, false]);
    const [displayUserInfoCollectionForm, setDisplayUserInfoCollectionForm] = useState(false);

    const toast = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            navigate("/home");
        }
    }, [currentUser, navigate]);

    const handleLoginClick = () => {
        setIsLogin(true);
        setIsInvalid([false, false]);
    }

    const handleRegisterClick = () => {
        setIsLogin(false);
        setIsInvalid([false, false, false]);
    }

    const handleLoginFormSubmit = ({ email, password }) => {
        const invalidStates = [email === "", password === ""];
        setIsInvalid(invalidStates);

        if (invalidStates.includes(true)) {
            return;
        }

        signIn(email, password)
            .then((userCredential) => {
                navigate("/home");
                console.log(userCredential);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorCode, errorMessage);
                toast({
                    title: "Login Failed",
                    description: "The email or password you entered is incorrect. Please try again.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            });
    }

    const handleRegisterFormSubmit = async ({ email, password, confirmPassword }) => {
        const initialInvalidStates = [false, false, false];

        const invalidStates = initialInvalidStates.map((state, index) => {
            if (index === 0 && email === "") return true;
            if (index === 1 && password === "") return true;
            if (index === 2 && confirmPassword === "") return true;
            return state;
        });

        if (password !== confirmPassword || invalidStates.includes(true)) {
            if (password !== confirmPassword) {
                toast({
                    title: "Sign up Failed",
                    description: "Passwords do not match. Please try again!",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            } else {
                toast({
                    title: "Sign up Failed",
                    description: "Please fill in all required fields.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            }

            setIsInvalid(invalidStates);
            return;
        }

        const validationStatus = validatePassword(password);

        if (!validationStatus.isValid)
            toast({
                title: "Sign up Failed",
                description: `Failed to create account: ${validationStatus.message}`,
                status: "error",
                duration: 8000,
                isClosable: true,
            });
        else {
            await setRegEmail(email);
            await setRegPassword(password);
            setDisplayUserInfoCollectionForm(true);
        }
    }

    const handleUserInfoCollectionFormSubmit = async () => {

        try {
            const userCredential = await register(regEmail, regPassword);
            console.log(userCredential.user);

        } catch (error) {
            console.log(error.code, error.message);
            toast({
                title: "Sign up Failed",
                description: `Failed to create account: ${error.message}`,
                status: "error",
                duration: 8000,
                isClosable: true,
            });
        }
    }

    return (
        <Flex
            minHeight="70vh"
            alignItems="center"
            justifyContent="center"
        >
            {isLogin
                ?
                // Render login form
                <AuthForm
                    isLogin={true}
                    onSwitchForm={handleRegisterClick}
                    onSubmit={handleLoginFormSubmit}
                    isInvalid={isInvalid}
                />
                :
                // Render appropriate register form
                displayUserInfoCollectionForm
                    ?
                    // User collection form (for collecting name and location)
                    <UserInfoCollectionForm onSubmit={handleUserInfoCollectionFormSubmit} />
                    :
                    // Initial register form
                    <AuthForm
                        isLogin={false}
                        onSwitchForm={handleLoginClick}
                        onSubmit={handleRegisterFormSubmit}
                        isInvalid={isInvalid}
                    />
            }
        </Flex>
    );
}
