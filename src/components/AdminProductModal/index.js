import React, {useEffect, useState} from "react";
import close from '../../assets/icons/close.png';
import './styles.scss';

import { addProductStart } from "../../redux/Products/products.actions";
import { useDispatch } from "react-redux";

import { useTranslation } from "react-i18next";
import "../../translations/i18n";

const AdminProductModal = ({setModal}) => {
    const [formInputs, setFormInputs] = useState({
        title: '',
        picture: [],
        type: '',
        category: '',
        characteristics: '',
        price: 0,
        description: '',
        tracklist: ''
    }); 

    const {t} = useTranslation();

    const [field, setField] = useState([{pictureURL:""}]);
    const [error, setError] = useState('');

    const dispatch = useDispatch();

        const closeModal = (event) => {
            if(event.target.id === 'modal-background'){
             setModal(false)
            }
          };
        
          const handleChange = (name, value) => {
            setFormInputs({
              ...formInputs, 
              [name]: value});
            setError('');
          };

          const handleFieldChange = (event, index) => {
            const {name, value} = event.target;
            const list = [...field];
            list[index][name] = value;
            setField(list);
            const urls = list.map(url => url.pictureURL);
            setFormInputs({
              ...formInputs,
              picture: urls
            })
          };

          const handleRemoveField = (index) => {
            const list = [...field];
            list.splice(index, 1);
            setField(list);
          };

          const handleAddField = () => {
            setField([
              ...field,
              {pictureURL: ""}
            ])
          };

          const resetForm = () => {
            setModal(false);
            setFormInputs({
              title: '',
              picture: [],
              type: '',
              category: '',
              characteristics: '',
              price: 0,
              description: '',
              tracklist: ''
            });
        }
          
          const addProduct = (e) => {
            e.preventDefault();
            if(formInputs.title === "" || formInputs.type === "" || formInputs.price === ""){
              setError(t("Mandatory fields include product name, product type and price"));
              return;
            }
            dispatch(addProductStart(formInputs));
            resetForm();
          };

          useEffect(() => {
          }, [field])
         
          return (
            <div id="modal-background" onClick={(e) => closeModal(e)}>
              <div className="modal-overlay">
                <div className="admin-product-modal">
                  <div
                    className="admin-product-modal--close"
                    onClick={() => setModal(false)}
                  >
                    <img
                      src={close}
                      alt="close button"
                      className="cart-header--button"
                    />
                  </div>
                  <form onSubmit={addProduct}>
                    <div className="admin-product-modal--line">
                      <h3>{t("Add new product")}</h3>
                    </div>
                    <div className="admin-product-modal--line">
                      <label htmlFor="title">{t("Product name")}</label>
                      <input
                        name="title"
                        type="text"
                        onChange={(e) =>
                          handleChange(e.target.name, e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="admin-product-modal--line">
                      <label htmlFor="pictureURL">{t("Picture URL")}</label>
                      {field.map((element, index) => {
                        return (
                          <>
                            <input
                              name="pictureURL"
                              type="text"
                              value={element.pictureURL}
                              onChange={(e) => handleFieldChange(e, index)}
                              required
                            />
                            {field.length !== 1 && (
                              <span
                                className="admin-product-modal--add"
                                onClick={() => handleRemoveField(field)}
                              >
                                -
                              </span>
                            )}
                            {field.length - 1 === index && (
                              <span
                                className="admin-product-modal--add"
                                onClick={() => handleAddField()}
                              >
                                +
                              </span>
                            )}
                          </>
                        );
                      })}
                    </div>
                    <div className="admin-product-modal--line">
                      <label htmlFor="type">{t("Product type")}</label>
                      <select
                        name="type"
                        required
                        onChange={(e) =>
                          handleChange(e.target.name, e.target.value)
                        }
                      >
                        <option value="">{t("Choose type")}</option>
                        <option value="vinyl">Vinyl</option>
                        <option value="cd">CD</option>
                        <option value="merchandising">Merchandising</option>
                      </select>
                    </div>
                    <div className="admin-product-modal--line">
                      <label htmlFor="category">{t("Product category")}</label>
                      <input
                        name="category"
                        type="text"
                        required
                        onChange={(e) =>
                          handleChange(e.target.name, e.target.value)
                        }
                      />
                    </div>
                    <div className="admin-product-modal--line">
                      <label htmlFor="characteristics">
                        {t("Product characteristics")}
                      </label>
                      <input
                        name="characteristics"
                        type="text"
                        required
                        onChange={(e) =>
                          handleChange(e.target.name, e.target.value)
                        }
                      />
                    </div>
                    <div className="admin-product-modal--line">
                      <label htmlFor="price">{t("Product price")}</label>
                      <input
                        name="price"
                        type="number"
                        required
                        onChange={(e) =>
                          handleChange(e.target.name, e.target.value)
                        }
                      />
                    </div>
                    <div className="admin-product-modal--line">
                      <label htmlFor="description">
                        {t("Product description")}
                      </label>
                      <textarea
                        name="description"
                        onChange={(e) =>
                          handleChange(e.target.name, e.target.value)
                        }
                      />
                    </div>
                    <div className="admin-product-modal--line">
                      <label htmlFor="tracklist">
                        {t("Product tracklist")}
                      </label>
                      <textarea
                        name="tracklist"
                        onChange={(e) =>
                          handleChange(e.target.name, e.target.value)
                        }
                      />
                    </div>
                    {error !== "" && <div className="error">{error}</div>}
                    <div className="admin-product-modal--line">
                      <button className="button" onClick={(e) => addProduct(e)}>
                        {t("Add to shop")}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          );
};

export default AdminProductModal;