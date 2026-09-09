import { useState } from "react";

const PrevState = () => {
    const [count, setCount] = useState(0);

    const handleClick = () => {
        // setCount(count + 1);
        setCount((p) => p + 1);
    };

    return (
        <>
            <h1>Count {count}</h1>

            <button onClick={handleClick}>+1</button>

            <br />

            <button
                onClick={() => {
                    handleClick();
                    handleClick();
                    handleClick();
                    handleClick();
                    handleClick();
                    handleClick();
                    handleClick();
                    handleClick();
                    handleClick();
                    handleClick();
                }}
            >
                +10
            </button>
        </>
    );
};

export default PrevState;
