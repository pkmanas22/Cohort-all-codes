// Wrapper component for enclosing child components within a styled card
function ChildrenCardWrapper({ children }) {
    return (
        <div style={{
            fontSize: '25px',
            border: '2px solid black',
            padding: '10px',
            color: 'red',
        }}>
            {children}
        </div>
    )
}

// Main component rendering various wrapped components
export default function WrapperComponents() {
    return (
        <div>
            {/* Wrapped components */}
            <CardWrapper interComponent={<TextComponent />} />
            <CardWrapper interComponent={<TextComponent2 />} />
            <CardWrapper interComponent={<ButtonComponent />} />

            {/* Example of nested wrapper components */}
            <ChildrenCardWrapper>
                <ChildrenCardWrapper>
                    This can be easily understood
                </ChildrenCardWrapper>
            </ChildrenCardWrapper>
        </div>
    )
}

// Text component 1
function TextComponent() {
    return <div>Hi there, using wrapper</div>
}

// Text component 2
function TextComponent2() {
    return <div>Hi there, using wrapper 2222222</div>
}

// Button component
function ButtonComponent() {
    return <button>Button</button>
}

// Wrapper component for enclosing individual components within a styled card
function CardWrapper({ interComponent }) {
    return (
        <div style={{
            fontSize: '25px',
            border: '2px solid black',
            padding: '5px'
        }}>
            {interComponent}
        </div>
    )
}
