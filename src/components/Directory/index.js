import React, {useState, useEffect} from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import '../../translations/i18n';
import "./styles.scss";

import { useSelector, useDispatch } from "react-redux";
import { fetchProductsStart } from "../../redux/Products/products.actions";
import { addProduct } from "../../redux/Cart/cart.actions";

import SmallModal from "../SmallModal";

import { checkUserIsAdmin } from "../../utils";

const mapState = ({user}) => ({
  currentUser: user.currentUser
})

const Directory = ({filter, products}) => {

  const {currentUser} = useSelector(mapState);
  const dispatch = useDispatch();
  const location = useLocation();
  const {t} = useTranslation();

  const [modal, setModal] = useState(false);

  const addToCart = (item) => {
    if(!item) return;
    dispatch(
      addProduct(item)
    )
  };

  useEffect(() => {
    dispatch(fetchProductsStart());
  }, []);

  const types= ["", "vinyl", "cd", "merchandising"];

  return (
    <div className="directory">
      {filter === "" ? (
        
        <>
        <h1>{t("all")}</h1>
        <div className="directory-category">
        
        {products?.length > 0 && 
        (products.map(item => {
          return(
              <div key={item.documentId} className="directory-item">
                <Link to={`/record/${item.documentId}`}><img alt={`${item.title} front cover`} src={item.picture} className="directory-item-picture"/></Link>
                <div className="directory-item-description">
                  {item.title} <br />
                  {item.category} <br />
                  {item.characteristics} <br />
                  {item.price}€<br />
                  {checkUserIsAdmin(currentUser) && location.pathname === '/admin' ? 
                    (<button className="directory-button" onClick={() => setModal(true)}>{t("Delete item?")}</button>) :
                    null
                  }
                 {checkUserIsAdmin(currentUser) && location.pathname === '/admin' ? null : (<button className="directory-button" onClick={() => addToCart(item)}>{t("add to cart")}</button>)}
                </div>
                {modal && <SmallModal 
                setModal={setModal} 
                text={"Are you sure you want to delete this item?"}
                item={item.documentId}/>}
              </div>
        
          );
        }))}

          </div>
        
        </>
      ) : (

        types.filter(type => type === filter).map((type, index) => {
          return(
          <div key={index}>
          <h1>{type}</h1>
          <div className="directory-category">
          
          {products?.length > 0 && products.filter(item => item.type === filter).map(item => {
            return(
                <div key={item.documentId} className="directory-item">
                   <Link to={`/record/${item.documentId}`}><img alt={`${item.title} front cover`} src={item.picture} className="directory-item-picture"/></Link>
                  <div className="directory-item-description">
                    {item.title} <br />
                    {item.category} <br />
                    {item.characteristics} <br />
                    {item.price}€ <br />
                    <button onClick={() => addToCart(item)} className="directory-button">{t("add to cart")}</button>
                  </div>
                </div>
          
            );
          })}
  
            </div>
          
          </div>
        )})

      )}
    </div>
  );
};

export default Directory;
