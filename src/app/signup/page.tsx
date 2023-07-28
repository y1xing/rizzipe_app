"use client";

import React, {useState, useEffect} from 'react'
import Image from 'next/image'
import { Box, Button, Card, Radio, Typography, Grid, Stack, TextField, CircularProgress, Snackbar, Alert } from '@mui/material';
import LoginImage from "../../assets/Login.png";
import styles from "./login.module.css";
import CreativityText from "../../assets/CreativityText.png";
import LoginTexture from "../../assets/LoginTexture.png";
import NoWordLogo from "../../assets/NoWordLogo.png";
import GoogleLogo from "../../assets/Google.png";
import TwitterLogo from "../../assets/Twitter.png";
import AppleLogo from "../../assets/Apple.png";
import ManThumbsUp from "../../assets/ManThumbsUp.png";
import Link from "next/link";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { createClient } from '@supabase/supabase-js';
import supabase from '../../models/supabase';
import { useRouter } from 'next/navigation';


type Inputs = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}




export default function Page() {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [signUpErrorMessage, setSignUpErrorMessage] = useState<string>("");
    const [showContent, setShowContent] = useState<boolean>(false);

    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                const user = session?.user;
                if (user) {
                    router.push("/profile");
                } else {
                    setShowContent(true);
                }
            }
        );

        return () => {
            authListener?.subscription.unsubscribe();
        };
    }, []);

    const handleClose = () => {
        setOpen(false);
    }


    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        control,
        setValue


    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (formData) => {
        setLoading(true);

        try {
            // Check if password and passwordConfirm match
            if (formData.password !== formData.confirmPassword) {
                throw new Error('Passwords do not match.');
            }

            // Register the user with Supabase
            const { data, error } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        name: formData.name,
                    },
                },
            });

            if (error) {
                setSignUpErrorMessage(error.message);
                setOpen(true)
                throw new Error(`Error registering user: ${error.message}`);
            }

            console.log('data?.id', data)

            const userID = data?.user?.id;
            const userEmail = data?.user?.email;

            // Insert the user data into the database
            const { data: userData, error: insertError } = await supabase
                .from('users') // Replace 'users' with the actual table name in your Supabase database
                .insert([{ id: userID, user_id: userID, email: userEmail, name: formData.name }]);

            if (insertError) {
                setSignUpErrorMessage(insertError.message);
                setOpen(true)
                throw new Error(`Error inserting user data: ${insertError.message}`);
            }

            // User registration and insertion successful
            console.log('User registered and data inserted:', userData);
            setLoading(false)
            router.push('/profile');
        } catch (error) {
            // Handle registration error
            setSignUpErrorMessage(error.message);
            setOpen(true)
            console.error(error.message);
            setLoading(false)
        }
    }

    const watchPassword = watch("password", "");
    const watchConfirmPassword = watch("confirmPassword", "");



    return (
        showContent && (
        <div className="relative flex flex-col items-center">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', maxWidth: "80rem", width: "100%",  height: "100%" }}>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {signUpErrorMessage}
                </Alert>
            </Snackbar>
            <Grid container spacing={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, width: "100%", height: "100%" }}>
                <Grid item xs={6} md={6} className={styles.heroHalf}>
                    <Stack spacing={2}>
                        <div className={styles.heroTexts}>
                            <h1>Sign Up</h1>


                            <svg xmlns="http://www.w3.org/2000/svg"
                                 className={"mb-2"}
                                 width="320" height="63" viewBox="0 0 441 63" fill="none">
                                <path d="M2 57.574C44 40.574 145.9 6.27396 217.5 5.07396C289.1 3.87396 395.667 17.574 440 24.574" stroke="#FC8745" stroke-width="8"/>
                            </svg>
                        </div>
                    <Image src={ManThumbsUp} alt="Login" height={500}/>
                    </Stack>
                </Grid>
                <Grid item xs={6} md={6} className={styles.heroHalf} sx={{pt: 5}}>
                    <div className={styles.loginContainer}>
                        <Image
                            className={styles.loginTexture}
                            src={LoginTexture}
                            width={350}
                            alt="Login Texture"
                            />
                        <Image
                            className={styles.noWordLogo}
                            src={NoWordLogo}

                            alt="NoWord Logo"
                            />
                        <Typography variant="h4" >
                            Create Account
                        </Typography>
                        <Typography variant="body" sx={{color: "grey"}}>
                            Please enter your details to sign up
                        </Typography>




                        {/*Container for email and password input using MUI using stacks and grids*/}
                        <Stack spacing={4} sx={{width: "100%", display: "flex", alignItems: "center", mt: 4}}>
                            <Grid container spacing={2} sx={{width: "90%", display: "flex"}}>
                                <Grid item xs={12} md={12}>
                                    <Controller
                                        name="name"
                                        control={control}
                                        defaultValue=""
                                        rules={{ required: 'Name is required' }}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                id="outlined-basic"
                                                label="Name"
                                                variant="outlined"
                                                fullWidth
                                                error={Boolean(errors.name)}
                                                helperText={errors.name?.message}

                                            />
                                        )}

                                        />

                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <Controller
                                        name="email"
                                        control={control}
                                        defaultValue=""
                                        rules={{ required: 'Email is required' }}
                                        render={({ field }) => (
                                            <TextField
                                                label="Email"
                                                variant="outlined"
                                                fullWidth
                                                {...field}
                                                error={Boolean(errors.email)}
                                                helperText={errors.email?.message}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <Controller
                                        name="password"
                                        control={control}
                                        defaultValue=""
                                        rules={{ required: 'Password is required' }}
                                        render={({ field }) => (
                                            <TextField
                                                type="password"
                                                label="Password"
                                                variant="outlined"
                                                fullWidth
                                                {...field}
                                                error={Boolean(errors.password)}
                                                helperText={errors.password?.message}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <Controller
                                        name="confirmPassword"
                                        control={control}
                                        defaultValue=""
                                        rules={{
                                            required: 'Password confirm is required',
                                            validate: (value) => value === watchPassword || 'Passwords do not match',
                                        }}
                                        render={({ field }) => (
                                            <TextField
                                                type="password"
                                                label="Confirm Password"
                                                variant="outlined"
                                                fullWidth
                                                {...field}
                                                error={Boolean(errors.confirmPassword)}
                                                helperText={errors.confirmPassword?.message}
                                            />
                                        )}
                                    />
                                </Grid>
                            </Grid>
                        </Stack>

                        {/*Sign in button*/}
                        <Button
                            sx={{
                                mt: 4,
                                borderRadius: 20,
                                p: 2,
                                fontSize: "1.2rem",
                                color: "white",

                            }}
                        className={styles.signInButton}
                        onClick={handleSubmit(onSubmit)}
                        >

                            {loading ? <CircularProgress size={24} /> : "Sign Up"}
                        </Button>

                        {/*Don't have an account? Sign up*/}
                        <Typography variant="body" sx={{color: "grey", mt: 3}}>
                            Already have an account? &nbsp;
                            <Link href="/login" className="text-blue-500 hover:underline">
                            Login
                            </Link>
                        </Typography>







                    </div>
                </Grid>
            </Grid>
        </Box>
        </div>


    )
    )
}