import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Input() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [userNameErr, setUserNameErr] = useState(false);
    const [userNameSpclCharErr, setUserNameSpclCharErr] = useState(false);
    const [passwordLengthErr, setPasswordLengthErr] = useState(false);
    const [passwordspclCharErr, setPasswordspclCharErr] = useState(false);
    const [submitError, setSubmitError] = useState(false);
    const [incorrectPwdError, setIncorrectPwdError] = useState(false);
    const [users, setUsers] = useState([]);

    const navigate = useNavigate();

    const handleUsernameChange = (event) => {
        const value = event.target.value;
        setUsername(value);
        if (value.length >= 4 && value.length <= 15) {
            setUserNameErr(false);
        }else{
            setUserNameErr(true);
        }
        
        if (!/^[a-zA-Z0-9]+$/.test(value)){
            setUserNameSpclCharErr(true);
        }
        else{
            setUserNameSpclCharErr(false);
        }
    };

    const handlePasswordChange = (event) => {
        const value = event.target.value;
        setPassword(value);
        if (value.length >= 8 && value.length <= 15) {
            setPasswordLengthErr(false);
        }
        else {
            setPasswordLengthErr(true);
        }
        
        if(!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/.test(value)){
            setPasswordspclCharErr(true);
        }
        else{
            setPasswordspclCharErr(false);
        }
    };

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
      };

      useEffect(() => {
        async function fetchData() {
          const response = await axios.get(`http://localhost:8080/users/allUsers`);
            setUsers(response.data);
            console.log(users);
        }
        fetchData();
      },[])
    // Handle form submission logic here, e.g., validate and submit data
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!userNameErr && !userNameSpclCharErr && !passwordLengthErr && !passwordspclCharErr){
            setSubmitError(false);
            try {
                let user = null;
                for(let i = 0; i < users.length; i++){
                    if(users[i].userName === username){
                        user = users[i];
                    }
                }
    
                if (!user) {
                    setIncorrectPwdError(true);
                    return;
                }

                if (user.password === password) {
                    setIncorrectPwdError(false);
                    navigate('/dashboard', { state: { user } });
                } else {
                    setIncorrectPwdError(true);
                }
            } catch (error) {
                console.error('An error occurred:', error);
            }
        }else{
            setSubmitError(true);
        }
    };

    return (
        <div className='form'>
            <form onSubmit={handleSubmit}>
            <h1 id='login-title'>Login</h1>
                <div className='mb-3'>
                    <label className="form-label" htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        className="form-control"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                    { userNameErr && <div className='error'>User name should be atleast 4 to 15 characters long</div>}
                    { userNameSpclCharErr && <div className='error'>User name should not contain any special characters</div>}
                </div>
                <div className='mb-3'>
                    <label className="form-label" htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    { passwordLengthErr && <div className='error'>Password should contain atleast 8 to 15 characters</div>}
                    { passwordspclCharErr && <div className='error'>Password should contain atleast 1 capital letter, 1 special character and a number</div>}
                </div>
                <div className='mb-3'>
                <label className="form-label" htmlFor="dropdown">Role</label>
                    <select className="form-control" id="dropdown" value={selectedOption} onChange={handleOptionChange}>
                    <option value="">Select an option</option>
                    <option value="Admin">Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="Student">Student</option>
                    </select>
                </div>
                <div className='buttons'>
                    <button type="submit" className='btn btn-primary' onClick={handleSubmit}>Login</button>
                    <button type="submit" className='btn btn-primary'>Logout</button>
                </div>
                <div>{submitError && <div className='error'>Please check form error and try again</div>}</div>
                <div>{incorrectPwdError && <div className='error'>UserName or Passwrod is incorrect</div>}</div>
            </form>
        </div>
    )
}

export default Input
