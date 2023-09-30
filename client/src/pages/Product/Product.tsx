import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Page } from "../../components";
import { ServiceAPI } from "../../infrastructure";
import "./Product.style.scss";

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const json = await ServiceAPI.fetchProduct(id);
      if (json.error !== null) {
        setMessage(json.error);
        return;
      }

      setProduct(json.data.product);
    };

    fetchData();
  }, []);

  return (
    <Page>
      <div className="product-page">
        {message && <p>{message}</p>}
        {product && (
          <div className="product-container">
            <div className="product-image">
              {product.png}
              <img src={product.imageUrl} alt={product.title} />
            </div>
            <div className="product-details">
              <h3>{product.title}</h3>
              <p>ID: {id}</p>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <Link to={`/checkout/${product.id}`}>
                <button>Buy Now</button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </Page>
  );
}

export default Product;
