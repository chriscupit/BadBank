function Home(){
  //const ctx = React.useContext(UserContext);  
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

    navCreateAccount.style.display = "block";
    navLogin.style.display = "block";
    navDeposit.style.display = "none";
    navWithdraw.style.display = "none";
    
    navBalance.style.display = "none";
    navAllData.style.display = "none";
    navLogout.style.display = "none";
    navLoggedIn.style.display = "none";
   
    },[])
  return (
      <Card 
          textAlign="center"
          bgcolor="primary"
          txtcolor="white"
          header="Welcome to the BadBank Project"
          title="For All Your Banking Needs"
          //text="You can use this bank"
          bodyAlign="center"
          headerDisplay='flex'
          headerJustifyContent='center'
          titleDisplay='flex'
          titleJustify='center'
          body={(<img src="bank.jpg" className="img-fluid"
          alt="Responsive image"/>)}
  
    />
  );  
}


