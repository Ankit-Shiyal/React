import React, { useRef } from "react";

const InputName = () => {

    const name = useRef("")

    const handelSubmit = (e) => {
        e.preventDefault()

        console.log("name", name.current.value)
    }

    console.log("it will not render again")
    return (
        <>
            <form onSubmit={handelSubmit}>
                <input type="text" placeholder='enter your name' ref={name} />

                <button type='submit'>add</button>

            </form>

        </>
    )
}

export default InputName