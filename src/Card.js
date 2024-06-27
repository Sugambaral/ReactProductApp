import React, { Component } from "react";
import Spinner from "./components/Spinner"; // Import the Spinner component
import Navbar from "./components/Navbar"; // Import the Navbar component

export default class Card extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      loading: true, // Add loading state
      currentPage: 1, // Add page state
      productsPerPage: 6, // Define the number of products per page
      searchQuery: "", // Add searchQuery state
    };
  }

  componentDidMount() {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) =>
        this.setState({
          products: json,
          loading: false, // Set loading to false once data is fetched
        })
      );
  }

  handleNext = () => {
    this.setState((prevState) => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  handlePrevious = () => {
    this.setState((prevState) => ({
      currentPage: Math.max(prevState.currentPage - 1, 1),
    }));
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query });
  };

  render() {
    const { products, loading, currentPage, productsPerPage, searchQuery } = this.state;

    // Filter products based on search query
    const filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Calculate the index of the first and last products on the current page
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    return (
      <>
        <Navbar handleSearch={this.handleSearch} />
        <div className="container my-3">
          <h2 className="text-center my-4">Products Items</h2>
          {loading ? (
            // Render spinner while loading
            <div className="d-flex justify-content-center">
              <Spinner />
            </div>
          ) : (
            // Render products once data is loaded
            <>
              <div className="row my-2">
                {currentProducts.map((product) => (
                  <div key={product.id} className="col-lg-4 col-md-6 mb-4">
                    <div className="card card border border-3">
                      <img
                        src={product.image}
                        className="card-img-top"
                        style={{
                          width: "100%",
                          height: "250px",
                          objectFit: "cover",
                        }}
                        alt="Product"
                      />
                      <div className="card-body">
                        <h5 className="card-title">{product.title.slice(0, 45)}...</h5>
                        <p className="card-text">{product.description.slice(0, 85)}...</p>
                        <h5 className="card-price">Price: ${product.price}</h5>
                        <a href="/" className="btn btn-sm btn-primary">
                          Read more
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="d-flex justify-content-between my-4">
                <button
                  className="btn btn-primary"
                  onClick={this.handlePrevious}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <button
                  className="btn btn-primary"
                  onClick={this.handleNext}
                  disabled={indexOfLastProduct >= filteredProducts.length}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </>
    );
  }
}
