import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addOrUpdateCategoryAction } from "../../redux/category/categoryAction";
import slugify from "slugify";

function NewCategory() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    status: "inactive",
  });

  const handleOnChange = (e) => {
    let { name, value, checked } = e.target;
    console.log(name, value, checked);
    if (name === "status") {
      value = checked ? "active" : "inactive";
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    // Create a slug for the given category
    const slug = slugify(formData.name, {
      lower: true,
      trim: true,
    });
    // Pass the value to DB
    dispatch(addOrUpdateCategoryAction({ ...formData, slug }));
  };

  return (
    <div className="border py-3 px-2 rounded-1 mx-3 shadow-lg">
      <Form onSubmit={handleOnSubmit}>
        <Row>
          <Col md="2">
            <Form.Check
              type="switch"
              label="Status"
              name="status"
              onChange={handleOnChange}
            />
          </Col>
          <Col md="6">
            <Form.Group className="mb-3">
              <Form.Control
                required
                type="text"
                name="name"
                placeholder="Category name"
                onChange={handleOnChange}
              />
              <Form.Text className="text-muted">
                {`Slug: ${slugify(formData?.name || "")}`}
              </Form.Text>
            </Form.Group>
          </Col>
          <Col md="4">
            <Button type="submit">Add Category</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default NewCategory;
