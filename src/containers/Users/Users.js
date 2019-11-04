import React , {useEffect,useState} from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import {Table} from 'react-bootstrap';
const URL ='https://pure-sierra-38607.herokuapp.com/api';
const Users = ()=>{
    const [users, setUsers] = useState({data:[]});
    useEffect(() => {
        Axios.get(`${URL}/users`).then((resp)=>{
            console.log(resp.data);
            setUsers({...users,data:resp.data});
            console.log(users)
        });
    }, []);
    const banHandler = (id)=>{
        let user = users.data.find(a=>a._id===id);
        console.log('s',user);
        user.banned=true;
        Axios.put(`${URL}/users/${id}`,user).then(
            resp=>{
                console.log('p',resp)
            Axios.get(`${URL}/users`).then((resp)=>{
                console.log(resp.data);
                setUsers({...users,data:resp.data});
            });
            }).catch(
                error=>console.log(error)
            );
    }
    const unBanHandler = (id)=>{
        let user = users.data.find(a=>a._id===id);
        console.log('s',user);
        user.banned=false;
        Axios.put(`${URL}/users/${id}`,user).then(
            resp=>{
                console.log('p',resp)
            Axios.get(`${URL}/users`).then((resp)=>{
                console.log(resp.data);
                setUsers({...users,data:resp.data});
            });
            }).catch(
                error=>console.log(error)
            );
    }
    
    return(
        <div className="container">
            <div className="h2">
                <span>Current users list</span>
            </div>
            <hr></hr>
            <div className="table-responsive text-center">
                <Table striped bordered hover size="sm">
                    <thead>
                    <tr>
                        <th>Email</th>
                        <th>Is Permitted</th>
                        <th>Shops</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
           {users.data.map(user=>
            (<tr key={user._id}>
                <td>{user.email}</td>
                <td>{
                    user.banned ? <span className="badge badge-danger"><i className="fas fa-times"></i></span> : 
                                <span className="badge badge-success"><i className="fas fa-check"></i></span>
                }</td>
                <td><Link to={"/users/shops/"+user._id} className="btn btn-primary">Check his shops</Link></td>
                <td>
                    {
                        user.banned ?
                        <button onClick={()=>unBanHandler(user._id)} className="btn btn-success"><i className="fas fa-check-circle"></i></button> :
                        <button onClick={()=>banHandler(user._id)} className="btn btn-danger"><i className="fas fa-ban"></i></button>
                    }
                    </td>
            </tr>
            ))}
            </tbody>
           </Table>
           </div>
        </div>
    )
}

export default Users;