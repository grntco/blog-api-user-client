import formatDate from "../../utils/formatDate";
import styles from "./PostContent.module.css";

const PostContent = ({ post }) => {
  return (
    <article>
      <div className={styles.header}>
        <div className={styles.date}>{formatDate(post.createdAt)}</div>
        <h1>{post.title}</h1>
        <div className={styles.author}>
          By {post.author.firstName + " " + post.author.lastName}
        </div>
      </div>
      <div className={styles.content}>{post.content}</div>
    </article>
  );
};

export default PostContent;
