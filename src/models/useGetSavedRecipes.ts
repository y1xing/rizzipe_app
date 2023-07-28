import axios, {AxiosResponse} from 'axios';
import { useState, useEffect } from 'react';

interface UseGetSavedRecipesResponse<T> {
    loading: boolean;
    error: Error | null;
    response: T | null;
    getSavedRecipes: (body: any) => Promise<void>;
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
        ingredientsIdentified: string[],
        time: number,
        calories: number,
        ingredients: string[],
        totalNutrients?: NutrientInfo,
    }
}

const useGetSavedRecipes = <T>(url: string): UseGetSavedRecipesResponse<T> => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [response, setResponse] = useState<T | null>(null);

    const getSavedRecipes = async (user_id: string) => {
        setLoading(true);
        setError(null);

        try {
            const dataResponse: AxiosResponse<T> = await axios.get(`${url}/${user_id}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log("response is", response);
            console.log("response.data is", dataResponse.data);
            setResponse(dataResponse.data);
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
        getSavedRecipes,
        setError,
        setResponse,
        setLoading
    };
};

export default useGetSavedRecipes;

