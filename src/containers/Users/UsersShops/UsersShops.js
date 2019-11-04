import React , {useEffect,useState} from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import Input from '../../../components/UI/Input/Input'
import { Table } from 'react-bootstrap';

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
        data:{},
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
            imgUrl:{
                elementType:'input',
                elementConfig : {
                    type:'text',
                    placeholder:'Enter Url of a suitable Image '
                },
                label:'Image Url',
                value:'',
                error:'',
                validation : {
                    required:false
                },
                valid:true
                
            },
            category:{
                elementType:'select',
                elementConfig:{
                    options:[
                    ],

                },
                label:'Pick a Category',
                value:'',
                error:'',
                validation : {
                    required:false
                },
                valid:true
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
    // const url='http://localhost:5000/api/';
    const url='https://pure-sierra-38607.herokuapp.com/api/';
    const infoStyle = {
        margin: '16px 0',
        fontSize: '1.6rem',
        border: '2px solid',
        padding: '16px',
    }
   
    useEffect(() => {
        Axios.get(url+'users/'+id)
        .then(resp=>{
            Axios.get(url+'category').then(r=>{
                Axios.get(url+'shops/user/'+id).then(s=>{
                    console.log('c',r.data)
                    let newState= JSON.parse(JSON.stringify(user));
                    console.log(newState)
                    newState.data=resp.data;
                    newState.data.shops=s.data;
                    newState.form.shopForm.belongsTo.value=id;
                    r.data.map(category=>{
                       return newState.form.shopForm.category.elementConfig.options.push({value:category._id,displayValue:category.name});
                    })
                    newState.form.shopForm.category.value=r.data[0]._id;
                    setUser(newState);
                })
            })
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
        if(!newState.form.isValid){
            return ;
        }
        console.log('fD',formData);
        Axios.post(url+'shops',formData)
        .then(resp=>{
            console.log(resp);
            Axios.get(`${url}/users/${id}`).then(u=>{
                const newState = JSON.parse(JSON.stringify(user));
                newState.data=u.data;
                setUser(newState);
            })
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
        <div className="text-center">
        <button style={submitStyle} className="btn btn-default btn-block" type="submit">Submit</button>
        </div>
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
    const deleteShop = (shopId)=>{
        Axios.delete(url+'shops/'+shopId).then(
            Axios.get(url+'users/'+id)
            .then(resp=>{
                let newState= JSON.parse(JSON.stringify(user));
                console.log(newState)
                newState.data=resp.data;
                newState.form.shopForm.belongsTo.value=user.data._id;
                setUser(newState);
            })
        )
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
            
            <div className="table-responsive text-center">
                <Table  bordered size="sm">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user.data.shops?user.data.shops.map(shop=>(
                            <tr key={shop.id}>
                            <td>{shop.name}</td>
                            <td>{shop.category.name}</td>
                            <td><button onClick={()=>deleteShop(shop._id)} className="btn btn-danger"><i className="fas fa-times"></i></button></td>
                            </tr>
                        )
                        ):null}
                    </tbody>
                </Table>
            </div>
            <div className="row">
                <div className="text-left col-md-4">
                    {user.new?
                      <button onClick={closeNewHandler} className="btn btn-primary"><i className="fas fa-minus"></i></button>
                      :
                    <button onClick={NewHandler} className="btn btn-primary"><i className="fas fa-plus"></i></button>
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