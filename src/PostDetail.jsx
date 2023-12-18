/* eslint-disable react/prop-types */
import { useQuery, useMutation } from "react-query";

async function fetchComments(postId) {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
    );
    return response.json();
  }
  
  async function deletePost(postId) {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/postId/${postId}`,
      { method: "DELETE" }
    );
    return response.json();
  }
  
  async function updatePost(postId) {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/postId/${postId}`,
      { method: "PATCH", data: { title: "REACT QUERY UPDATE" } }
    );
    return response.json();
  }
  
  export function PostDetail({ post }) {
    const { data, isError, error, isLoading } = useQuery(["comments", post.id], () => fetchComments(post.id));

    const deleteMutation = useMutation((postId) => deletePost(postId));

    const updateMutation = useMutation((postId) => updatePost(postId));

    if(isLoading) {
      return (<h3>Loading Post Details...</h3>)
    }

    if(isError) return <><h3>Error</h3><p>{error.toString()}</p></>
  
    return (
      <>
        <h3 style={{ color: "blue" }}>{post.title}</h3>
        <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>
        {deleteMutation.isError && <p style={{color: 'red'}}>Error deleting the post</p>}
        {deleteMutation.isLoading && <p style={{color: 'purple'}}>Deleting post</p>}
        {deleteMutation.isSuccess && <p style={{color: 'green'}}>Post has (not) been deleted</p>}
        <button>Update title</button>
        {updateMutation.isError && <p style={{color: 'red'}}>Error updating the title</p>}
        {updateMutation.isLoading && <p style={{color: 'purple'}}>Updating title</p>}
        {updateMutation.isSuccess && <p style={{color: 'green'}}>Title has (not) been updated</p>}
        <p>{post.body}</p>
        <h4>Comments</h4>
        {data.map((comment) => (
          <li key={comment.id}>
            {comment.email}: {comment.body}
          </li>
        ))}
      </>
    );
  }
  