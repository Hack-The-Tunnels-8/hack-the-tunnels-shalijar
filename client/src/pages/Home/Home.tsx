import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Page, ProductPreviewCard } from "../../components";
import { ServiceAPI } from "../../infrastructure";
import { useCookies } from "react-cookie";
import "./Home.style.scss";
import "./HomeDarkMode.scss";


function Home() {
  const [products, setProducts] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [recentlyViewedProducts, setRecentlyViewedProducts] = useCookies(["recentlyViewedProducts"]); 

  

  useEffect(() => {
    const fetchData = async () => {
      const json = await ServiceAPI.fetchProducts();
      setProducts(json.data.products);
    };

    fetchData();

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);

    const listener = (event) => {
      setIsDarkMode(event.matches);
    };

    mediaQuery.addListener(listener);

    return () => {
      mediaQuery.removeListener(listener);
    };

  }, []);

  const handleProductClick = (product) => {
    const currentRecentlyViewed = recentlyViewedProducts.recentlyViewedProducts || [];

    const updatedRecentlyViewed = [product, ...currentRecentlyViewed];

    const limitedRecentlyViewed = updatedRecentlyViewed.slice(0, 5);

    setRecentlyViewedProducts("recentlyViewedProducts", limitedRecentlyViewed);
  };

  return (
    <Page>
      <div className={`home-page ${isDarkMode ? 'adaptive' : ''}`}>
        <h1 style={{ fontFamily: 'Cursive', fontSize: '1.50rem', margin: '8px 0' }} className="home-page__title">Shalijar Shop</h1>
        <p>Hello, world!</p>
        <h2>Products:</h2>
        <div className="home-page__products">
          {products.map((product) => (
            <Link
              to={`/products/${product.id}`}
              key={`${product.id}`}
              onClick={() => handleProductClick(product)} // Handle product click
            >
              <ProductPreviewCard
                title={product.title}
                description={product.description}
                price={product.price}
                imageUrl={product.imageUrl}
                key={`${product.id}`}
              />
            </Link>
          ))}
        </div>
        {/* Recently Viewed Products section */}
        <div className="recently-viewed">
          <h2>Recently Viewed Products</h2>
          <div className="recently-viewed-products">
            {recentlyViewedProducts.recentlyViewedProducts &&
              recentlyViewedProducts.recentlyViewedProducts.map((product, index) => (
                <Link to={`/products/${product.id}`} key={index}>
                  <ProductPreviewCard
                    title={product.title}
                    description={product.description}
                    price={product.price}
                    imageUrl={product.imageUrl}
                  />
                </Link>
              ))}
          </div>
        </div>
      </div>
    </Page>
  );
}

export default Home;
