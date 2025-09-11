import styles from "./PostsList.module.css";
import { Link } from "react-router";
import { format } from "date-fns";
import useFetch from "../../hooks/useFetch";

const PostItem = ({ post }) => {
  return (
    <li className={styles.listItem}>
      <Link to={"/blog/" + post.slug} className={styles.link}>
        <span className={styles.date}>{format(post.createdAt, "LL.dd")}</span>
        <h3 className={styles.title}>{post.title}</h3>
      </Link>
    </li>
  );
};

const PostsList = () => {
  const { data, error, loading } = useFetch("http://localhost:3000/posts");

  if (loading) return "loading...";
  if (error) return "error";

  const posts = data.posts ?? [];

  return (
    <ul className={styles.list}>
      {posts.map((post, index) => {
        return <PostItem key={index} post={post} dateFormat={"LL.dd"} />;
      })}
    </ul>
  );
};

export default PostsList;
