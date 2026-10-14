
import { useState } from "react";

const initialForm = {
    Title: "",
    Description: "",
    Amount: "",
    Date: "",
    Category: "",
    Type: "",
};

const Add = ({ handleAdd }) => {
    const [input, setInput] = useState(initialForm);

    const handleChange = (field, e) => {
        setInput((prev) => {
            return {
                ...prev,
                [field]: e.target.value,
            };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Form Data:", input);

        handleAdd({
            ...input,
            Amount: Number(input.Amount),
        });

        setInput(initialForm);
    };

    return (
        <div>
            <h1>Expense Management</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter Title"
                    value={input.Title}
                    onChange={(e) => handleChange("Title", e)}
                    required
                />
                <br />
                <br />

                <input
                    type="text"
                    placeholder="Enter Description"
                    value={input.Description}
                    onChange={(e) => handleChange("Description", e)}
                    required
                />
                <br />
                <br />

                <input
                    type="number"
                    placeholder="Enter Amount"
                    value={input.Amount}
                    onChange={(e) => handleChange("Amount", e)}
                    min="0.01"
                    step="0.01"
                    required
                />
                <br />
                <br />
                <input
                    type="date"
                    value={input.Date}
                    onChange={(e) => handleChange("Date", e)}
                    required
                />
                <br />
                <br />
                <input
                    type="text"
                    placeholder="Enter Category"
                    value={input.Category}
                    onChange={(e) => handleChange("Category", e)}
                    required
                />
                <br />
                <br />
                <select
                    value={input.Type}
                    onChange={(e) => handleChange("Type", e)}
                    required
                >
                    <option value="">Select Type</option>
                    <option value="debit">Debit</option>
                    <option value="credit">Credit</option>
                </select>
                <br />
                <br />

                <button type="submit">
                    Add
                </button>
            </form>
        </div>
    );
};

export default Add;
