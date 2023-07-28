"use client";

import React, { useState } from "react";
import { Box, Button, Card, Radio, Typography } from '@mui/material';
// Arrow right icon from mui
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { alpha } from '@mui/material/styles';
import { FileDropzone } from "../file-dropzone";
import {fileToBase64} from "../../utils/file-to-base64"
import File from "react-dropzone";

const typeOptions = [
    {
        description: 'Best for small, friendly-pocket projects',
        title: 'Freelancers',
        value: 'freelancers'
    },
    {
        description: 'Limited-time projects with highly experienced individuals',
        title: 'Contractor',
        value: 'contractor'
    },
    {
        description: 'Unlimited term contracts',
        title: 'Employees',
        value: 'employees'
    }
];


interface GenerateFirstStepProps {
    onBack: () => void;
    onNext: () => void;
    files: File[];
    setFiles: React.Dispatch<React.SetStateAction<File[]>>;
    cover : string | undefined;
    setCover: (cover: string | undefined) => void;
    error: boolean | undefined;
}

export default function GenerateFirstStep ({ onBack, onNext, files, setFiles, cover, setCover, error }: GenerateFirstStepProps) {
    const [type, setType] = useState<string>(typeOptions[0].value);
    
    // const [files, setFiles] = useState<File[]>([]);
    

    const handleChange = (newType: string) => {
        setType(newType);
    }

    const handleDropCover = async (newFiles: File[]): Promise<void> => {
        const base64 = await fileToBase64(newFiles[0]);
        setCover(base64);
        setFiles((prevFiles: File[]) => [...prevFiles, ...newFiles]);
    }


    // Temp handle
    const handleDrop = (newFiles: File[]): void => {
        setFiles((prevFiles: File[]) => [...prevFiles, ...newFiles]);
    };

    const handleRemove = (file: File): void => {
        setFiles((prevFiles: File[]) => prevFiles.filter((_file) => _file.path !== file.path));
    };

    const handleRemoveAll = (): void => {
        setFiles([]);
    };



    return (
        <div>
            <Typography variant="h6">
                Upload your ingredient image here
            </Typography>
            <Typography variant="body" sx={{fontSize: '12px', color: error ? 'red': 'gray', mt: 1}}>
                {
                    error ? "PNG files are not supported" : 'Upload a photo of your ingredients. We accept JPG, JPEG, Webp up to 10MB.'
                }

            </Typography>

            <Box sx={{ mt: 3 }}>
                <FileDropzone
                    accept={{
                        'image/*': []
                    }}
                    files={files}
                    onDrop={handleDropCover}
                    onRemove={handleRemove}
                    onRemoveAll={handleRemoveAll}
                    maxFiles={1}
                />

            </Box>

            <button
                onClick={onNext}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-5 rounded mt-5"
            >
                Continue
            </button>
        </div>
    );
}
