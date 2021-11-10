import React, { useContext } from "react";

function SignInBtn() {
  // using the context object here.
  const contextFin = useContext(context1);
  return (
    <div>
      {signIn ? (
        <button className="SignIn" onClick={signInBtn}>
          SIGN IN
        </button>
      ) : pending ? (
        <button className="SignIn">PENDING</button>
      ) : (
        <button className="SignIn" onClick={signInBtn}>
          SIGN OUT
        </button>
      )}
    </div>
  );
}

export default SignInBtn;
