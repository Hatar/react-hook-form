import React from "react";
import { useQuery } from 'react-query'
import { getAllPosts } from '../../api'
import { formatBody } from '../../helper'
function PostList() {
    const { data, isLoading} = useQuery('posts',getAllPosts)
    
    if(isLoading){
        return <span>Loading...</span>
    }

    const rows =  data.length > 0 ? (
        data.map((post,index) => {
            return (
                <tr key={index}>
                    <td>{post.id}</td>
                    <td>{post.userId}</td>
                    <td>{post.title}</td>
                    <td>{ formatBody(post.body)}</td>
                    <td>
                        <button className="btn btn-sm btn-success mx-2">Edit</button>
                        <button className="btn btn-sm btn-danger">Delete</button>
                    </td>
                </tr>
            )
        })
    ) :  <span>NO Data !!!</span> 
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
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}

export default PostList;
