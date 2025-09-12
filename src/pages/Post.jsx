import useFetch from "../hooks/api/useFetch";
import { useParams } from "react-router";
import formatDate from "../utils/formatDate";
import CommentsList from "../components/Comments/CommentsList";
import CommentForm from "../components/Comments/CommentForm";

const Post = () => {
  const { postId } = useParams();
  const url = `http://localhost:3000/posts/${postId}`;
  const { data, error, loading } = useFetch(url);

  if (loading) return "loading...";
  if (error) return "error";

  console.log(data);
  const post = data;

  return (
    <>
      <article>
        <div className="postInfo">
          <span className="postDate">{formatDate(post.createdAt)}</span>
          <h1>{post.title}</h1>
          <span className="postAuthor">
            By {post.author.firstName + " " + post.author.lastName}
          </span>
        </div>
        <div className="postContent">{post.content}</div>
      </article>
      <CommentsList comments={post.comments} />
      <CommentForm postId={postId} />
    </>
  );
};

export default Post;
