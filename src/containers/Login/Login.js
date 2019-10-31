import React, { useState } from 'react';
import Input from '../../components/UI/Input/Input'
import { useHistory } from "react-router-dom";
import Axios from 'axios';
import SnackBar from '../../components/UI/SnackBar/SnackBar'
//--material--

const URL = 'https://pure-sierra-38607.herokuapp.com/api'
//----
const Login = ()=>{
    //---SnackBar----//
    let snackBar = <SnackBar></SnackBar>;
    const [open, setOpen] = React.useState({open:false,message:''});

    const handleClick = () => {
      setOpen(true);
    };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
    //----End of Snack Bar ----//
    //----form Styling------//
    const formSytle={
        margin: '10% 22%',
        width: '60%',
        border: '1px solid',
        padding: '2%',
        borderRadius: '20px'
    }
    let history = useHistory();
    const initialState={
        submitted:false,
        isValid:false,
        loginForm:
        { 
            email:{
                elementType:'input',
                elementConfig : {
                    type:'text',
                    placeholder:'Enter Your Email'
                },
                label:'Email',
                value:'',
                error:'Email is Required',
                validation : {
                    required:true
                },
                valid:false
                
            },
            password :{
                elementType:'input',
                elementConfig:{
                    type:'password',
                    placeholder:'Your Password'
                },
                label:'Passowrd',
                value:'',
                error:'Passowrd is Required',
                validation : {
                    required:true
                },
                valid:false
            }
        }
    }
    const [LoginStatus, setLoginStatus] = useState(initialState);
    const checkValidity=(value,rules)=>{
        let isValid = false;
        if(rules.required){
            value=value+'';
            isValid = value.trim() !== '';
        }
        return isValid;
    }
    const onChangeHandler =(event,elIdentifier)=>{
        console.log(event.target.value);
        const newState = {...LoginStatus}
        const updatedForm = {...LoginStatus.loginForm};
        const updatedElement = {...updatedForm[elIdentifier]};
        updatedElement.value=event.target.value;
        updatedElement.valid = checkValidity(event.target.value,updatedElement.validation)
        updatedForm[elIdentifier]=updatedElement;
        newState.loginForm=updatedForm;
        let formIsValid=true;
        for(let key in updatedForm){
            formIsValid = updatedForm[key].valid && formIsValid;
        }
        newState.isValid = formIsValid;
        setLoginStatus(newState);
    }
    const loginHandler =(event)=>{
        event.preventDefault();
        const newState = {...LoginStatus}
        const updatedForm = JSON.parse(JSON.stringify(newState.loginForm))
        newState.loginForm=updatedForm;
        newState.submitted=true;
        setLoginStatus(newState);
        console.log(LoginStatus)
        const formData ={};
        for(let key in LoginStatus.loginForm){
            formData[key] = LoginStatus.loginForm[key].value;
        }
        if(!newState.isValid){
            return ;
        }
        console.log(formData);
        Axios.post(URL+'/login',formData)
        .then(resp=>{
            history.push('/home');
        })
        .catch(error=>{
            console.log(snackBar);
            console.log(error.response.data.msg.message || error.response.data.msg);
            setOpen({open:true,message:error.response.data.msg.message || error.response.data.msg});
        });


    }
    let elementArray = [];
    for(let key in LoginStatus.loginForm){
        elementArray.push({
            id:key,
            config:LoginStatus.loginForm[key],
            changed:onChangeHandler,
            elIdentifier:key
        })
    }
    let form = (
        <form onSubmit={loginHandler}>
        {elementArray.map(element=>(
            <Input
            key={element.id}
            error={element.config.error}
            inValid={!element.config.valid}
            submitted={LoginStatus.submitted}
            elementType={element.config.elementType}
            elementConfig={element.config.elementConfig}
            value={element.config.value}
            label={element.config.label}
            changed={(event)=>element.changed(event,element.elIdentifier)}
              ></Input>
        ))}
        <button type="submit">Submit</button>
        </form>
    )
    return(
        
        <div style={formSytle} className="container text-center">
            <h3>Admin Login</h3>
            <hr></hr>
        {form}
        <SnackBar
                 message = {open.message}
                 style= 'error'
                 open={open.open}
                 onClose = {handleClose}
                  ></SnackBar>     
        </div>
    )

}

export default Login;