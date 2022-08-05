import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Product from "../components/Product";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { AdminContext } from "../contexts/AdminProvider";
import { Pagination } from "@mui/material";
import { Search } from "@material-ui/icons";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const ProductList = () => {
  const {
    getProducts,
    products,
    pagesCount,
    currentPage,
    setCurrentPage,
    filterByPrice,
    setFilterByPrice,
  } = React.useContext(AdminContext);

  React.useEffect(() => {
    getProducts();
  }, []);

  React.useEffect(() => {
    getProducts();
  }, [filterByPrice, currentPage]);

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>Products</Title>
      <SearchContainer>
        <Input placeholder="Search" />
        <Search style={{ color: "gray", fontSize: 16 }} />
      </SearchContainer>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select>
            <Option disabled selected>
              Color
            </Option>
            <Option>White</Option>
            <Option>Black</Option>
            <Option>Red</Option>
            <Option>Blue</Option>
            <Option>Yellow</Option>
            <Option>Green</Option>
          </Select>
          <Select>
            <Option disabled selected>
              Size
            </Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select>
            <Option selected>Newest</Option>
            <Option>Price (asc)</Option>
            <Option>Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>

      <Container>
        {products.map((item) => (
          <Product item={item} key={item.id} />
        ))}
      </Container>

      <Pagination
        onChange={(_, newValue) => setCurrentPage(newValue)}
        count={pagesCount}
        variant="outlined"
        shape="rounded"
      />

      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;
