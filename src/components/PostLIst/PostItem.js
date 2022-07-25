import React from "react";
import { formatBody } from "../../helper";
import { useMutation, useQueryClient } from "react-query";
import { removePost } from "../../api";
function PostItem({ key, id, userId, title, body }) {
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useMutation(removePost);
  const handleDelete = async () => {
    console.log("remove", isLoading);
    await mutateAsync(id);
    queryClient.invalidateQueries("posts");
  };
  return (
    <tr key={key}>
      <td>{id}</td>
      <td>{userId}</td>
      <td>{title}</td>
      <td>{formatBody(body)}</td>
      <td>
        <button className="btn btn-sm btn-success mx-2" onClick={editPost(id)}>
          Edit
        </button>
        <button className="btn btn-sm btn-danger" onClick={handleDelete}>
          Delete
        </button>
      </td>
    </tr>
  );
}

export default PostItem;
