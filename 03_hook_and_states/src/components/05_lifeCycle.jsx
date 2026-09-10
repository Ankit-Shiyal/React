import React, { useState } from "react";

const Input = () => {
    const [Email, setEmail] = useState("");

    const [Password, setPassword] = useState("")

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    return (
        <>
            <h1>States</h1>
            <input type="Email" value={Email} onChange={handleEmail} />
            <br/>
            <br/>
            <input type="Password" value={Password} onChange={handlePassword} />
            <br/>
            <br/>
            <h1>Email: {Email}</h1>
            <h1>Password: {Password}</h1>
        </>
    );
};

export default Input;