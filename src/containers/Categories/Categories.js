import React , {useEffect,useState} from 'react';
import Axios from 'axios'
const URL = 'https://pure-sierra-38607.herokuapp.com/api';
const Categories = ()=>{

    const [categories, setCategories] = useState({data:[]})
    useEffect(() => {
        Axios.get(`${URL}/category`).then((resp)=>{
            console.log(resp.data);
            setCategories({data:resp.data});
        })
    }, []);

    return(
        <div className="container">
        <h1>Categories</h1>
        <ul>
            {categories.data.map(shop=> <li>{shop.name}</li> )}
        </ul>
        </div>
    )
}

export default Categories;