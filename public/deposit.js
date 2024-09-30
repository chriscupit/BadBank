function Deposit(){

  // create variable for user context:
  const ctx = React.useContext(UserContext);

  // get variables for current user:
  
  let arrayLength = ctx.users.length;     // get array length
  let currentIndex = arrayLength - 1;     // get index of current user
  let currentUser = ctx.users.at(currentIndex).name;  // get name of current user
  let currentBalance = ctx.users.at(currentIndex).balance // get balance of current user
 

  // for troubleshooting and testing
  //console.log(`current user : ${currentUser}`)
  //console.log(`current balance : ${currentBalance}`)

  // create react state variables
  const [show, setShow]         = React.useState(true);
  const [deposit, setDeposit]   = React.useState('');
  const [status, setStatus]     = React.useState();
  //const [user, setUser]         = React.useState(currentUser);
  const [balance, setBalance]   = React.useState(currentBalance);
  const[loaded, setLoaded] = React.useState(false);
  const [email, setEmail]    = React.useState('');
  //const currentUser          = React.useContext(UserContext);
 
  firebase.auth().onAuthStateChanged((user) => { 
      if (user) {
          console.log(user.email + " is logged in!");
          
          //alert(user.email + " is logged in.")
        } else {
          console.log('User is logged out!');
          //alert(user.email + " is logged out.")
        }
      });
  //Updates the balance and checks validation
  function handleDeposit() {
        
      if (!validate(deposit)) return;

      let stringBalance = parseFloat(balance).toFixed(2);
      let numBalance = parseFloat(stringBalance);

      let stringDeposit = parseFloat(deposit).toFixed(2);
      let numDeposit = parseFloat(stringDeposit);

      let newBalance = numBalance + numDeposit;
      newBalance = parseFloat(newBalance).toFixed(2);

      setBalance(newBalance);
      setShow(false);

      // update current user's balance
      ctx.users.at(currentIndex).balance = newBalance;
      // for troubleshooting and testing
      //console.log(`Deposit Amount: $${deposit}`, `New Balance: $${newBalance}`);

  }

  function clearForm() {
      setDeposit('');
      setShow(true);
  }

   // input validation
   function validate(amount) {
     
      //amount entered is 0 0r less than 0
   if (amount == 0 || amount < 0) {
      setStatus('Error Encountered: Please enter a number greater than 0.');
      setTimeout(() => setStatus(''), 3000);
      setDeposit('');
      return false;
  }

  //amount entered is not a number
  else if (isNaN(amount)) {
      setStatus('Error Encountered: Please provide a valid number.');
      setTimeout(() => setStatus(''), 3000);
      setDeposit('');
      return false;
  }
  return true;
}

  return (
      <Card
          textAlign="center"
          bgcolor="primary"
          txtcolor="white"
          header="Please make a Deposit here"
          status={status}
          
          body={show ? ( 
            
              <>
              <img src="deposit.jpg" className="img-fluid"
              alt="Responsive image"/>
                  Hi {currentUser}, you are currently logged in.<br/>
                  Your Current Balance is: ${balance}<br/><br/>
                  Deposit Amount:<br/>
                  
                  
                  <input type="input" className="form-control" id="deposit" 
                  placeholder="Amount you want to Deposit" value={deposit} 
                  onChange={e => setDeposit(e.currentTarget.value)}/><br/>
                 
                  <button type="submit" className="btn btn-success" disabled={!deposit} 
                  onClick={handleDeposit}>Deposit</button>
              </>
              
          ):
          
          (
              <>
                  <h5>Deposit Successful</h5>
                  Your Current Balance is: ${balance}<br/><br/>
                  <button type="submit" className="btn btn-success" 
                  onClick={clearForm}>Click here to make another deposit.</button>
              </>
          )}
      />
  );
 
}


