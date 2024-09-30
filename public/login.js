function Login() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [email, setEmail]    = React.useState('');
const currentUser          = React.useContext(UserContext);



  return (
    <Card
      bgcolor="secondary"
      header="Please Login to your account"
      status={status}
      body={
        show ? (
          <>
          <img src="login1.png" className="img-fluid"
      alt="Responsive image"/> 
     
          <LoginForm setShow={setShow} setStatus={setStatus} />
          </>
        ) : (
         <LoginMsg setShow={setShow} setStatus={setStatus} />
         
        )
      }
    />
  );
}



function LoginMsg(props) {
  const [email, setEmail]    = React.useState('');
  const ctx = React.useContext(UserContext);
  console.log(ctx);

  React.useEffect(() => {
    const navCreateAccount = document.getElementById('nav-create-account');
    const navLogin = document.getElementById('nav-login');
    const navDeposit = document.getElementById('nav-deposit');
    const navWithdraw = document.getElementById('nav-withdraw');
    
    const navBalance = document.getElementById('nav-balance');
    const navAllData = document.getElementById('nav-allData');
    const navLogout = document.getElementById('nav-logout');
    const navLoggedIn = document.getElementById('nav-loggedIn');

    navCreateAccount.style.display = "none";
    navLogin.style.display = "none";
    navDeposit.style.display = "block";
    navWithdraw.style.display = "block";
    
    navBalance.style.display = "block";
    navAllData.style.display = "block";
    navLogout.style.display = "block";
    navLoggedIn.style.display = "block";
   
    },[])

   // const ctx = React.useContext(UserContext);

  // get variables for current user:
  let arrayLength = ctx.users.length;     // get array length
  let currentIndex = arrayLength - 1;     // get index of current user
  let currentUser = ctx.users.at(currentIndex).name;  // get name of current user
  let currentBalance = ctx.users.at(currentIndex).balance // get balance of current user

  // for troubleshooting and testing
 // console.log(`current user : ${currentUser}`)
 // console.log(`current balance : ${currentBalance}`)

  // create react state variables
  const [show, setShow]          = React.useState(true);
  const [withdraw, setWithdraw]  = React.useState('');
  const [status, setStatus]     = React.useState();
  //const [user, setUser]         = React.useState(currentUser);
  const [balance, setBalance]    = React.useState(currentBalance);
  const[loaded, setLoaded] = React.useState(false);
  return (
    
    <>
    
      <h5>Success</h5>
      <button
        type="submit"
        className="btn btn-light"
        onClick={() => props.setShow(true)}
      >
      
        <h6> {currentUser}, You are now logged in</h6>
        
       
      </button>
      
      
    </>
  );
}


function LoginForm(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

 

  function handle() {
    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(email, password);

    console.log("loggedIn");
    props.setStatus("");
    props.setShow(false);
   
    promise.catch((e) => {
      props.setStatus("Login Failure! Please Create a Username and Password or Try Again.");
      props.setShow(true);
    });
  }

  firebase.auth().onAuthStateChanged((user) => { 
      if (user) {
          console.log(user.email + " is logged in!");
          
        } else {
          console.log('User is logged out!');
        }
      });

  return (
    <>
      Email
      <br />
      <input
        type="input"
        className="form-control"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
      />
      <br />
      Password
      <br />
      <input
        type="password"
        className="form-control"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <br />
      <button type="submit" className="btn btn-light" disabled={!email || !password} onClick={handle}>
        Login
        
      </button>
    </>
  );
}