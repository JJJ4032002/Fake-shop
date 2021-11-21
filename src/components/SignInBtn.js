import { MyContextConsumer } from "../App";
function SignInBtn() {
  // using the context object here.

  return (
    <MyContextConsumer>
      {({ SignIn, Pending, SignInBtn }) =>
        SignIn ? (
          <button className="SignIn" onClick={SignInBtn}>
            SIGN IN
          </button>
        ) : Pending ? (
          <button className="SignIn">PENDING</button>
        ) : (
          <button className="SignIn" onClick={SignInBtn}>
            SIGN OUT
          </button>
        )
      }
    </MyContextConsumer>
  );
}

export default SignInBtn;
