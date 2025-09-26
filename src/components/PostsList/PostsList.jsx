import styles from "./PostsList.module.css";
import { Link, useParams } from "react-router";
import formatDate from "../../utils/formatDate";
import useFetch from "../../hooks/api/useFetch";
import { useState, useEffect } from "react";
import PagesList from "../PagesList/PagesList";
import NotFound from "../../pages/NotFound";

const PostItem = ({ post }) => {
  return (
    <li className={styles.post}>
      <Link to={`/blog/${post.id}/${post.slug}`} className={styles.link}>
        <span className={styles.date}>{formatDate(post.createdAt)}</span>
        <h3 className={styles.title}>{post.title}</h3>
      </Link>
    </li>
  );
};

const PostsList = () => {
  const { page } = useParams();
  const urlBase = `http://localhost:3000/posts/published${
    page && page > 1 ? `?page=${page}` : ""
  }`;
  const [url, setUrl] = useState(urlBase);
  const { data, error, loading } = useFetch(url);

  useEffect(() => {
    if (!url.includes("search=")) {
      setUrl(urlBase);
    }
  }, [page, urlBase]);

  if (loading) return "loading...";
  if (error) return <NotFound />;

  const posts = data.posts ?? [];
  // const prevSearch = data.formData?.search;
  const pageData = {
    currentPage: data.meta?.currentPage,
    totalPages: data.meta?.totalPages,
  };

  return (
    <div className={styles.listContainer}>
      <ul className={styles.postsList}>
        {posts.map((post, index) => {
          return <PostItem key={index} post={post} />;
        })}
      </ul>
      <PagesList
        path={"blog"}
        pageData={pageData}
        urlBase={urlBase}
        setUrl={setUrl}
      />
    </div>
  );
};

export default PostsList;
