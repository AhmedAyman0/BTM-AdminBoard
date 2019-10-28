import React , {useEffect,useState} from 'react';
import Axios from 'axios'

const Shops = ()=>{
    const [Shops, setShops] = useState({shops:[]})
    useEffect(() => {
        Axios.get('http://localhost:5000/api/users').then((resp)=>{
            console.log(resp.data);
            setShops({shops:resp.data});
        })
    }, []);

    return(
        <div className="container">
        <h1>Shops</h1>
        <ul>
            {Shops.shops.map(shop=> <li>shop.email</li> )}
        </ul>
        </div>
    )
}

export default Shops;