import { useState } from "react";
import useMutation from "../../hooks/api/useMutation.jsx";
import styles from "./Comment.module.css";

const CommentForm = ({ postId }) => {
  const [comment, setComment] = useState("");
  const { mutate, loading, error } = useMutation();

  // TODO: Check if user is signed in, if not, display sign in option
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newComment = await mutate(
        `http://localhost:3000/posts/${postId}/comments`,
        "post",
        {
          content: comment,
        }
      );
      console.log(newComment);
    } catch (err) {
      console.log(err);
    }

    setComment("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <textarea
        onChange={(e) => setComment(e.target.value)}
        rows={4}
        className={styles.textarea}
      ></textarea>
      <button type="submit" className="btn">
        {loading ? "Posting..." : "Post"}
      </button>
    </form>
  );
};

export default CommentForm;
