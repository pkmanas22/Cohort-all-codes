import React, { useEffect, useState } from "react";

export default function UseEffect() {
    const [render, setRender] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setRender(!render);
        }, 3000);
    }, [])

    return (
        <>
            {render ? < FunctinoalComponent /> : <div></div>}
        </>
    )
}

// FunctinoalComponent
function FunctinoalComponent() {

    useEffect(() => {
        console.log("Component mounted");

        return () => {
            console.log("Component unmounted");
        }
    })

    return (
        <div>
            From functinoal Component
        </div>
    );
}

// ClassBasedComponent
class ClassBasedComponent extends React.Component {
    componentDidMount() {
        console.log("Component mounted");
    }

    componentWillUnmount() {
        console.log("Component unmounted");
    }

    render() {
        // Render UI
    }
}