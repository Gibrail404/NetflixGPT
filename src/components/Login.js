import Header from "./Header";
import {useState} from 'react';

const Login = () => {
   
  const[isSignIn, setIsSignIN] = useState(true);

  const toggleSignInForm = () => {
    setIsSignIN(!isSignIn);
  };

  return (
    <div>
      <Header />
      <div className="absolute" >
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/ff5587c5-1052-47cf-974b-a97e3b4f0656/065df910-dec3-46ae-afa8-7ad2b52dce40/IN-en-20240506-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="bg" />
      </div>
      <form className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-85 rounded-md">
        <h1 className="font-bold  text-3xl py-4">{isSignIn ? "Sign In" : "Sign Up"}</h1>

        {!isSignIn &&(
           <input type="text" placeholder="Full Name" required className="p-4 my-4 w-full border-white bg-gray-600 bg-opacity-20 rounded-md" />
        )}

        <input type="text" placeholder="Email or mobile number" required className="p-4 my-4 w-full border-white bg-gray-600 bg-opacity-20 rounded-md" />
        
        <input type="password" placeholder="Password" required className="p-4 my-4 w-full border-white text-white bg-gray-600 bg-opacity-20 rounded-lg"/>
        <button className="p-4 my-6 bg-red-600 w-full rounded-md">Sign In</button>
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>{isSignIn ? "New to Netflix? Sign Up Now" : "Already registered? Sign In Now"}</p>
      </form>
    </div>
  )
}

export default Login