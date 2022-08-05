import React from "react";
import {
  Container,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
// import styled from "styled-components";
// import { mobile } from "../responsive";
import { AdminContext } from "../contexts/AdminProvider";

// const Container = styled.div`
//   height: 60px;
//   ${mobile({ height: "50px" })}
// `;

// const MenuItem = styled.div`
//   font-size: 14px;
//   cursor: pointer;
//   margin-left: 25px;
//   ${mobile({ fontSize: "12px", marginLeft: "10px" })}
// `;

// const InputLabel = styled.input`
//   border: none;
//   ${mobile({ width: "50px" })}
// `;

// const TextField = styled.div`
//   font-size: 14px;
//   cursor: pointer;
//   margin-left: 25px;
//   ${mobile({ fontSize: "12px", marginLeft: "10px" })}
// `;

// const FormControl = styled.div`
//   font-size: 14px;
//   cursor: pointer;
//   margin-left: 25px;
//   ${mobile({ fontSize: "12px", marginLeft: "10px" })}
// `;
// const Select = styled.div``;
// const Button = styled.button``;

function AdminAddPage() {
  const { sendNewProduct } = React.useContext(AdminContext);

  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [color, setColor] = React.useState("");
  const [img, setImg] = React.useState("");
  const [desc, setDesc] = React.useState("");

  const handleSubmit = () => {
    const newProduct = {
      name: name.trim(),
      price,
      color: color.trim(),
      img: img.trim(),
      desc: desc.trim(),
    };
    for (let i in newProduct) {
      if (!newProduct[i]) {
        alert("Заполните!");
        return;
      }
    }
    sendNewProduct(newProduct);
    setName("");
    setPrice("");
    setColor("");
    setImg("");
    setDesc("");
  };

  return (
    <div className="admin-add-page">
      <Container>
        <h2>Add products</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Product type"
            variant="standard"
          />
          <TextField
            value={price}
            onChange={(e) => setPrice(parseInt(e.target.value))}
            label="Price"
            variant="standard"
            type="number"
          />
          <FormControl variant="standard">
            <InputLabel>Color</InputLabel>
            <Select
              value={color}
              onChange={(e) => setColor(e.target.value)}
              label="Color"
            >
              <MenuItem value="white">White</MenuItem>
              <MenuItem value="black">Black</MenuItem>
              <MenuItem value="red">Red</MenuItem>
              <MenuItem value="blue">Blue</MenuItem>
              <MenuItem value="yellow">Yellow</MenuItem>
              <MenuItem value="green">Green</MenuItem>
            </Select>
          </FormControl>
          <TextField
            value={img}
            onChange={(e) => setImg(e.target.value)}
            label="Picture"
            variant="standard"
          />
          <TextField
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            label="Description"
            variant="standard"
          />

          <Button variant="outlined" type="submit">
            Добавить
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default AdminAddPage;
