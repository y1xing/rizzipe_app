import axios, {AxiosResponse} from 'axios';

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

type UseGetSavedRecipesResponse = {
    data: {
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
        },
        recipe_name: string,
    }
}

const getRecipeData = async (
    endpoint: string
): Promise<UseGetSavedRecipesResponse | null> => {
    try {
        const response: AxiosResponse<UseGetSavedRecipesResponse> = await axios.get(
            `http://localhost:5003/get_recipe/${endpoint}`
        );

        console.log("response is", response.data?.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        // You can handle the error here or rethrow it to handle it in the calling code
        throw error;
    }
};

export default getRecipeData;