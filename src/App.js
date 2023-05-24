import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [page, setPage] = useState(1);
  const Base_url = "https://dummyjson.com/products?limit=100";
  const [products, setProducts] = useState([]);
  const fetchData = async () => {
    const res = await fetch(Base_url);
    const data = await res.json();
    console.log(data.products);
    if (data && data.products) {
      setProducts(data.products);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const selectPage = (e) => {
    if (e >= 1 && e <= products.length / 10 && e !== page) setPage(e);
  };
  return (
    <div>
      {products.length > 0 && (
        <div className="products">
          {products.slice(page * 10 - 10, page * 9).map((prod) => {
            return (
              <div className="products_single " key={prod.id}>
                <img src={prod.thumbnail} />
                <div className="">{prod.title}</div>
              </div>
            );
          })}
        </div>
      )}{" "}
      {products.length > 0 && (
        <div className="pagination">
          <span
            onClick={() => selectPage(page - 1)}
            className={page > 1 ? "" : "pagination_disable"}
          >
            ◄{" "}
          </span>
          {[...Array(products.length / 10)].map((_, i) => {
            return (
              <span
                onClick={() => selectPage(i + 1)}
                className={page === i + 1 ? "pagination_selected" : ""}
              >
                {i + 1}
              </span>
            );
          })}

          <span
            onClick={() => selectPage(page + 1)}
            className={page < products.length / 10 ? "" : "pagination_disable"}
          >
            {" "}
            ►
          </span>
        </div>
      )}
    </div>
  );
}
