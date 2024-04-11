// components/SignupForm.tsx

const Signup = () => {
    const inputStyle = {
        marginBottom: '10px',
        padding: '8px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        width: '300px',
        boxSizing: 'border-box',
    };

    const buttonStyle = {
        backgroundColor: '#007bff',
        color: '#fff',
        padding: '10px 20px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
    };

    return (
        <>
            <div>
                <label>Username:</label>
                <input
                    type="text"
                    name="username"
                    required
                    style={inputStyle}
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    required
                    style={inputStyle}
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    required
                    style={inputStyle}
                />
            </div>
            <div>
                <label>Confirm Password:</label>
                <input
                    type="password"
                    name="confirmPassword"
                    required
                    style={inputStyle}
                />
            </div>
            <button type="submit" style={buttonStyle}>Sign Up</button>
        </>
    );
};

export { Signup };
