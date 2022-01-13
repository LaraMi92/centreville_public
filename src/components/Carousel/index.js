import React, {useState, useEffect} from 'react';
import './styles.scss';

import leftArrow from '../../assets/icons/arrow-left.svg';
import rightArrow from '../../assets/icons/arrow-right.svg';

const Carousel = ({setModal, pictureNumber, pictureSet}) => {

    const [pictureValue, setPictureValue] = useState(pictureNumber);

    let pictures = pictureSet;
    let picturesLength = pictures.length;

    const prevPictureValue = (num) => num === '' ? setPictureValue(pictureValue - 1) : setPictureValue(picturesLength);
    const nextPictureValue = (num) => num === 0 ? setPictureValue(1) : setPictureValue(pictureValue + 1);


    const closeModal = (event) => {
      if(event.target.id === 'modal-background'){
       setModal(false)
      }
    };

    useEffect(() => {
    }, [pictureValue]);

    
    return (
      <div
        id="modal-background" onClick={(e) => closeModal(e)}
      >
        
        <div className="modal-overlay-carousel">
          <div className="picture">
            <div
              className="left-arrow inner-content"
              onClick={() => {
                pictureValue < 2 ? prevPictureValue(0) : prevPictureValue("");
              }}
            >
              <img src={leftArrow} alt="left arrow" />
            </div>
            <img
              alt="album covers"
              src={Object.values(pictures[pictureValue -1])}
              key={pictureValue}
              className="picture-main inner-content"
            />
            <div
              className="right-arrow inner-content"
              onClick={() => {
                pictureValue < picturesLength ? nextPictureValue("") : nextPictureValue(0);
              }}
            >
              <img src={rightArrow} alt="right arrow" />
            </div>
          </div>
        </div>
        </div>
    );
};

export default Carousel;