import { createContext, useState } from "react";

export const PostContext = createContext(null);

function Post({ children }) {
  const [postDetials, setPostDetials] = useState();
  return (
    <PostContext.Provider value={{ postDetials, setPostDetials }}>
      {children}
    </PostContext.Provider>
  );
}
export default Post;
