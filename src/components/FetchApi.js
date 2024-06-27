import React, { Component } from 'react'

export default class FetchApi extends Component {
    constructor(){
        super();
        this.state = {
            products: []
        };
    }

    componentDidMount(){
        console.log("inside compmount");

        fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>this.setState({
                products: json
            }))
    }
  render() {
    console.log("products are:", this.state.products);
    return (
        <>
      <div>
      <h1>Product List</h1>
        <div className="product-list">
          {this.state.products.map(product => (
            <div key={product.id} className="product">
              <h2>{product.title}</h2>
              <img src={product.image} alt={product.title} style={{ width: '100px', height: '100px' }} />
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
            </div>
          ))}
        </div>
      </div>
      </>
    )
  }
}
