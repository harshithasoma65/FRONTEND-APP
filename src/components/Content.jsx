import { useState, useEffect } from "react";
import axios from "axios";
import "./Content.css";
const API_URL = import.meta.env.VITE_API_URL;

function Content() {
    //const [count, setCount] = useState(0);
    const [products, setProducts] = useState([]);

    const increment = () => {
        setCount(count + 1);
    };

    const decrement = () => {
        setCount(count - 1);
    };

    const fetchProducts = async () => {
        const url = `${API_URL}/store`;

        const res = await axios.get(url);
        setProducts(res.data);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
    
            /*<h3>Products Page</h3>

            <button onClick={decrement}>-</button>
            {count}
            <button onClick={increment}>+</button>

            <hr />
                <ol>*/
                <div className="row">

                

    {products.map((product) => (
        <div className="box">
            <img src={`https://backend-app-z2t4.onrender.com/${product.imageUrl}`} width="300px" height="300px" alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.desc}</p>
            <p>Price: {product.price}</p>
            <p><button>Add to Cart</button></p>
        </div>
    
    ))}
    </div>


        

    );
}

export default Content;