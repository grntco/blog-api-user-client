import { useState } from "react";
import useMutation from "../../hooks/api/useMutation.jsx";
import styles from "./Comment.module.css";
import useAuth from "../../hooks/auth/useAuth.jsx";
import { Link } from "react-router";
import getApiUrl from "../../utils/getApiUrl.js";

const CommentForm = ({ postId, setComments }) => {
  const [content, setContent] = useState("");
  const { mutate, loading, error } = useMutation();
  const { user, isLoggedIn } = useAuth();
  const API_BASE_URL = getApiUrl();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) return;

    try {
      const newComment = await mutate(
        `${API_BASE_URL}/posts/${postId}/comments`,
        {
          content: content.trim(),
        },
        {
          method: "POST",
        }
      );

      if (!error && newComment) {
        setComments((prevComments) => [
          ...prevComments,
          {
            content: content.trim(),
            author: { firstName: user.firstName, lastName: user.lastName },
            createdAt: new Date().toISOString(),
          },
        ]);

        setContent("");
      }
    } catch (err) {
      console.error("An error occurred while posting comment:", err);
    }
  };

  {
    if (user && isLoggedIn) {
      return (
        <form onSubmit={handleSubmit} className={styles.form}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className={styles.textarea}
            placeholder="Enter a comment..."
          ></textarea>
          <button type="submit" className="btn">
            {loading ? "Posting..." : "Post"}
          </button>
        </form>
      );
    } else {
      return (
        <p className="info-text">
          Please <Link to={"/login"}>login</Link> to post a comment.
        </p>
      );
    }
  }
};

export default CommentForm;
