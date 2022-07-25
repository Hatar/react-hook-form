import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import PostList from "./components/PostLIst/PostList";
import useForm from "react-hook-form";
import Modal from "./components/Modal";
import ReactModal from "react-modal";
import { addPost } from "./api";
import { useMutation } from "react-query"
import './App.css'
ReactModal.setAppElement("*");

// Messages
const required = "This field is required";
const maxLength = "Your input exceed maximum length";


// Error Component
const errorMessage = error => {
  return <div className="invalid-feedback">{error}</div>;
};

function App() {

  const queryClient = new QueryClient();
  const [openModal, setOpenModal] = useState(false);

  const { mutateCreate,isLoading } = useMutation(addPost)

  const { register, errors, handleSubmit } = useForm();
  const onSubmit = (data) => {
    mutateCreate(data)
    setOpenModal(false)
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="container mt-5">
        <button
          className="btn btn-sm btn-primary float-end mb-3"
          onClick={() => setOpenModal(true)}
        >
          Add Post
        </button>
        <Modal show={openModal} closeModal={() => setOpenModal(false)}>
          <h4>Create New Post</h4>
          <div className="container">
            <div className="col-md-12">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <label className="mb-2">User Id :</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="userid"
                    name="userid"
                    ref={register({ required: true, maxLength: 13 })}
                  />
                  {errors.userid &&
                    errors.userid.type === "required" &&
                    errorMessage(required)}
                  {errors.userid &&
                    errors.userid.type === "maxLength" &&
                    errorMessage(maxLength)}
                </div>
                <div className="form-group my-3">
                  <label className="mb-2">Title :</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Title"
                    name="title"
                    ref={register({ required: true, maxLength: 50 })}
                  />
                  {errors.title &&
                    errors.title.type === "required" &&
                    errorMessage(required)}
                  {errors.title &&
                    errors.title.type === "maxLength" &&
                    errorMessage(maxLength)}
                </div>
                <div className="form-group">
                  <label className="mb-2">Body :</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="body"
                    name="body"
                    ref={register({ required: true, maxLength: 50 })}
                  />
                  {errors.body &&
                    errors.body.type === "required" &&
                    errorMessage(required)}
                  {errors.body &&
                    errors.body.type === "maxLength" &&
                    errorMessage(maxLength)}
                </div>
                <div className="form-group mt-3">
                  <button type="submit" className="btn  btn-primary">
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Modal>
        <PostList />
      </div>
    </QueryClientProvider>
  );
}

export default App;
