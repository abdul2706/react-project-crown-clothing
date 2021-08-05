import React from "react";
import { connect } from "react-redux";

// import "./checkout-item.styles.scss";
import {
    CheckoutItemContainer,
    ImageContainer,
    TextContainer,
    QuantityContainer,
    RemoteButtonContainer,
} from "./checkout-item.styles";

import {
    clearItemFromCart,
    addItem,
    removeItem,
} from "../../redux/cart/cart.actions";

const CheckoutItem = ({ cartItem, clearItem, addItem, removeItem }) => {
    const { name, imageUrl, price, quantity } = cartItem;
    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt="item" />
            </ImageContainer>
            <TextContainer>{name}</TextContainer>
            <QuantityContainer>
                <div onClick={() => removeItem(cartItem)}>&#10094;</div>
                <span>{quantity}</span>
                <div onClick={() => addItem(cartItem)}>&#10095;</div>
            </QuantityContainer>
            <TextContainer>{price}</TextContainer>
            <RemoteButtonContainer onClick={() => clearItem(cartItem)}>
                &#10005;
            </RemoteButtonContainer>
        </CheckoutItemContainer>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        clearItem: (item) => dispatch(clearItemFromCart(item)),
        addItem: (item) => dispatch(addItem(item)),
        removeItem: (item) => dispatch(removeItem(item)),
    };
};

export default connect(null, mapDispatchToProps)(CheckoutItem);
