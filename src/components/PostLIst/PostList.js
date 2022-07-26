import React from "react";
import { useQuery } from "react-query";
import { getAllPosts } from "../../api";
import PostItem from "./PostItem";
function PostList() {
  
  const { data, isLoading } = useQuery("posts", getAllPosts);

  if (isLoading) {
    return <span>Loading...</span>;
  }
  return (
    <div>
      <table className="table table-bordered mt-3">
        <thead className="text-center bg-light">
          <tr>
            <th>#</th>
            <th>userId</th>
            <th>Title</th>
            <th>Body</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map(({ id, userid, title, body }) => (
              <PostItem
                key={id}
                id={id}
                userid={userid}
                title={title}
                body={body}
              />
            ))
          ) : (
            <span className="text-center">No Post Now !!!</span>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PostList;
