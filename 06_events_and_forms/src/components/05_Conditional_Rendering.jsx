import React, { useState } from "react";

const Conditional = () => {
    const [color, setColor] = useState("");

    let content;

    if (color === "") {
        content = <h1>You have not selected any color</h1>;
    }
    else if (color === "red") {
        content = <h1 style={{ color: "red" }}>You have selected red color</h1>;
    } else if (color === "blue") {
        content = <h1 style={{ color: "blue" }}>You have selected blue color</h1>;
    } else if (color === "yellow") {
        content = (
            <h1 style={{ color: "yellow" }}>
                You have selected yellow color
            </h1>
        );
    } else {
        content = <h1>You have selected wrong color</h1>;
    }

    return (
        <div>
            <form>
                <input
                    type="text"
                    placeholder="Enter color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                />
            </form>

            {content}
        </div>
    );
};

export default Conditional;