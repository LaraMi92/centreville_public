import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import '../../translations/i18n';

import { fetchProductStart } from "../../redux/Products/products.actions";
import { addProduct } from "../../redux/Cart/cart.actions";

import Carousel from '../../components/Carousel';

import './styles.scss';
import expand from '../../assets/icons/expand.png'

const mapState = ({productsData}) => ({
    product: productsData.product
});

const RecordDetail = () => {
   const {product} = useSelector(mapState);
   const dispatch = useDispatch();
   const {productId} = useParams();
   const {t} = useTranslation();

    const [hovered, setHovered] = useState(false);
    const [modal, setModal] = useState(false);
    const [pictureValue, setPictureValue] = useState(1);
    const [pictures, setPictures] = useState([{}]);

    const toggleModal = () => setModal(!modal);

    const addToCart = (item) => {
        if(!item) return;
        dispatch(
            addProduct(item)
        )
    };

    useEffect(() => {
        dispatch(
            fetchProductStart(productId)
        );
    }, []);

    useEffect(() => {
            if(product){
            const picsArray = [];
            const pics = product.picture.map((pic, index) => {
                picsArray.push({[`picture${index +1}`]: pic})
            });
            setPictures(picsArray);
            }
    
    }, [product]);

    return (
        <>
        <main className="record-detail">
         <div className="record-detail-left">

             <div className="record-detail-left-block"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}>
             <img 
             className="record-detail-left-pic" 
             alt="front-cover" 
             src={Object.values(pictures[pictureValue -1])}/>
             <div 
             className={hovered ? 'expand' : 'no-expand'}>
                <img className="expand-img"
                 src={expand} 
                 alt="expand"
                 onClick={() => toggleModal()}/></div>
             </div>

            <div className="record-detail-left-miniatures">
                {product?.picture?.length > 1 &&
                (
                    product.picture.map((pic, index) => {
                        return(
                            <img className="record-detail-left-miniatures-pic" alt="back-cover" src={pic} onClick={() => {
                                setPictureValue(index +1)}}/>
                        )
                    })
                )
                }
            </div>
            
         </div>
         <div className="record-detail-right">
            <div className="record-detail-right-block">
                 <h1> {product.title}</h1>
                 <span>{product.description} </span>
                 <span>{product.tracklist} </span>
                 <button className="cart" onClick={() => addToCart(product)}>{t("add to cart")}</button>
            </div>
        </div>
        {modal && 
        <Carousel 
            pictureNumber={pictureValue}
            setModal={setModal}
            pictureSet={pictures}
        />}
        
        </main>
        </>
    )
};

export default RecordDetail;