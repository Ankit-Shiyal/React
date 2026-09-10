import React, { useState } from "react";

const ObjectUseStates = () => {
    const [input, setInput] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (field, e) => {
        setInput((prev) => {
            return {
                ...prev,
                [field]: e.target.value,
            };
        });
    };

    return (
        <>
            <input
                type="text"
                placeholder="enter your name"
                value={input.name}
                onChange={(e) => handleChange("name", e)}
            />
            <br />
            <br />
            <input
                type="email"
                placeholder="enter your email"
                value={input.email}
                onChange={(e) => handleChange("email", e)}
            />
            <br />
            <br />
            <input
                type="password"
                placeholder="enter your password"
                value={input.password}
                onChange={(e) => handleChange("password", e)}
            />
            <br />
            <br />
            <h1>Name: {input.name}</h1>
            <h1>Email: {input.email}</h1>
            <h1>password: {input.password}</h1>
        </>
    )
}

export default ObjectUseStates