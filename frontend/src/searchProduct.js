async function searchProduct(listId, searchTerm) {
  // const options = {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     categoryName: this.newCategoryName,
  //   }),
  // }
  // }
  const res = await fetch(`http://localhost:3000/api/selectedProduct/${listId}`)
  const products = await res.json()
  return products.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase()),
  )
}

export default searchProduct
