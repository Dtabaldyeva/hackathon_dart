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
  if (action.type === "GET_PRODUCTS_FROM_BASKET") {
    return {
      ...state,
      basketProducts: action.payload,
    };
  }
  return state;
};

function AdminProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, {
    products: [],
    productToEdit: null,
    productDetails: null,
    basketProducts: {
      clothes: [],
      totalPrice: 0,
    },
    basketCount: 0,
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

  const addProductToBasket = (product) => {
    let basket = JSON.parse(localStorage.getItem("basket"));
    if (!basket) {
      basket = {
        totalPrice: 0,
        clothes: [],
      };
    }
    let productToBasket = {
      ...product,
      count: 1,
      subPrice: product.price,
    };

    let check = basket.clothes.find((item) => {
      return item.id === productToBasket.id;
    });
    if (check) {
      basket.clothes = basket.clothes.map((item) => {
        if (item.id === productToBasket.id) {
          item.count++;
          item.subPrice = item.count * item.price;
          return item;
        }
        return item;
      });
    } else {
      basket.clothes.push(productToBasket);
    }
    basket.totalPrice = basket.clothes.reduce((prev, item) => {
      return prev + item.subPrice;
    }, 0);
    localStorage.setItem("basket", JSON.stringify(basket));
    getBasketCount();
  };

  const getProductsFromBasket = () => {
    let basket = JSON.parse(localStorage.getItem("basket"));
    let action = {
      type: "GET_PRODUCTS_FROM_BASKET",
      payload: basket,
    };
    dispatch(action);
  };

  const getPrices = () => {
    fetch(productsApi)
      .then((res) => res.json())
      .then((data) => {
        data.sort((a, b) => a.price - b.price);
        let max = data[data.length - 1].price;
        let min = data[0].price;
        setFilterByPrice([min, max]);
        setMinMax([min, max]);
      });
  };

  const getBasketCount = () => {
    let basket = JSON.parse(localStorage.getItem("basket"));
    if (!basket) {
      basket = {
        clothes: [],
      };
    }
    let action = {
      type: "GET_BASKET_COUNT",
      payload: basket.clothes.length,
    };
    dispatch(action);
  };

  React.useEffect(() => {
    getPrices();
    getBasketCount();
  }, []);

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

    basketProducts: state.basketProducts,
    basketCount: state.basketCount,
    addProductToBasket,
    getProductsFromBasket,
  };
  return <AdminContext.Provider value={data}>{children}</AdminContext.Provider>;
}

export default AdminProvider;
