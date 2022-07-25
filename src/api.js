export const getAllPosts = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_SERVER}/posts`);
  if (!response.ok) {
    throw new Error("Something went wrong.");
  }
  return response.json();
};

export const addPost = async (data) => {
  const response = await fetch(`${process.env.REACT_APP_API_SERVER}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(response.json().message);
  }
  return response.json();
};

export const updateBook = async ({ id, ...data }) => {
  const response = await fetch(`${process.env.REACT_APP_API_SERVER}/posts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(response.json().message);
  }
  return response.json();
};

export const removePost = async (id) => {
  const response = await fetch(`${process.env.REACT_APP_API_SERVER}/posts/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Something went wrong.");
  }
  return true;
};
