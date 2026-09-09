import React, { useState } from "react";

const States = () => {
    const [input, setInput] = useState("");

    const handleChange = (e) => {
        setInput(e.target.value);
    };

    return (
        <>
            <h1>States</h1>
            <input type="text" value={input} onChange={handleChange} />

            
            {/* <input type="text" value={input} onChange={(e) => setInput(e.target.value)} /> */}
            <br />
            you have Entered <h1>{input}</h1>
        </>
    );
};

export default States;