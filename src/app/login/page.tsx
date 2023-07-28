"use client";

import React, {useState, useEffect} from 'react'
import Image from 'next/image'
import { Box, Button, Card, Radio, Typography, Grid, Stack, TextField, Snackbar, Alert } from '@mui/material';
import LoginImage from "../../assets/Login.png";
import styles from "./login.module.css";
import CreativityText from "../../assets/CreativityText.png";
import LoginTexture from "../../assets/LoginTexture.png";
import NoWordLogo from "../../assets/NoWordLogo.png";
import GoogleLogo from "../../assets/Google.png";
import TwitterLogo from "../../assets/Twitter.png";
import AppleLogo from "../../assets/Apple.png";
import Link from "next/link";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import supabase from '../../models/supabase';


type Inputs = {
    email: string;
    password: string;
}

export default function Page() {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [loginErrorMessage, setLoginErrorMessage] = useState<string>("");
    const [showContent, setShowContent] = useState<boolean>(false);

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
        // Check if user exists
        setLoading(true);
        const { data, error } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password,
        });

        if (error) {
            setLoginErrorMessage(error.message);
            setOpen(true);
            setValue("email", "");
            setValue("password", "");
            setLoading(false);

            return;
        }

        if (data) {
            router.push("/profile");
            console.log(data);
        }


    }

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

    return (
        showContent && (
        <div className="relative flex flex-col items-center">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', maxWidth: "80rem", width: "100%",  height: "100%", pt: 4 }}>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {loginErrorMessage}
                </Alert>
            </Snackbar>
            <Grid container spacing={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, width: "100%", height: "100%" }}>
                <Grid item xs={6} md={6} className={styles.heroHalf}>
                    <Stack spacing={2}>
                        <div className={styles.heroTexts}>
                            <h1>UNLEASH</h1>
                            <h1>Your Culinary</h1>
                            <Image
                                src={CreativityText}
                                alt={"Creativity Text"}
                                width={350}
                                className="mt-4"
                            />
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 className={"mb-2"}
                                 width="320" height="63" viewBox="0 0 441 63" fill="none">
                                <path d="M2 57.574C44 40.574 145.9 6.27396 217.5 5.07396C289.1 3.87396 395.667 17.574 440 24.574" stroke="#FC8745" stroke-width="8"/>
                            </svg>
                        </div>
                    <Image src={LoginImage} alt="Login" height={300}/>
                    </Stack>
                </Grid>
                <Grid item xs={6} md={6} className={styles.heroHalf}>
                    <div className={styles.loginContainer}>
                        <Image
                            className={styles.loginTexture}
                            src={LoginTexture}
                            width={400}
                            alt="Login Texture"
                            />
                        <Image
                            className={styles.noWordLogo}
                            src={NoWordLogo}

                            alt="NoWord Logo"
                            />
                        <Typography variant="h4" >
                            Welcome Back!
                        </Typography>
                        <Typography variant="body" sx={{color: "grey"}}>
                            Please enter your details to sign in
                        </Typography>




                        {/*Container for email and password input using MUI using stacks and grids*/}
                        <Stack spacing={4} sx={{width: "100%", display: "flex", alignItems: "center", mt: 4}}>
                            <Grid container spacing={2} sx={{width: "90%", display: "flex"}}>
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
                            variant="contained" className={styles.signInButton}
                        onClick={handleSubmit(onSubmit)}
                        >
                            Sign In
                        </Button>

                        {/*Don't have an account? Sign up*/}
                        <Typography variant="body" sx={{color: "grey", mt: 3}}>
                            Don't have an account? &nbsp;
                            <Link href="/signup" className="text-blue-500 hover:underline">
                            Sign up
                            </Link>
                        </Typography>







                    </div>
                </Grid>
            </Grid>
        </Box>
        </div>


    )
    );
}