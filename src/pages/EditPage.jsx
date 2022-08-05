import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AdminContext } from "../contexts/AdminProvider";
import {
  Container,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";





function EditPage() {
  const { getProductToEdit, productToEdit, saveEditedProduct } =
    React.useContext(AdminContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [color, setColor] = React.useState("");
  const [image, setImg] = React.useState("");
  const [desc, setDesc] = React.useState("");

  const handleSubmit = () => {
    const editedProduct = {
      name,
      color,
      image,
      desc,
      price,
      id
    };
    for (let i in editedProduct) {
      if (typeof editedProduct[i] === "string") {
        if (!editedProduct[i].trim()) {
          alert("Fill in the gaps ");
          return;
        }
      }
    }
    saveEditedProduct(editedProduct);
    navigate("/admin");
  };

  React.useEffect(() => {
    getProductToEdit(id);
  }, []);

  React.useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name);
      setPrice(productToEdit.price);
      setColor(productToEdit.color);
      setImg(productToEdit.img);
      setDesc(productToEdit.desc);
    }
  }, [productToEdit]);

  return (
    <div className="admin-edit-page">
      <Container>
        <h2>Edit</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Name"
            variant="standard"
          />
          <TextField
            value={price}
            onChange={(e) => setPrice(parseInt(e.target.value))}
            label="Price"
            variant="standard"
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
            value={image}
            onChange={(e) => setImg(e.target.value)}
            label="Choose image"
            variant="standard"
          />
          <TextField
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            label="Description"
            variant="standard"
          />
          <Button variant="outlined" type="submit">
            Save
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default EditPage;
