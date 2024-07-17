import { useEffect, useState } from "react";

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "flex-end",
  marginTop: "10px",
};

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
};

const postStyle = {
  border: "1px solid #ddd",
  borderRadius: "5px",
  padding: "10px",
  marginBottom: "10px",
  maxWidth: "600px",
  width: "100%",
};

const titleStyle = {
  fontSize: "1.5em",
  marginBottom: "5px",
};

const authorStyle = {
  color: "#888",
  fontSize: "0.9em",
  marginBottom: "10px",
};

const contentStyle = {
  fontSize: "1em",
};

const buttonStyle = {
  padding: "5px 10px",
  cursor: "pointer",
  backgroundColor: "#0070f3",
  color: "white",
  border: "none",
  borderRadius: "3px",
  transition: "background-color 0.3s",
};

const buttonHoverStyle = {
  backgroundColor: "#005bb5",
};
const formStyle = {
  display: "flex",
  flexDirection: "column",
  maxWidth: "600px",
  width: "100%",
  marginBottom: "10px",
};

const inputStyle = {
  marginBottom: "10px",
  padding: "8px",
};

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [editPostId, setEditPostId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3001/posts", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  const handleEditClick = (post) => {
    setEditPostId(post.id);
    setEditTitle(post.title);
    setEditContent(post.content);
  };

  const handleUpdatePost = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3001/posts/${editPostId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: editTitle, content: editContent }),
        }
      );

      if (response.ok) {
        const updatedPost = await response.json();
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === editPostId
              ? {
                  ...post,
                  title: updatedPost.title,
                  content: updatedPost.content,
                  updated_at: updatedPost.updated_at,
                }
              : post
          )
        );
        setEditPostId(null);
        setEditTitle("");
        setEditContent("");
      } else {
        console.error("Error updating post");
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  //   return (
  //     <div style={containerStyle}>
  //       <h1>Posts</h1>
  //       {posts.length > 0 ? (
  //         posts.map((post) => (
  //           <div style={postStyle}>
  //             {editPostId === post.id ? (
  //               <form onSubmit={handleUpdatePost} style={formStyle}>
  //                 <input
  //                   type="text"
  //                   value={editTitle}
  //                   onChange={(e) => setEditTitle(e.target.value)}
  //                   style={inputStyle}
  //                   placeholder="Title"
  //                 />
  //                 <textarea
  //                   value={editContent}
  //                   onChange={(e) => setEditContent(e.target.value)}
  //                   style={inputStyle}
  //                   placeholder="Content"
  //                 />
  //                 <button type="submit" style={buttonStyle}>
  //                   Update
  //                 </button>
  //                 <button
  //                   type="button"
  //                   style={buttonStyle}
  //                   onClick={() => setEditPostId(null)}
  //                 >
  //                   Cancel
  //                 </button>
  //               </form>
  //             ) : (
  //               <>
  //                 <div style={titleStyle}>{post.title}</div>
  //                 <div style={authorStyle}>
  //                   By {post.author} on{" "}
  //                   {new Date(post.created_at).toLocaleDateString()}
  //                 </div>
  //                 <div style={contentStyle}>{post.content}</div>
  //                 <div style={buttonContainerStyle}>
  //                   <button
  //                     style={buttonStyle}
  //                     onMouseOver={(e) =>
  //                       (e.target.style.backgroundColor = "#005bb5")
  //                     }
  //                     onMouseOut={(e) =>
  //                       (e.target.style.backgroundColor = "#0070f3")
  //                     }
  //                     onClick={() => handleEditClick(post)}
  //                   >
  //                     Edit
  //                   </button>
  //                 </div>
  //               </>
  //             )}
  //           </div>
  //         ))
  //       ) : (
  //         <p>No posts available.</p>
  //       )}
  //     </div>
  //   );

  return (
    <div style={containerStyle}>
      <h1>Posts</h1>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} style={postStyle}>
            {editPostId === post.id ? (
              <form onSubmit={handleUpdatePost} style={formStyle}>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  style={inputStyle}
                  placeholder="Title"
                />
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  style={inputStyle}
                  placeholder="Content"
                />
                <button type="submit" style={buttonStyle}>
                  Update
                </button>
                <button
                  type="button"
                  style={buttonStyle}
                  onClick={() => setEditPostId(null)}
                >
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <div style={titleStyle}>{post.title}</div>
                <div style={authorStyle}>
                  By {post.author} on{" "}
                  {new Date(post.created_at).toLocaleDateString()}
                </div>
                <div style={contentStyle}>{post.content}</div>
                <div style={buttonContainerStyle}>
                  <button
                    style={buttonStyle}
                    onMouseOver={(e) =>
                      (e.target.style.backgroundColor = "#005bb5")
                    }
                    onMouseOut={(e) =>
                      (e.target.style.backgroundColor = "#0070f3")
                    }
                    onClick={() => handleEditClick(post)}
                  >
                    Edit
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
};

export default Posts;
