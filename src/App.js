import { useState,useEffect } from "react";


function App() {
  const initialVal={username:"",email:"",password:""}
  const [formValue,setFormValue]=useState(initialVal)
  const [formError,setFormError]=useState({})
  const [isSubmit, setIsSubmit] = useState(false);

  const handleForm=(e)=>{
    const {name,value}=e.target
    setFormValue({...formValue,[name]:value})
    console.log(formValue)
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    setFormError(validate(formValue))
    setIsSubmit(true)
  }

  useEffect(()=>{
    console.log(formError)
    if(Object.keys(formError).length===0 && isSubmit){
      console.log(formValue)
    }
  })
  const validate=(val)=>{
    const errors={}
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const re=/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/
    if (!val.username) {
      errors.username = "Username is required!";
    }
    if (!val.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(val.email)) {
      errors.email = "Invalid email format";
    }
    if (!val.password) {
      errors.password = "Password is required";
    } else if (!re.test(val.password)) {
      errors.password = "Invalid Format ( password should be of minimum 8 characters, at least one uppercase letter, one lowercase letter, and one number)";
    } 
    return errors
  }

  return (
    <div className="flex  justify-center my-40">
      <div className="bg-orange-200 w-1/2  p-6 " >
      {Object.keys(formError).length === 0 && isSubmit ? (
        <div className="text-black text-xl text-center mb-8 p-4">Signed in successfully</div>
      ) : (
        <div></div>
      )}
      <form className="flex items-center justify-center flex-col gap-4 " onSubmit={handleSubmit} >
        <h1 className="text-3xl mb-6">Login Form</h1>
        
        <div className="mb-3" >
          <div className="flex flex-col " >
            <label>Username</label>
            <input
              className="rounded-md p-1"
              type="text"
              name="username"
              placeholder="Username"
              value={formValue.username}
              onChange={handleForm}
            />
          </div>
          <p>{formError.username}</p>
          <div className="flex flex-col mb-3 mt-3" >
            <label>Email</label>
            <input
              className="rounded-md p-1"
              type="text"
              name="email"
              placeholder="Email"
              value={formValue.email}
              onChange={handleForm}
            />
          </div>
          <p>{formError.email}</p>
          <div className="flex flex-col mb-3" >
            <label>Password</label>
            <input
              className="rounded-md p-1"
              type="password"
              name="password"
              placeholder="Password"
              value={formValue.password}
              onChange={handleForm}
            />
          </div>
          <p className="flex flex-wrap w-96">{formError.password}</p>
          <button className="bg-red-400 text-white p-2 rounded-lg" >Submit</button>
        </div>
      </form>
    </div>
    </div>
  );
}

export default App;
