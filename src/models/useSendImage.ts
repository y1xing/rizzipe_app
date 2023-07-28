import { useMutation } from '@tanstack/react-query';
import axios, {AxiosResponse} from 'axios';
import { useState, useEffect } from 'react';

interface UseSendImageResponse<T> {
    loading: boolean;
    error: Error | null;
    response: T | null;
    sendImage: (body: any) => Promise<void>;
    setError: (error: Error | null) => void;
    setResponse: (response: T | null) => void;
    setLoading: (loading: boolean) => void;
}

const useSendImage = <T>(url: string): UseSendImageResponse<T> => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [response, setResponse] = useState<T | null>(null);

    const sendImage = async (body: any) => {
        setLoading(true);
        setError(null);

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
        } finally {
            setLoading(false);
        }

    };



    return {
        loading,
        error,
        response,
        sendImage,
        setError,
        setResponse,
        setLoading,
    };


};

export default useSendImage;
