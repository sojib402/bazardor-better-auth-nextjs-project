"use client";

import { useEffect, useState } from "react";

const DateDisplay = () => {
    const [date, setDate] = useState("");

    useEffect(() => {
        const date = new Date().toLocaleDateString("bn-BD", {
            dateStyle: "full"
        });

        setDate(date);
    }, []);

    return <p>{date}</p>;
};

export default DateDisplay;