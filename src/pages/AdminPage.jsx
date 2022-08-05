import React from "react";
import { AdminContext } from "../contexts/AdminProvider";
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

function AdminPage() {
  const { getProducts, products, deleteProduct } = React.useContext(AdminContext);

  React.useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="admin-page">
      <Container>
        <h2>Админ панель</h2>
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
