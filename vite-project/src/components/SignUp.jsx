
import "./SignUp.css";
import { FcGoogle } from "react-icons/fc";

const SignUp = () => {
  return (
    <div className="signup">
      <div className="signup-card">

       
        <h1>Create Account</h1>

        <p>Join FixItNow for smart solar solutions</p>

        <form>

  <input type="text" placeholder="Full Name" />

  <input type="email" placeholder="Email Address" />

  <input type="password" placeholder="Password" />

  <button type="submit">Sign Up</button>

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

export default SignUp;