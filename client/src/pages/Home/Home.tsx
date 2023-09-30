import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Page, ProductPreviewCard } from "../../components";
import { ServiceAPI } from "../../infrastructure";
import "./Home.style.scss";
import "./HomeDarkMode.scss";

function Home() {
  const [products, setProducts] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const json = await ServiceAPI.fetchProducts();
      setProducts(json.data.products);
    };

    fetchData();

    // Check for dark mode preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);

    // Listen for changes in the prefers-color-scheme and update the state accordingly
    const listener = (event) => {
      setIsDarkMode(event.matches);
    };

    mediaQuery.addListener(listener);

    // Clean up the listener when the component unmounts
    return () => {
      mediaQuery.removeListener(listener);
    };

  }, []);

  return (
    <Page>
      <div className={`home-page ${isDarkMode ? 'adaptive' : ''}`}>
        <h1 style={{ fontFamily: 'Cursive', fontSize: '1.50rem', margin: '8px 0' }} className="home-page__title">Home</h1>
        <p>Hello, world!</p>
        <h2>Products:</h2>
        <div className="home-page__products">
          {products.map((product) => (
            <Link to={`/products/${product.id}`} key={`${product.id}`}>
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
      </div>
    </Page>
  );
}

export default Home;
