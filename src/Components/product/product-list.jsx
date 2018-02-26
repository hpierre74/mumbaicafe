import React, { Component } from 'react';
import { Product } from './product.jsx';

class ProductList extends Component {
    constructor(props) {
        super(props);
        this.name = this.props.name;
        this.category = this.props.category;
        this.data = this.props.data;
        this.type = this.props.product;

    }



    renderProductList(data) {
        return  Object.values(this.data[this.product]).map((product, index) => {
            return (
                <Product
                key={index}
                id={index}
                product={product}
                category={this.category}
                isAdmin={this.props.isAdmin}
                name={this.name}
                type={this.type}
                />
            );
        });
    }
    
    render() {
        return (
            <div>
                { this.renderProductList(this.data) }
            </div>
        );
    }
}

export default ProductList;
