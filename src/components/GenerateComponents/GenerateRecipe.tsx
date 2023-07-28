"use client";

import React, { useState, useEffect } from "react";
import {
    Avatar,
    Box,
    Button,
    Card,
    Grid,
    Step,
    StepContent,
    StepLabel,
    Stepper,
    Typography,
    Snackbar,
    Alert
} from '@mui/material';
import GenerateFirstStep from "./GenerateFirstStep";
import GenerateSecondStep from "./GenerateSecondStep";
import CheckIcon from '@mui/icons-material/Check';
import ManThumbsUp from "../../assets/ManThumbsUp.png";
import StepIcon from "./StepIcon";
import Image from "next/image";
import { FileDropzone } from "../file-dropzone";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "../../theme";
import RecipeGenerated from "../RecipeGenerated/RecipeGenerated";
import { useForm, SubmitHandler } from "react-hook-form";
import File from "react-dropzone";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import useSendImage  from "../../models/useSendImage";

const queryClient = new QueryClient()

type Inputs = {
    description: string,
}



export default function GenerateReceipe ()  {
    const [activeStep, setActiveStep] = useState(0);
    const [complete, setComplete] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const [cover, setCover] = useState<string | undefined>();
    // Open the snackbar if there is an error
    const [open, setOpen] = useState(false);

    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();

    const {loading, error, response, sendImage, setResponse, setError, setLoading} = useSendImage("http://localhost:5003/get_recipe_from_image");

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        console.log("Loading state is: ", loading);
        const { description } = data;
        console.log("cover", cover );
        // Console log the type of the cover
        console.log("typeof cover", typeof cover);
        await sendImage({
            image: cover,
            description: description
        });

        console.log("Loading state is: ", loading);
        console.log("Data is: ", response);
        console.log("Error is: ", error);
        console.log("response data", response?.recipe?.totalNutrients.PRONCT,)



    };

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    // Reset the state of the component when the press generate again when they generate a recipe
    const handleReset = () => {
        setActiveStep(0);
        setComplete(false);
        setFiles([]);
        setCover(undefined);
        setResponse(null);
        setError(null);
        setLoading(false);

    }


    useEffect(() => {
        console.log("Loading state is: ", loading);
        console.log("Data is: ", response);
        console.log("Error is: ", error);

        if (response?.message === "Error in classifying image.") {
            console.log("Error in classifying image");
            setOpen(true);
            setActiveStep(0);
            setComplete(false);
            setFiles([]);
            setCover(undefined);
            setResponse(null);
            setError(null);
            setLoading(false);

            return;
        }

        if (response) {
            setComplete(true)
        }

    }, [loading, error, response]);


    

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }

    const handleComplete = () => {
        // setComplete(true);
        console.log("files: ", files);
        console.log("watch: ", watch);
        console.log("register: ", register);
        // Send the data to the backend and set a loading state
    }

    const steps = [
        {
            label: 'Upload Image',
            content: (
                <GenerateFirstStep
                    onBack={handleBack}
                    onNext={handleNext}
                    files={files}
                    setFiles={setFiles}
                    cover={cover}
                    setCover={setCover}
                    error={response?.message === "Error in classifying image."}
                />
            )
        },

        {
            label: 'Description',
            content: (
                <GenerateSecondStep
                    onBack={handleBack}
                    onNext={handleComplete}
                    register={register}
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit}
                    formState={errors}
                    watch={watch}
                    loading={loading}
                />
            )
        }
    ];

    return (
        <>
            <QueryClientProvider client={queryClient}>
            <ThemeProvider
                theme={createTheme({
                    direction: "ltr",
                    responsiveFontSizes: true,
                    mode: "light",
                })}
            >
            <Box
                component="main"
                sx={{
                    display: 'flex',
                    flexGrow: 1,
                    width: "100%"
                }}
                maxWidth="lg"
            >
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                        PNG files are not supported!
                    </Alert>
                </Snackbar>

                {
                    !complete ?
                <Grid
                    container
                    sx={{ flexGrow: 1 }}
                >
                    <Grid
                        item
                        sm={4}
                        xs={12}
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
                            src={ManThumbsUp}
                            alt={"Man Thumb Up"}
                            height={500}


                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        md={8}
                        sx={{
                            p: {
                                xs: 4,
                                sm: 6,
                                md: 8
                            }
                        }}
                    >
                        <Box maxWidth="sm">
                            <Typography
                                sx={{ mb: 3 }}
                                variant="h4"
                            >
                                Generate Recipe
                            </Typography>

                                    <Stepper
                                        activeStep={activeStep}
                                        orientation="vertical"
                                        sx={{
                                            '& .MuiStepConnector-line': {
                                                ml: 1,
                                                borderLeftColor: 'divider',
                                                borderLeftWidth: 2,
                                                

                                            }
                                        }}
                                    >
                                        {steps.map((step, index) => (
                                            <Step key={step.label}>
                                                <StepLabel StepIconComponent={StepIcon}>
                                                    <Typography
                                                        sx={{ ml: 2 }}
                                                        variant="overline"
                                                    >
                                                        {step.label}
                                                    </Typography>
                                                </StepLabel>
                                                <StepContent
                                                    sx={{
                                                        ml: '20px',
                                                        borderLeftColor: 'divider',
                                                        borderLeftWidth: 2,
                                                        ...(activeStep === index && {
                                                            py: 4
                                                        })
                                                    }}
                                                >
                                                    {step.content}
                                                </StepContent>
                                            </Step>
                                        ))}
                                    </Stepper>

                        </Box>
                    </Grid>
                </Grid>
                :
                        <RecipeGenerated
                            title={response && response.recipe?.label}
                            image={response && response.recipe?.image}
                            noOfIngredients={response && response.recipe?.ingredients.length}
                            time={response && response.recipe?.totalTime}
                            calories={response && response.recipe?.calories}
                            ingredients={response && response.recipe?.ingredientLines}
                            totalNutrients={response && [
                                response.recipe?.totalNutrients.PROCNT,
                                response.recipe?.totalNutrients.CHOCDF,
                                response.recipe?.totalNutrients.FAT,
                                response.recipe?.totalNutrients.FIBTG,
                                response.recipe?.totalNutrients.SUGAR,
                                response.recipe?.totalNutrients.NA,
                            ]}
                            ingredientsIdentified={response && response?.ingredients}
                            handleReset={handleReset}
                            error={response && response?.error}


                            />
                }
            </Box>
            </ThemeProvider>
            </QueryClientProvider>
        </>
    );
}