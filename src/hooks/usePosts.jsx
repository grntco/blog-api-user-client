import useFetch from "./useFetch";

const usePosts = () => {
  const url = "http://localhost:3000/posts";
  return useFetch(url);
};

export default usePosts;
