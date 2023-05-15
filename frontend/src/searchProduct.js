async function searchProduct(searchTerm) {
  const res = await fetch(`http://localhost:3000/api/product/${searchTerm}`)
  const products = await res.json()
  console.log('I SEARCH: ', products)
  return products
}

export default searchProduct
