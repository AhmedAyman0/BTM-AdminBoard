import React , {useEffect,useState} from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import Input from '../../../components/UI/Input/Input'

const UsersShops = (props)=>{
    const submitStyle={
        border: '1px solid grey'
    
    }
    const formStyle={
        border: '1px solid',
        padding: '16px',
        margin: '8% 0',
        width: '100%'
    
    }
    const initialState={
        data:[],
        new:false,
        form:{
        submitted:false,
        isValid:false,
        shopForm:
        { 
            name:{
                elementType:'input',
                elementConfig : {
                    type:'text',
                    placeholder:'Enter Shop Name'
                },
                label:'Shop Name',
                value:'',
                error:'Shop Name is Required',
                validation : {
                    required:true
                },
                valid:false
                
            },
            belongsTo :{
                elementType:'input',
                elementConfig:{
                    type:'hidden',
                    placeholder:''
                },
                label:'',
                value:'',
                error:'',
                validation : {
                    required:false
                },
                valid:true
            }
        }
    }
}
const [user, setUser] = useState(initialState);
    const id=props.match.params.id;
    const infoStyle = {
        margin: '16px 0',
        fontSize: '1.6rem',
        border: '2px solid',
        padding: '16px',
    }
   
    useEffect(() => {
        Axios.get('http://localhost:5000/api/users/'+id)
        .then(resp=>{
            let newState= JSON.parse(JSON.stringify(user));
            newState.data=resp.data;
            setUser(newState);
        })
    }, []);

    const checkValidity=(value,rules)=>{
        let isValid = false;
        if(rules.required){
            value=value+'';
            isValid = value.trim() !== '';
        }
        return isValid;
    }
    const newShopHandler =(event)=>{
        event.preventDefault();
        const newState = JSON.parse(JSON.stringify(user))
        const updatedForm = JSON.parse(JSON.stringify(newState.form.shopForm))
        newState.form.shopForm=updatedForm;
        newState.form.submitted=true;
        setUser(newState);
        console.log(newState)
        const formData ={};
        for(let key in newState.form.shopForm){
            formData[key] = newState.form.shopForm[key].value;
        }
        if(!newState.isValid){
            return ;
        }
        console.log(formData);
        Axios.post('http://localhost:5000/api/login',formData)
        .then(resp=>{
            console.log(resp);
        })
        .catch(error=>{
            console.log(error.response.data.msg.message || error.response.data.msg);
           
        });


    }
    const onChangeHandler =(event,elIdentifier)=>{
        console.log(event.target.value);
        const newState = JSON.parse(JSON.stringify(user));
        const updatedForm = newState.form.shopForm
        const updatedElement = {...updatedForm[elIdentifier]};
        updatedElement.value=event.target.value;
        updatedElement.valid = checkValidity(event.target.value,updatedElement.validation)
        updatedForm[elIdentifier]=updatedElement;
        newState.shopForm=updatedForm;
        let formIsValid=true;
        for(let key in updatedForm){
            formIsValid = updatedForm[key].valid && formIsValid;
        }
        newState.form.isValid = formIsValid;
        setUser(newState);
    }
    let elementArray = [];
    for(let key in user.form.shopForm){
        elementArray.push({
            id:key,
            config:user.form.shopForm[key],
            changed:onChangeHandler,
            elIdentifier:key
        })
    }
    let form = (
        <form onSubmit={newShopHandler}>
        {elementArray.map(element=>(
            <Input
            key={element.id}
            error={element.config.error}
            inValid={!element.config.valid}
            submitted={user.form.submitted}
            elementType={element.config.elementType}
            elementConfig={element.config.elementConfig}
            value={element.config.value}
            label={element.config.label}
            changed={(event)=>element.changed(event,element.elIdentifier)}
              ></Input>
        ))}
        <button style={submitStyle} className="btn btn-default" type="submit">Submit</button>
        </form>
    )
    const NewHandler = ()=>{
        const newState = JSON.parse(JSON.stringify(user));
        newState.new=true;
        setUser(newState);

    }
    const closeNewHandler = ()=>{
        const newState = JSON.parse(JSON.stringify(user));
        newState.new=false;
        setUser(newState);
    }
    return(
        <div className="container">
                            
            <div style={infoStyle} className="row">

                <div className="col-md-3">
                    Owner : 
                </div>
                <div className="offset-md-2 col-md-7">
                    {user.data.email}
                </div>
                
            </div>
            
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Items</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                </table>
            </div>
            <div className="row">
                <div className="text-left col-md-4">
                    {user.new?
                      <button onClick={closeNewHandler} className="btn btn-primary"><i class="fas fa-minus"></i></button>
                      :
                    <button onClick={NewHandler} className="btn btn-primary"><i class="fas fa-plus"></i></button>
                    }
                    
                </div>
                
                {user.new ?
                     <div style={formStyle}>
                         <h3>Add a shop to the user</h3>
                         <hr></hr>
                        {form}
                    </div>
                 : null}
                
            </div>
        </div>
    )
}

export default UsersShops