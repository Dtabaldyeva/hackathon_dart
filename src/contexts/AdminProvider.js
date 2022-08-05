import React from "react";
import { productsApi } from "../helpers/const";

export const AdminContext = React.createContext();

const reducer = (state, action) => {
  if (action.type === "GET_PRODUCTS") {
    return {
      ...state,
      products: action.payload,
    };
  }
  if (action.type === "GET_PRODUCT_TO_EDIT") {
    return {
      ...state,
      productToEdit: action.payload,
    };
  }
  if (action.type === "GET_PRODUCT_DETAILS") {
    return {
      ...state,
      productDetails: action.payload,
    };
  }
  if (action.type === "GET_PRODUCT_COUNT") {
    return {
      ...state,
      basketCount: action.payload,
    };
  }
  return state;
};

function AdminProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, {
    products: [],
    productToEdit: null,
    productDetails: null,
  });

  const sendNewProduct = (newProduct) => {
    fetch(productsApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
  };

  const getProducts = () => {
    fetch(
      `${productsApi}?q=${searchWord}&price_gte=${filterByPrice[0]}&price_lte=${filterByPrice[1]}&_limit=${limit}&_page=${currentPage}`
    )
      // .then((res) => res.json())
      .then((res) => {
        let count = Math.ceil(res.headers.get("X-Total-Count") / limit);

        setPagesCount(count);
        return res.json();
      })
      .then((data) => {
        let action = {
          type: "GET_PRODUCTS",
          payload: data,
        };
        dispatch(action);
      });
  };

  const getProductDetails = (id) => {
    fetch(`${productsApi}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        let action = {
          type: "GET_PRODUCT_DETAILS",
          payload: data,
        };
        dispatch(action);
      });
  };

  const deleteProduct = (id) => {
    fetch(`${productsApi}/${id}`, {
      method: "DELETE",
    }).then(() => getProducts());
  };

  // ! UPDATE - 1 PART
  const getProductToEdit = (id) => {
    fetch(`${productsApi}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        let action = {
          type: "GET_PRODUCT_TO_EDIT",
          payload: data,
        };
        dispatch(action);
      });
  };
  // ! UPDATE - 2 PART
  const saveEditedProduct = (editedProduct) => {
    fetch(`${productsApi}/${editedProduct.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedProduct),
    });
  };

  const [searchWord, setSearchWord] = React.useState("");
  const [filterByPrice, setFilterByPrice] = React.useState([0, 999999]);
  const [minMax, setMinMax] = React.useState([0, 999999]);

  const limit = 4;
  const [pagesCount, setPagesCount] = React.useState(1);
  const [currentPage, setCurrentPage] = React.useState(1);

  const data = {
    products: state.products,
    productToEdit: state.productToEdit,
    productDetails: state.productDetails,
    getProductDetails,
    sendNewProduct,
    getProducts,
    deleteProduct,
    getProductToEdit,
    saveEditedProduct,

    searchWord,
    filterByPrice,
    pagesCount,
    currentPage,
    setSearchWord,
    setFilterByPrice,
    setCurrentPage,
  };
  return <AdminContext.Provider value={data}>{children}</AdminContext.Provider>;
}

export default AdminProvider;
