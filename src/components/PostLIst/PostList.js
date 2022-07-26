import React, { useState } from "react";
import { useQuery } from "react-query";
import { getAllPosts } from "../../api";
import Filter from "../Filter";
import PostItem from "./PostItem";
function PostList() {
  const { data, isLoading } = useQuery("posts", getAllPosts);
  const [filter,setFilter]= useState("")

  if (isLoading) {
    return <span>Loading...</span>;
  }

  const handleFilter = (name) =>{
    setFilter(name)
  }
  const handleData = () =>{
    if(filter.length !== 0){
      return data.filter((el) => el.title.includes(filter) || el.body.includes(filter)) 
    }
    return data 
  }


  return (
    <div>
      <Filter getValueFilter={handleFilter} />
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
          {handleData().length > 0 ? (
            handleData().map(({ id, userid, title, body }) => (
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
