import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Table, ButtonToolbar, Button, Alert } from "react-bootstrap";

const URL = "https://pure-sierra-38607.herokuapp.com/api";

const CategorySchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  imgUrl: Yup.string()
});

const Categories = () => {
  const [categories, setCategories] = useState({
    new: false,
    show: false,
    data: []
  });
  useEffect(() => {
    Axios.get(`${URL}/category`).then(resp => {
      console.log(resp.data);
      setCategories({ data: resp.data });
    });
  }, []);
  const DeleteHandle = id => {
    Axios.delete(`${URL}/category/${id}`).then(resp => {
      Axios.get(`${URL}/category`).then(data => {
        const newState = JSON.parse(JSON.stringify(categories));
        newState.data = data.data;
        setCategories(newState);
      });
    });
  };
  const newHandle = () => {
    const newState = JSON.parse(JSON.stringify(categories));
    newState.new = true;
    setCategories(newState);
  };
  const SubmitHandle = (values, setSubmitting) => {
    console.log(values);
    Axios.post(`${URL}/category`, values).then(resp => {
      const newState = JSON.parse(JSON.stringify(categories));
      newState.show = true;
      newState.new = false;
      setCategories(newState);
      setTimeout(() => {
        const newState = JSON.parse(JSON.stringify(categories));
        newState.show = false;
        setCategories(newState);
      }, 1500);
    });
  };

  const form = (
    <div className="container">
      <hr></hr>
      <div className="row mx-5">
        <div className="col-lg-12 text-center">
          <h1 className="mt-5">Add a new Category</h1>
          <hr></hr>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <Formik
            initialValues={{ name: "", imgUrl: "" }}
            validationSchema={CategorySchema}
            onSubmit={SubmitHandle}
          >
            {({ touched, errors, isSubmitting }) => (
              <Form>
                <div className="form-group">
                  <label htmlFor="name">Category Name</label>
                  <Field
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter Suitable Name"
                    className={`form-control ${
                      touched.name && errors.name ? "is-invalid" : ""
                    }`}
                  />
                  <ErrorMessage
                    component="div"
                    name="name"
                    className="invalid-feedback"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="imgUrl">Image Url</label>
                  <Field
                    type="text"
                    name="imgUrl"
                    placeholder="Enter Suitable Url for an image"
                    className={`form-control ${
                      touched.imgUrl && errors.imgUrl ? "is-invalid" : ""
                    }`}
                  />
                  <ErrorMessage
                    component="div"
                    name="imgUrl"
                    className="invalid-feedback"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Please wait..." : "Submit"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
  return (
    <div className="container">
      <h1>Available Categories</h1>
      <div className="row">
        <div className="col-4 mb-2">
          <button onClick={newHandle} className="btn btn-primary">
            <i className="fas fa-plus mr-2"></i>New Category
          </button>
        </div>
      </div>
      <div className="table-responsive">
        <Table bordered hover>
          <thead>
            <tr>
              <th>Category Name</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {categories.data.map(categ => (
              <tr key={categ._id}>
                <td>{categ.name}</td>
                <td>
                  <ButtonToolbar>
                    <Button
                      onClick={() => DeleteHandle(categ._id)}
                      variant="outline-danger"
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </ButtonToolbar>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      {categories.show ? (
        <Alert variant="success" dismissible>
          <p>Succeed</p>
        </Alert>
      ) : null}
      {categories.new ? form : null}
    </div>
  );
};

export default Categories;
