import React, {useState, useEffect} from "react";
import './styles.scss';
import { useSelector } from "react-redux";
import Directory from "../../components/Directory";
import Filters from '../../components/Filters';

const mapState = ({productsData}) => ({
    products: productsData.products
    });

const Homepage = () => {
    const {products} = useSelector(mapState);
    const [filter, setFilter] = useState("");

    useEffect(() => {

    }, [filter, products]);

    return (
        <main className="homepage">
            <Filters setFilter={setFilter}/>
            <Directory filter={filter} products={products}/>
        </main>
    )
};

export default Homepage;