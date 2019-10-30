import React , {useEffect,useState} from 'react';
import Axios from 'axios'

const Shops = ()=>{
    const [shops, setShops] = useState({data:[]})
    useEffect(() => {
        Axios.get('http://localhost:5000/api/categories').then((resp)=>{
            console.log(resp.data);
            setShops({data:resp.data});
        })
    }, []);

    return(
        <div className="container">
        <h1>Shops</h1>
        <ul>
            {shops.data.map(shop=> <li>{shop.name}</li> )}
        </ul>
        </div>
    )
}

export default Shops;