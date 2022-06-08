import React from 'react';

import './Card.css';

const Card = (props) => {

    const { id, sku, name, category, stock, price, rating, imageURL, description } = props.product;

    return(
        <div className='card'>
            
            <div>
                <img className='card__image' src={imageURL} alt={sku || name} />
            </div>
            
            <h3 className='card__heading'>{name}</h3>
            
            <div className='card__content'>
                <p>Price: {price} ₹</p>
                <p>Stock: {stock}</p>
                <p>Rating: {rating}</p>
                <p>{description}</p>
            </div>
            <p>
                <button type="button" onClick={()=> {
                    props.history.push(`/detail/${id}`)
                }}>More Details
                </button>
            </p> 
            <p>
                <button type="button" onClick={()=> {
                    props.history.push(`/cart`)
                }}>Buy
                </button>
            </p> 
        </div>
    );
}

export default Card;