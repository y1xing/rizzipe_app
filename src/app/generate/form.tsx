"use client";

import React, { useState } from "react";

export default function Form() {
    const [activeStep, setActiveStep] = useState(0);
    const [complete, setComplete] = useState(false);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleComplete = () => {
        setComplete(true);
    };
    
}