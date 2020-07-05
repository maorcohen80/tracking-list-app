export const fetchProducts = async () => {
  let http = await fetch('https://fakestoreapi.com/products');
  let products = await http.json();
  console.log("products", products)
  return products;
}