import React from "react";
import { AdminContext } from "../contexts/AdminProvider";
import styled from "styled-components";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

function AdminPage() {
  const { getProducts, products, deleteProduct } =
    React.useContext(AdminContext);

  React.useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="admin-page">
      <Container>
        <h2>Админ панель</h2>
        <Top>
          <TopButton>
            <Link to={`/`}>Home</Link>
          </TopButton>
        </Top>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Color</TableCell>
              <TableCell>Picture</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Delete Item</TableCell>
              <TableCell>Edit Item</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.price} сом</TableCell>
                <TableCell>{item.color}</TableCell>
                <TableCell>
                  <img width={100} src={item.img} alt="" />
                </TableCell>
                <TableCell>{item.desc}</TableCell>

                <TableCell>
                  <Delete onClick={() => deleteProduct(item.id)} />
                </TableCell>
                <TableCell>
                  <Link to={`/admin/edit/${item.id}`}>
                    <Edit />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </div>
  );
}

export default AdminPage;
