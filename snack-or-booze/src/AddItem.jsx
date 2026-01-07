import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText, Form, FormGroup, Label, Input, Button } from "reactstrap";
import "./Menu.css";
import SnackOrBoozeApi from "./Api";

function AddItem({ refreshData }) {
  const history = useHistory();
  const [formData, setFormData] = useState({
    type: "snack",
    id: "",
    name: "",
    description: "",
    recipe: "",
    serve: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(data => ({
      ...data,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.type === "snack") {
        const { type, ...snackData } = formData;
        await SnackOrBoozeApi.addSnack(snackData);
        await refreshData(); // Refresh the data
        history.push("/snacks");
      } else {
        const { type, ...drinkData } = formData;
        await SnackOrBoozeApi.addDrink(drinkData);
        await refreshData(); // Refresh the data
        history.push("/drinks");
      }
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  return (
    <section className="col-md-6">
      <Card>
        <CardBody>
          <CardTitle className="font-weight-bold text-center">
            Add New Item
          </CardTitle>
          <CardText>
            Add a new snack or drink to the menu.
          </CardText>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="type">Type: </Label>
              <Input
                type="select"
                name="type"
                id="type"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="snack">Snack</option>
                <option value="drink">Drink</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="name">Name: </Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Item name"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description: </Label>
              <Input
                type="textarea"
                name="description"
                id="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Brief description"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="recipe">Recipe: </Label>
              <Input
                type="textarea"
                name="recipe"
                id="recipe"
                value={formData.recipe}
                onChange={handleChange}
                placeholder="How to make it"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="serve">Serve: </Label>
              <Input
                type="textarea"
                name="serve"
                id="serve"
                value={formData.serve}
                onChange={handleChange}
                placeholder="How to serve it"
                required
              />
            </FormGroup>
            <Button color="primary" type="submit">Add Item</Button>
          </Form>
        </CardBody>
      </Card>
    </section>
  );
}

export default AddItem;