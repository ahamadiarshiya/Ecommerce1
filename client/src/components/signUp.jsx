import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/signUp.css";

function SignUpPage() {
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/products");
  };

  return (

    <div className="hero">
      <div className="signup-page">
        <div className="signup-box">
          <h2>Welcome 👋</h2>
          <p className="subtitle">Signup to your account</p>

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>Name</label>
              <input type="text" placeholder="Enter your name"   pattern="^[^@]+@[^@]*\.[^@]+$"
           title="Email must contain at least one dot (.) after the '@' symbol."required />
            </div>
            <div className="input-group">
              <label>Email</label>
              <input type="email" placeholder="Enter your email"   pattern="^[^@]+@[^@]*\.[^@]+$"
           title="Email must contain at least one dot (.) after the '@' symbol."required />
            </div>
            <div className="input-group">
              <label>Mobile</label>
              <input type="tel" placeholder="Enter your mobile"   pattern="^[^@]+@[^@]*\.[^@]+$"
           title="Email must contain at least one dot (.) after the '@' symbol."required />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input type="password" placeholder="Enter your password" minLength="8" required />
            </div>
              <div className="input-group">
              <label>Confirm Password</label>
              <input type="password" placeholder="Enter your password" minLength="8" required />
            </div>
            <button type="submit" className="signup-btn" >Sign Up</button>
          </form>

           <span className="login"> Already have an account <Link to= "/login"> Login </Link></span>

        </div>
      </div>
    </div>
  );
}
export default SignUpPage;


