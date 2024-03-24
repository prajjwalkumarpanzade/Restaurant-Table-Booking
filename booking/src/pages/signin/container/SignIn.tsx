
import './SignIn.css'

const SignIn = () => {


 
  return (
    <div className="signup-container">
      <h2>Sign in</h2>
      <form>
       
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            
            
            required
          />
        </div>
    
        <div className="form-group">
          <input
            type="password"
            name="Password"
            placeholder="Password"
            
            
            minLength={6}
            required
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
