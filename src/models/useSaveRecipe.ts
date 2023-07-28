import axios, {AxiosResponse} from 'axios';
import { useState, useEffect } from 'react';

interface UseSaveRecipeResponse<T> {
    loading: boolean;
    error: Error | null;
    response: T | null;
    saveRecipe: (body: any) => Promise<void>;
    setError: (error: Error | null) => void;
    setResponse: (response: T | null) => void;
    setLoading: (loading: boolean) => void;

}

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
        label: string,
        image: string,
        noOfIngredients: number,
        time: number,
        calories: number,
        ingredients: string[],
        totalNutrients?: NutrientInfo,
    }
}

const useSaveRecipe = <T>(url: string): UseSaveRecipeResponse<T> => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [response, setResponse] = useState<T | null>(null);

    const saveRecipe = async (body: body) => {
        setLoading(true);
        setError(null);

        console.log("body is", body);

        try {
            const response: AxiosResponse<T> = await axios.post(url, body, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log("response is", response);
            console.log("response.data is", response.data);
            setResponse(response.data);
        } catch (error) {
            setError(error);
            console.log("error is", error);
        } finally {
            setLoading(false);
        }

    };

    return {
        loading,
        error,
        response,
        saveRecipe,
        setError,
        setResponse,
        setLoading,
    };
}

export default useSaveRecipe;