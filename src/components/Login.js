import Header from "./Header";
import { useState, useRef } from 'react';
import { checkValidData } from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";



const Login = () => {


  const [isSignIn, setIsSignIN] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleSignInForm = () => {
    setIsSignIN(!isSignIn);
  };

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    // Validate form data
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);

    if (message) return;

    // SignIn/SignUp logic

    if (!isSignIn) {
      // Sign UP Logic
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value
          }).then(() => {
            // Profile updated!
            const { uid, email, displayName } = auth.currentUser;
            dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
            navigate("/browse");
          }).catch((error) => {
            // An error occurred
            setErrorMessage(error.message);
          }); 

        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);

        });

    }
    else {
      //Sign In Logic
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });

    }

  };

  return (
    <div>
      <Header />

      <div className="absolute" >
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/ff5587c5-1052-47cf-974b-a97e3b4f0656/065df910-dec3-46ae-afa8-7ad2b52dce40/IN-en-20240506-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="bg" />
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-85 rounded-md">
        <h1 className="font-bold  text-3xl py-4">{isSignIn ? "Sign In" : "Sign Up"}</h1>

        {!isSignIn && (
          <input type="text" placeholder="Full Name" required className="p-4 my-4 w-full border-white bg-gray-600 bg-opacity-20 rounded-md" />
        )}

        <input type="text" ref={email}
          placeholder="Email or mobile number"
          required className="p-4 my-4 w-full border-white bg-gray-600 bg-opacity-20 rounded-md" />

        <input type="password" ref={password}
          placeholder="Password"
          required className="p-4 my-4 w-full border-white text-white bg-gray-600 bg-opacity-20 rounded-lg" />


        <button className="p-4 my-6 bg-red-600 w-full rounded-md"
          onClick={handleButtonClick}>Sign In</button>

        <p className="text-red-500 font-semibold text-lg py-2">{errorMessage}</p>

        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>{isSignIn ? "New to Netflix? Sign Up Now" : "Already registered? Sign In Now"}</p>
      </form>
    </div>
  )
}

export default Login