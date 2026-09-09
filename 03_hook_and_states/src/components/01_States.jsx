import { useState } from "react";

const State = () => {

    // counter is current value
    // setCounter is updater function
    // useState is initial value
    
    const [counter, setCounter] = useState(0);

    const handleClick = () => {
        setCounter(counter + 1);
    };
    return (
        <>
            <h1>{counter}</h1>

            {/* <button onClick={() => setCounter(counter + 1)} >increase</button> */}

            {/* functional */}
            <button onClick={handleClick}>increase</button>

            {/* give argument */}
            {/* <button onClick={(e)=>handleClick(e)} >increase</button> */}

            {/* this is not allowed */}
            {/* <button onClick={handleClick()}>increase</button> */}
        </>
    );
};

export default State;