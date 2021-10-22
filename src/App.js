import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {

  const [ users, setUsers ] = useState([]);
  const nameRef = useRef();
  const emailRef = useRef();

  useEffect(()=>{
    fetch('http://localhost:5000/users')
    .then( res => res.json())
    .then( data => setUsers(data))
  },[]);

  const handleAddUser = (e) =>{
      e.preventDefault();

      const name = nameRef.current.value;
      const email = emailRef.current.value;

      const preValueName = nameRef.current;
      preValueName.value = '';
      const preValueEmail = emailRef.current;
      preValueEmail.value = '';

      console.log(name,email)

      const newUser = { name : name, email: email }

      fetch('http://localhost:5000/users', {
          method: 'post',
          headers: {
            'content-type' : 'application/json'
          },
          body: JSON.stringify(newUser)
      })
      .then(res => res.json())
      .then( data => {
          const addedUser = data;
          const newUsers = [...users , addedUser];
          setUsers(newUsers)
      })
  }

  return (
    <div className="App">
      <h2>Found Users  {
        users.length
      }</h2>
        <form onSubmit={handleAddUser}>

          <input type="text" ref={nameRef} id="" placeholder="Enter Name"/><br/><br/>

          <input type="email" ref={emailRef} id="" placeholder="Enter Email" /><br/><br/>
          
          <input type="submit" value="Submit" />

        </form>
      <ul>
        {
          users.map( user => <li key={user.id}>{}{user.id} {user.name}</li>)
        }
      </ul>
    </div>
  );
}

export default App;
