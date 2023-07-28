"use client";

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import AvatarImage from "../../assets/AvatarImage.png"
import FoodAdvocateText from "../../assets/FoodAdvocate.png"
import supabase from '../../models/supabase';
import SnackBar from "../../components/snackbar";
import { useRouter } from 'next/navigation';
import useGetSavedRecipes from '../../models/useGetSavedRecipes';
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography, Box } from '@mui/material';
import styles from "./profile.module.css";

interface NutrientInfo {
    PROCNT: {
        label: string;
        quantity: number;
        unit: string;
    };
    CHOCDF: {
        label: string;
        quantity: number;
        unit: string;
    };
    FAT: {
        label: string;
        quantity: number;
        unit: string;
    };
    FIBTG: {
        label: string;
        quantity: number;
        unit: string;
    };
    SUGAR: {
        label: string;
        quantity: number;
        unit: string;
    };
    NA: {
        label: string;
        quantity: number;
        unit: string;
    };
}

type body = {
    user_id: string,
    collection: string,
    recipe_data: {
        title: string,
        image: string,
        noOfIngredients: number,
        ingredientsIdentified: string[],
        time: number,
        calories: number,
        ingredients: string[],
        totalNutrients?: NutrientInfo,
    }
}

export default function Page() {

    const router = useRouter()



    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [showContent, setShowContent] = useState<boolean>(false);
    const [showRecipeContent, setShowRecipeContent] = useState<boolean>(false);
    const [userID, setUserID] = useState<string>("");
    // Saved recipe states with the body type or null
    const [savedRecipes, setSavedRecipes] = useState<body[] | null>(null);


    const {
        loading,
        error,
        response,
        getSavedRecipes,
        setError,
        setResponse,
        setLoading
    } = useGetSavedRecipes(`http://localhost:5003/get_recipes`);


    const handleClose = () => {
        setOpen(false);
    }


    const signOut = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) {
            setMessage(error.message);
            setOpen(true);
            console.log(error.message)
        } else {
            setMessage("Logged out successfully");
            setOpen(true);
            console.log("Logged out successfully")
            router.push("/login")
        }

    }

    const navigateToRecipe = (recipeName: string) => {
        router.push(`/recipe/${recipeName}`)
    }

    // Get User ID
    useEffect( () => {
        const getUserID = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                return user.id
            }
        }

        const getRecipes = async () => {
            const userID = await getUserID();
            await getSavedRecipes(userID);

            // Check for errors
            if (error) {
                setMessage(error.message);
                setOpen(true);
                console.log(error.message)
            } else {
                setSavedRecipes(response?.data);

                setShowRecipeContent(true)


            }


        }

        getRecipes()
        console.log("savedRecipes", savedRecipes)



    }, []);



    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                const user = session?.user;
                if (!user) {
                    router.push("/login");
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
        showContent && showRecipeContent && (
        <div className="relative flex flex-col items-center min-h-screen pt-10">
            <SnackBar
                open={open}
                handleClose={handleClose}
                message={message}
                />

            <div className="flex flex-row items-center gap-10">
            <Image
                src={AvatarImage}
                alt="Picture of the avatar"
                width={200}
                height={200}
            />

            <div className="flex flex-col items-center gap-4">
                <h1 className="text-4xl font-bold">Cheng Yi Xing</h1>
                <Image
                    src={FoodAdvocateText}
                    alt="Picture of the food advocate text"
                    width={250}
                    />

                <button
                    onClick={() => signOut()}
                    className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-10 rounded-full">
                    Logout
                </button>

            </div>
            </div>


            <Box sx={{ flexGrow: 1, m: 2, mt: 10, display: "flex", width: "100%", maxWidth: "80rem"  }}>
                <Grid container spacing={2}>
                    {response && response?.data?.map((recipe, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Card
                                sx={{
                                    cursor: "pointer",
                                }}

                                className={styles.recipeCard + " hover:shadow-lg"}
                                onClick={() => navigateToRecipe(recipe.recipe_data.title)}


                            >
                                <Image
                                    width="500"
                                    height="500"
                                    src={recipe.recipe_data.image}
                                    alt={recipe.recipe_data.title}
                                />
                                <CardContent>
                                    <Typography
                                        sx={{
                                            fontFamily: "Montserrat",
                                            fontWeight: 600,
                                            m:0,
                                        }}
                                        gutterBottom variant="h5" className={styles.recipeName}>
                                        {recipe.recipe_data.title}
                                    </Typography>

                                </CardContent>

                            </Card>
                        </Grid>
                    ))

                    }
                </Grid>
            </Box>






        </div>
        )
    )
}