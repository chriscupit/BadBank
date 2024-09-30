function Withdraw(){

  // create variable for user context:
  const ctx = React.useContext(UserContext);

  // get variables for current user:
  let arrayLength = ctx.users.length;     // get array length
  let currentIndex = arrayLength - 1;     // get index of current user
  let currentUser = ctx.users.at(currentIndex).name;  // get name of current user
  let currentBalance = ctx.users.at(currentIndex).balance // get balance of current user


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

  // input validation
  function validate(amount) {

  
       if (amount == 0 || amount < 0) {
          setStatus('Error Encountered: Please enter a number greater than 0.');
          setTimeout(() => setStatus(''), 3000);
          setWithdraw('');
          return false;
      }
      else if (isNaN(amount)) {
          setStatus('Error Encountered: Please provide a valid number.');
          setTimeout(() => setStatus(''), 3000);
          setWithdraw('');
          return false;
      }
       else if (amount - 0.001 > currentBalance) {
          setStatus('Error: Account Overdraft Amount.');
          setTimeout(() => setStatus(''), 3000);
          setWithdraw('');
          return false;
      } 
      return true;
  }

  // This function performs input validation on the withdrawal amount
  // and updates the current user's balance
  function handleWithdraw() {

      if (!validate(withdraw)) return;

      let stringBalance = parseFloat(balance).toFixed(2);
      let numBalance = parseFloat(stringBalance);

      let stringWithdraw = parseFloat(withdraw).toFixed(2);
      let numWithdraw = parseFloat(stringWithdraw);

      let newBalance = numBalance - numWithdraw;
      newBalance = parseFloat(newBalance).toFixed(2);

      setBalance(newBalance);
      setShow(false);

      // update current user's balance
      ctx.users.at(currentIndex).balance = newBalance;
     

  }



  function clearForm() {
      setWithdraw('');
      setShow(true);
  }


  return (
      <Card
          textAlign="center"
          bgcolor="primary"
          txtcolor="white"
          header="Please make a Withdraw here"
          status={status}
          
          body={show ? ( 
            
              <>
              <img src="withdraw.jpg" className="img-fluid"
              alt="Responsive image"/>
                  Hi {currentUser}, you are currently logged in.<br/>
                  Your Current Balance is: ${balance}<br/><br/>
                  Withdraw Amount:<br/>
                  
                  <input type="input" className="form-control" id="deposit" 
                  placeholder="Amount you want to Withdraw" value={withdraw} 
                  onChange={e => setWithdraw(e.currentTarget.value)}/><br/>
                 
                 <button type="submit" className="btn btn-success" disabled={!withdraw} 
                  onClick={handleWithdraw}>Withdraw</button>
              </>
              
          ):
          
          (
              <>
                  <h5>Withdraw Successful</h5>
                  Hi {currentUser},<br/>
                  Your Current Balance is: ${balance}<br/><br/>
                  <button type="submit" className="btn btn-success" 
                  onClick={clearForm}>Click here to make another withdraw.</button>
              </>
          )}
      />
  );
}
