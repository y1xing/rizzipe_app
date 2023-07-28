import Image from 'next/image'
import ManThumbsUp from "../../assets/ManThumbsUp.png"
import StepIcon from "../../components/GenerateComponents/StepIcon";
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
    Typography
} from '@mui/material';
import GenerateRecipe from "../../components/GenerateComponents/GenerateRecipe";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient()


export default function Generate() {

    return (
        <div className="flex min-h-screen flex-col items-center justify-between">
            <div className="flex flex-col items-center justify-center">
                {/*CLIENT COMPONENT IMPORTED*/}
                <GenerateRecipe />
            </div>
        </div>

    )
}
