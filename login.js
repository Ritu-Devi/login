import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState(null); 
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
        setError(null); 
    };

    const handleLogin = (e) => {
        e.preventDefault(); 

        fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: credentials.username,
                password: credentials.password,
                expiresInMins: 30,
            }),
        })
        .then(res => res.json())
        .then(data => {
            if (data.id) {
                localStorage.setItem("user_id", data.id);
                navigate("/account");
            } else {
                
                setError("Username or password is incorrect.");
            }
        })
        .catch(err => {
            console.error("Login failed", err);
            setError("An error occurred. Please try again."); 
        });
    };

    return (
        <>
            <section className="preloader">
                <div className="spinner">
                    <span className="sk-inner-circle" />
                </div>
            </section>
            <main>
                <section className="sign-in-form section-padding">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 mx-auto col-12">
                                <h1 className="hero-title text-center mb-5">Sign In</h1>
                                <div className="row">
                                    <div className="col-lg-8 col-11 mx-auto">
                                        <form onSubmit={handleLogin}>
                                            {error && <p className="text-danger text-center">{error}</p>} 
                                            <label htmlFor="username">Username</label>
                                            <div className="form-floating mb-4 p-0">
                                                <input
                                                    type="text"
                                                    name="username"
                                                    className="form-control"
                                                    placeholder="Username"
                                                    value={credentials.username}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                
                                              
                                            </div>
                                            <label htmlFor="password">Password</label>
                                            <div className="form-floating p-0">
                                                <input
                                                    type="password"
                                                    name="password"
                                                    className="form-control"
                                                    placeholder="Password"
                                                    value={credentials.password}
                                                    onChange={handleChange}
                                                    required
                                                />
                                               
                                            </div>
                                            <button
                                                type="submit"
                                                className="btn custom-btn form-control mt-4 mb-3"
                                            >
                                                Sign in
                                            </button>
                                            <p className="text-center">
                                                Don’t have an account? <a href="sign-up.html">Create One</a>
                                            </p>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

export default Login;
