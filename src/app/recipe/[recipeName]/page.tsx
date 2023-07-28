import getRecipeData from '../../../models/useGetRecipe'
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography, Box, Stack } from "../../../components/mui";
import styles from "./recipe.module.css";
import Image from 'next/image'

export default async function Page({ params}: {params: {recipeName: string}}) {

    // Decode the recipe name that have been encoded in the URL
    const recipeName = decodeURIComponent(params.recipeName)

    console.log("recipeName", recipeName)

    // Get the recipe data
    const data = await getRecipeData(recipeName)

    if (!data) {
        return <div>Loading...</div>
    }

    const { recipe_data: recipeData} = data.data;




    return (

        <div className="flex justify-center items-center min-h-screen p-10 pb-20">
        <Box sx={{ flexGrow: 1, width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", maxWidth: "80rem"}}>


            <Grid container spacing={2} sx={{mb: 6}}>
                <Grid item xs={6} md={6}>
                    <Typography variant="h1" sx={{mb: 2}} className={styles.titleText}>
                        {recipeData.title}
                    </Typography>

                    <Grid container spacing={2} sx={{mt: 4}}>
                        <Grid item xs={4} md={4}>
                            <Stack>
                                <Typography variant="h1" sx={{fontWeight: 200}} className={styles.statsText}>
                                    {recipeData?.noOfIngredients}
                                </Typography>
                                <Typography variant="h6" className={styles.statsHeader}>
                                    Ingredients
                                </Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={4} md={4}>
                            <Stack>
                                <Typography variant="h1" sx={{fontWeight: 200}} className={styles.statsText}>
                                    {recipeData?.time}
                                </Typography>
                                <Typography variant="h6" className={styles.statsHeader}>
                                    Minutes
                                </Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={4} md={4}>
                            <Stack>
                                <Typography variant="h1" sx={{fontWeight: 200}} className={styles.statsText}>
                                    {Math.round(recipeData?.calories)}
                                </Typography>
                                <Typography variant="h6" className={styles.statsHeader}>
                                    Calories
                                </Typography>
                            </Stack>
                        </Grid>

                    </Grid>




                </Grid>
                <Grid item xs={6} md={6}>
                    <div className={styles.imageContainer}>
                        <Image
                            src={recipeData?.image}
                            alt={recipeData?.title}
                            width={590}
                            height={590}
                            // If fail to load, show skeleton loader




                            className={`${styles.foodImage} ${styles.skeletonLoader}`}
                        />
                    </div>

                </Grid>
            </Grid>

            <Grid container spacing={5} sx={{mt: 10}}>
                <Grid item xs={6} md={6}  className={styles.ingredientsContainer}>
                    <Typography variant="h3" sx={{mb: 3}} className={styles.ingredientHeader}>
                        Ingredients
                    </Typography>
                    {
                        recipeData?.ingredients &&
                        recipeData?.ingredients.map((ingredient, index) => (
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
                            recipeData?.totalNutrients &&
                            recipeData?.totalNutrients.map((nutrient, index) => (
                                <Grid item xs={4} md={4} key={index} >
                                    <div className={styles.nutrientContainer}>
                                        <Typography variant="h3" sx={{fontWeight: "200", color: "#FC8745", fontSize: "24px"}}>
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


            </Grid>
        </Box>
        </div>
    )
}