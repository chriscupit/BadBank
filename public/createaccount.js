function CreateAccount(){
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const ctx = React.useContext(UserContext);  




  function handleCreate(){
    console.log(name,email,password);
    if (!validate(name,     'name'))     return;
    if (!validate(email,    'email'))    return;
    if (!validate(password, 'password')) return;
    if (!validatePwd(password, 'password')) return;
    ctx.users.push({name,email,password,balance:0});
    setShow(false);
  
  
    // OAuth with Google Firebase
    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(
    email,
    password
    );
    promise.then(()=> {
      //create user in MongoDB
      const url = `/account/create/${name}/${email}/${password}`;
      (async () => {
        var res  = await fetch(url);
        var data = await res.json();    
        console.log(data);        
      })();
    })
    promise.catch((e) => console.log(e.message));
      props.setShow(false);
  }   
  
    function clearForm(){
      setName('');
      setEmail('');
      setPassword('');
      setShow(true);
    }


    return (
      <Card
        bgcolor="success"
        header="Create a New User Account by Entering the Information Below"
        status={status}
        body={show ? (  
                <>
                <img src="createaccount.png" className="img-fluid"
            alt="Responsive image"/>
                Name<br/>
                  <input type="input" className="form-control" id="name" 
                    placeholder="Enter name" value={name} onChange={e => 
                    setName(e.currentTarget.value)} /><br/>
                Email address<br/>
                  <input type="input" className="form-control" id="email" 
                    placeholder="Enter email" value={email} onChange={e => 
                    setEmail(e.currentTarget.value)}/><br/>
                Password<br/>
                  <input type="password" className="form-control" id="password" 
                    placeholder="Enter password" value={password} onChange={e => 
                    setPassword(e.currentTarget.value)}/><br/>
                <button type="submit" className="button" disabled={!name || !email || !password}
                  onClick={handleCreate}>Create Account</button>
                </>
              ):(
                <>
                <h5>Success</h5>
                <h6>{name} ,your Account has been created
                  and your initial balance is $0.00
                </h6>
                
               
               <button type="submit" className="button" onClick={clearForm}>Add another account</button>
                
                </>
              )}
      />
    )
    
    function validate(field, label, password){
      if (!field) {
        setStatus('Error in ' + label + ' field');
        setTimeout(() => setStatus(''),3000);
        return false;
      }
     
      return true;
  }

  function validatePwd(field, password, label){
  if (field.length < 8){
    setStatus('Error in ' + password + ' field' + '. ' + 'Password must be atleast 8 characters long');
    setTimeout(() => setStatus(''),3000);
    return false;
  }
  return true;

}
  }
   

