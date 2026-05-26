
import "./SignIn.css";
import { FcGoogle } from "react-icons/fc";

const SignIn = () => {
  return (
    <div className="signin">
      <div className="signin-card">

      

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
  <FcGoogle size={22} />
  Continue with Google
</button>
      </div>
    </div>
  );
};

export default SignIn;