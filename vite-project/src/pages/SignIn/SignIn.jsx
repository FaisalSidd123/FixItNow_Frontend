import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

import { useState } from "react";

import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle
} from "../../firebase/auth";

import { doPasswordReset }
from "../../firebase/auth";

import "./SignIn.css";

const SignIn = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {

      await doSignInWithEmailAndPassword(
        email,
        password
      );

      alert("Login successful!");

      navigate("/dashboard");

    } catch (error) {

      alert(error.message);

    }

    setLoading(false);
  };

  const handleGoogleSignIn = async () => {

    if (loading) return;

    setLoading(true);

    try {

      await doSignInWithGoogle();

      alert("Google Sign In successful!");

      navigate("/dashboard");

    } catch (error) {

      alert(error.message);

    }

    setLoading(false);
  };

  const handlePasswordReset = async () => {

  if (!email) {

    alert("Please enter your email");

    return;
  }

  try {

    await doPasswordReset(email);

    alert(
      "Password reset email sent!"
    );

  } catch (error) {

    alert(error.message);

  }
};
  return (
    <div className="signin">

      <div className="signin-card">

       

        <h1>Welcome Back</h1>

        <p>
          Sign in to continue your solar journey
        </p>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <p
            className="forgot-password"
            onClick={handlePasswordReset}
           >
            Forgot Password?
           </p>

          <button type="submit">

            {loading
              ? "Signing In..."
              : "Sign In"}

          </button>

        </form>

        <div className="signin-divider">
          <span>OR</span>
        </div>

        <button
  className="google-btn"
  onClick={handleGoogleSignIn}
>
  <FcGoogle size={22} />
  Continue with Google
</button>

      </div>

    </div>
  );
};

export default SignIn;