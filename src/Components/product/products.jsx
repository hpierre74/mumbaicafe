import React from 'react';
import Admin from '../forms/admin.jsx';
import Editbis from '../forms/editbis.jsx';
import Create from '../forms/create.jsx';

const ProductList = {
    saké:{
        price4cl:'',
        price12cl:'',
        description:'',
        name:'',
        id:''
    },
    singlePrice:{
        price:'',
        name:'',
        description:'',
        id:''
    },
    basic:{
        price:'',
        name:'',
        id:''
    }
}

const Products = (props) => {
    const { data, name, isAdmin, category, type } = props;

    let priceSelect = (product) => {
        if(product.price) {
            return(
            <span className='product-price'>{ product.price }</span>)
        } else if(product.price2cl) {
            return(
            <div className='product-prices'>
                <span className='product-price'>2cl...{ product.price2cl }</span>
                <span className='product-price'>4cl...{ product.price4cl }</span>
            </div>)
        } else if(product.price12cl) {
            return(
            <div className='product-prices'>
                <span className='product-price'>4cl...{ product.price4cl }</span>
                <span className='product-price'>12cl...{ product.price12cl }</span>
            </div>)}
    }

    const renderProductsList = (data,productKey) => {
        return  Object.values(data).map((product, index) => {          
            return(
                <div className={category+'-item'} key={index}>
                    <div>                    
                        <h4>{ product.name }</h4>
                        {(product.from)?<p>from {product.from}</p>:''}
                        { priceSelect(product) }
                        {(product.description!==undefined)?<p className={category+'-description'}>{product.description}</p>:''}
                    </div>                   
                    <Admin>
                        <p> { name+'/'+productKey+'/'+index } </p>
                        <Editbis category={category} path={'/'+(type==='nested')?name+'/'+productKey:name} entry={index+1} data={product}/>
                    </Admin>
                </div>
            );
        });  
    }
    const renderProductsNestedLists = (data) => {
        return  Object.keys(data).map((productKey, index) => {
            return (
                <div key={index}>
                    <div>
                        <h4>{productKey}</h4>
                        { renderProductsList(data[productKey],productKey) }
                    </div>
                    <div>
                        <Create type='' category={category} path={name +'/'+ productKey +'/'+ data[productKey].length} products={data[productKey]} />
                    </div>
                </div>
            )
        })
    }

    // const renderProducts = () => {
    //     return(
    //         <div>
    //             { (type==='basic')?renderProductsList(data):renderProductsNestedLists(data) }
    //         </div>
    //     )
    // }

    return (
        <div className='products'>
            <h2 className='products-name'>{ name }</h2>
            { (type==='basic')?renderProductsList(data):renderProductsNestedLists(data) }
        </div>
    );
};

export default Products;

