import { useState } from "react";
import { doSignInWithEmailAndPassword } from "../../firebase/auth";
import { useNavigate } from "react-router-dom";
import { checkAdminStatus } from "../../api/adminApi";
import "./AdminLogin.css";
const AdminLogin = () => {
      const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
 
const handleLogin = async (e) => {

  e.preventDefault();

  try {

    // 1. Firebase login
    const userCredential = await doSignInWithEmailAndPassword(
      email,
      password
    );


    const user = userCredential.user;


    // 2. Get Firebase token
    const token = await user.getIdToken();


    // 3. Send token to backend
  const data = await checkAdminStatus(token);


    // 4. Check admin status
    if(data.isAdmin){

      console.log("Admin verified");

      navigate("/admin/dashboard");

    }
    else{

      console.log("Not an admin");

      alert("Access denied: Admins only");

    }


  } catch(error){

    console.log(error.message);
    
    alert("Invalid email or password");

  }

};
  return (
    <div className="admin-login-page">
      <div className="admin-login-card">

        <div className="admin-logo">
          <h1>FixItNow</h1>
          <p>Admin Portal</p>
        </div>

        <form className="admin-login-form"
          onSubmit={handleLogin}>

          <div className="input-group">
            <label>EmailAddress</label>
            <input
            type="email"
               placeholder="Enter your email"
             value={email}
             onChange={(e)=>setEmail(e.target.value)}
              />
          </div>

          <div className="input-group">
            <label>Password</label>
           <input
  type="password"
  placeholder="Enter your password"
  value={password}
  onChange={(e)=>setPassword(e.target.value)}
/>
          </div>

          <button type="submit" className="login-btn">
            Sign In
          </button>

        </form>

      </div>
    </div>
  );
};

export default AdminLogin;