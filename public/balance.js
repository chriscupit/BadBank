function Balance(){

  // create variable for user context:
  const ctx = React.useContext(UserContext);

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

  React.useEffect(() => {
    // get logged in user info from MongoDB
    fetch(`/account/findOne/${ctx.email}`)
    .then(response => response.text())
    .then(text => {
      try {
        const data = JSON.parse(text)
        setBalance(data.balance)
        console.log('JSON:', data)
      } catch (err) {
        console.log('err:', text)
      }
    })
    setLoaded(true);
  },[loaded])
  

    return (
      <Card
        bgcolor="info"
        header="View you available balance here"
        status={status}
        body={show ?
          <BalanceForm setShow={setShow} setStatus={setStatus} currentUser={currentUser}/> :
          <BalanceMsg setShow={setShow} setStatus={setStatus} currentUser={currentUser}/>}
      />
    )
  
  }
  
  function BalanceMsg(props){
    return(<>
      <h5>Success</h5>
      <button type="submit" 
        className="btn btn-light" 
        onClick={() => props.setShow(true)}>
          Check balance again
      </button>
    </>);
  }
  
  function BalanceForm(props){
    const [email, setEmail]   = React.useState('');
    const [balance, setBalance] = React.useState('');  
    const ctx = React.useContext(UserContext);  
  
     function handle(){
      const user = ctx.users.find((user) => user.email == email);
      if (!user) {
        props.setStatus('Email not found. Please try again.')      
        return;      
      }
  
      setBalance(user.balance);
      console.log(user);
      props.setStatus('Hi ' + user.email + ', ' + 'Your balance is: ' + user.balance);      
      props.setShow(false);

    } 

    //const ctx = React.useContext(UserContext);

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
    //const [balance, setBalance]    = React.useState(currentBalance);
    const[loaded, setLoaded] = React.useState(false);
    return (<>
  
      Email<br/>
      <input type="input" 
        className="form-control" 
        placeholder="Enter email" 
        value={email} 
        onChange={e => setEmail(e.currentTarget.value)}/><br/>
    Hi {currentUser}, you are currently logged in.<br/>
      <button type="submit" 
        className="btn btn-light" 
        disabled={!email} 
        onClick={handle}>
          Check Balance 
      </button>
  
    </>);
    
  } 