import styled from "styled-components";
// import { popularProducts } from "../data";
// import Product from "./Product";
import { Link } from "react-router-dom";

const Container = styled.div`
  padding: 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  font-size: 60px;
  font-weight: 800;
`;

// const Link = styled.link`
//   color: blue;
// `;

const Products = () => {
  return (
    <Container>
      <Link className="link" to={`/productlist`}>
        All products
      </Link>
    </Container>
  );
};

export default Products;
