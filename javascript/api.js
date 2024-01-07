export let getData = async function () {
  const response = await fetch("http://localhost:3000/products");
  const data = await response.json();
  let listOfData = data;
  return listOfData;
};