import React,{useState} from "react";
import { formatBody } from "../../helper";
import { useMutation, useQueryClient } from "react-query";
import { removePost,updatePost } from "../../api";
import useForm from "react-hook-form";
import Modal from "../Modal";
function PostItem({ key, id, userid, title, body }) {

  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation(removePost);

  const { mutate } = useMutation(updatePost)
  
  const [show, setShow] = useState(false);
  const [post, setPost] = useState({});

  // Messages
  const required = "This field is required";
  const maxLength = "Your input exceed maximum length";

  // Error Component
  const errorMessage = (error) => {
    return <div className="invalid-feedback">{error}</div>;
  };

  
  const { register, errors, handleSubmit,reset } = useForm({
    defaultValues: {...(post ? post : null) }
  });

  
  const handleDelete = async () => {
    await mutateAsync(id);
    queryClient.invalidateQueries("posts");
  };

  const editPost = (payload) => {
    setPost(payload)
    setShow(true)
    reset(payload)
  };

  const onSubmit = async (data) => {
    await mutate({...data,id},{
      onSuccess:()=>{
        queryClient.invalidateQueries("posts");
        setShow(false)
        setPost({})
      }
    })
   };

  return (
    <>
      <Modal show={show} closeModal={() => setShow(false)}>
        <h4>Update New Post : {post?.id}</h4>
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
                ref={register({ required: true, maxLength: 255 })}
              />
              {errors.body &&
                errors.body.type === "required" &&
                errorMessage(required)}
              {errors.body &&
                errors.body.type === "maxLength" &&
                errorMessage(maxLength)}
            </div>
            <div className="form-group mt-3">
              <button type="submit" className="btn btn-success">
                Update
              </button>
            </div>
          </form>
        </div>
      </Modal>
      <tr key={key}>
        <td>{id}</td>
        <td>{userid}</td>
        <td>{title}</td>
        <td>{formatBody(body)}</td>
        <td>
          <button
            className="btn btn-sm btn-success mx-2"
            onClick={() => editPost({id,userid,title,body})}
          >
            Edit
          </button>
          <button className="btn btn-sm btn-danger" onClick={handleDelete}>
            Delete
          </button>
        </td>
      </tr>
    </>
  );
}

export default PostItem;
