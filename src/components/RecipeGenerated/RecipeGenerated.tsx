"use client"

import React, { useState } from "react";
import Image from "next/image";
import ManThumbsDown from "../../assets/ManThumbsDown.png"
import { Box, Button, Card, CardContent, CardMedia, Grid, Typography, Stack } from "@mui/material";
import styles from "./RecipeGenerated.module.css";
import useSaveRecipe from "../../models/useSaveRecipe";
import supabase from "../../models/supabase";
import { useRouter } from "next/navigation";
import SnackBar from "../snackbar";

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

interface RecipeGeneratedProps {
    image: string;
    title: string;
    noOfIngredients: number;
    time: number;
    calories: number;
    ingredients: string[];
    totalNutrients?: NutrientInfo;
    ingredientsIdentified: string[];
    handleReset: () => void;
    error: string;
    loading: boolean;

}

export default function RecipeGenerated({ image, title, noOfIngredients, time, calories, ingredients, totalNutrients, ingredientsIdentified, handleReset, error, loading }: RecipeGeneratedProps) {

    const {
        saveRecipe,
        loading: saveRecipeLoading,
        error: saveRecipeError,
        response,
        setError,
        setLoading: setSaveRecipeLoading,
        setResponse,


    } = useSaveRecipe("http://localhost:5003/save_recipe");


    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState<string>("");

    const handleClose = () => {
        setOpen(false);
    }

    const handleSaveRecipe = async () => {
        setSaveRecipeLoading(true);

        const { data: { user } } = await supabase.auth.getUser()

        // If user is not logged in, redirect to login page
        if (!user) {
            setMessage("Please login to save your recipe");
            setOpen(true);
            return;
        }

        // Get user id from user
        const { id } = user;

        console.log(id);


        await saveRecipe({
            user_id: id,
            collection: "all_recipes",
            recipe_name: title,
            recipe_data: {
                title: title,
                image: image,
                ingredients: ingredients,
                ingredientsIdentified: ingredientsIdentified,
                calories: calories,
                time: time,
                noOfIngredients: noOfIngredients,
                totalNutrients: totalNutrients

            }
        });


    if (saveRecipeError) {
        setError(saveRecipeError);
        console.log("response", response);
        console.log("saveRecipeError", saveRecipeError);
        setMessage("Error saving recipe");
        setOpen(true);

    } else {
        setResponse(response);
        setMessage("Recipe saved successfully");
        setOpen(true);
        setError(null);

        // Redirect to saved recipes page
        router.push("/profile");
    }
        setSaveRecipeLoading(false);
    }


    if (error !== "None" && !loading) {
        return (
            <Box sx={{ flexGrow: 1, width: "100%" }}>
                <Grid container spacing={6} sx={{mb: 6}}>
                    <Grid
                        item
                        sm={6}
                        xs={6}
                        sx={{
                            display: {
                                xs: 'none',
                                md: 'block'
                            },
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',


                        }}
                    >
                        <Image
                            src={ManThumbsDown}
                            alt={"Man Thumb Down"}
                            height={500}


                        />
                    </Grid>
                    <Grid item xs={6} md={6}  sx={{
                        display: {
                            xs: 'none',
                            md: 'block'
                        },
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: "column",
                        gap: "2rem"



                    }}>
                        <Typography variant="h1" align={"center"} sx={{mt: 10}}>
                            No recipe found :(
                        </Typography>


                            <button className={styles.generateBtn} onClick={handleReset}>
                                Generate Another!
                            </button>


                    </Grid>
                </Grid>
            </Box>
                )
    }



    return (
        <Box sx={{ flexGrow: 1, width: "100%" }}>
            <SnackBar open={open} handleClose={handleClose} message={message} />

            <Grid container spacing={2} sx={{mb: 6}}>
                <Grid item xs={6} md={6}>
                    <Typography variant="h1" sx={{mb: 2}}>
                        {title}
                    </Typography>
                    <Typography variant="h5" sx={{mb: 4, fontWeight: "400"}}>
                        <b>Ingredients Identified</b>: {ingredientsIdentified.length > 0 && ingredientsIdentified?.join(", ")}
                    </Typography>
                    <Grid container spacing={2} sx={{mt: 4}}>
                        <Grid item xs={4} md={4}>
                            <Stack>
                                <Typography variant="h1" sx={{fontWeight: 200}}>
                                    {noOfIngredients}
                                </Typography>
                                <Typography variant="h6">
                                    Ingredients
                                </Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={4} md={4}>
                            <Stack>
                                <Typography variant="h1" sx={{fontWeight: 200}}>
                                    {time}
                                </Typography>
                                <Typography variant="h6">
                                    Minutes
                                </Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={4} md={4}>
                            <Stack>
                                <Typography variant="h1" sx={{fontWeight: 200}}>
                                    {Math.round(calories)}
                                </Typography>
                                <Typography variant="h6">
                                    Calories
                                </Typography>
                            </Stack>
                        </Grid>

                    </Grid>

                    <Box sx={{mt: 10}}>

                    <button className={styles.generateBtn} onClick={handleSaveRecipe}>
                        {
                            saveRecipeLoading ? "Saving..." : "Save Recipe"
                        }
                    </button>

                    </Box>



                </Grid>
                <Grid item xs={6} md={6}>
                    <div className={styles.imageContainer}>
                        <Image
                            src={image}
                            alt={title}
                            width={590}
                            height={590}
                            className={`${styles.foodImage} ${styles.skeletonLoader}`}
                        />
                    </div>

                </Grid>
            </Grid>

            <Grid container spacing={5} sx={{mt: 10}}>
                <Grid item xs={6} md={6}  className={styles.ingredientsContainer}>
                    <Typography variant="h3" sx={{mb: 3}}>
                        Ingredients
                    </Typography>
                    {
                        ingredients &&
                        ingredients.map((ingredient, index) => (
                            <Typography key={index} variant="body1"
                                        sx={{
                                            fontWeight: "400",
                                            fontFamily: "Montserrat",
                                            fontSize: "1.5rem",
                                            mb: "1.5rem",
                                            lineHeight: "normal"

                                        }}

                                        className={styles.ingredient}>
                                {ingredient}
                            </Typography>
                        ))
                    }
                </Grid>
                <Grid item xs={6} md={6}>
                    <Typography variant="h3">
                        Nutrients
                    </Typography>

                    <Grid container spacing={4} sx={{mt: 4}}>
                        {
                            totalNutrients &&
                            totalNutrients.map((nutrient, index) => (
                                <Grid item xs={4} md={4} key={index} >
                                    <div className={styles.nutrientContainer}>
                                    <Typography variant="h3" sx={{fontWeight: "200", color: "#FC8745"}}>
                                        {`${Math.round(nutrient?.quantity)} ${nutrient?.unit}`}
                                    </Typography>
                                    <Typography variant="h5">

                                        {nutrient?.label}
                                    </Typography>

                                    </div>
                                </Grid>
                            ))
                        }
                    </Grid>




                </Grid>

                <Box sx={{ display: 'flex', justifyContent: 'center', width: "100%", mt: 10, mb: 10 }}>

                    <button className={styles.generateBtn} onClick={handleReset}>
                        Generate Another!
                    </button>
                </Box>
            </Grid>
        </Box>
    );
}