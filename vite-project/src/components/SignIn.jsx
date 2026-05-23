import "./SignIn.css";

const SignIn = () => {
  return (
    <div className="signin">
      <div className="signin-card">

        <a href="/" className="back-home">
          ← Back to Home
        </a>

        <h1>Welcome Back</h1>

        <p>Sign in to continue your solar journey</p>

       <form>

  <input type="email" placeholder="Email Address" />

  <input type="password" placeholder="Password" />

  <button type="submit">Sign In</button>

</form>

<div className="signin-divider">
  <span>OR</span>
</div>

<button className="google-btn">
  Continue with Google
</button>
      </div>
    </div>
  );
};

export default SignIn;