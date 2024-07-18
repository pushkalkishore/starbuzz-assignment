import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
};

const headerStyle = {
  display: "flex",
  justifyContent: "center",
  width: "100%",
  maxWidth: "600px",
  marginBottom: "20px",
};

const logoutButtonStyle = {
  position: "absolute",
  top: "20px",
  right: "20px",
  padding: "5px 10px",
  cursor: "pointer",
  backgroundColor: "#ff4d4d",
  color: "white",
  border: "none",
  borderRadius: "3px",
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

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "flex-end",
  marginTop: "10px",
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
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      const fetchPosts = async () => {
        try {
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
    } else {
      router.push("/login");
    }
  }, []);

  const handleEditClick = (post) => {
    setEditPostId(post.id);
    setEditTitle(post.title);
    setEditContent(post.content);
  };

  const handleNewPost = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      console.log(token);
      const response = await fetch("http://localhost:3001/posts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newTitle,
          content: newContent,
          author: newAuthor,
        }),
      });

      if (response.ok) {
        const newPost = await response.json();
        setPosts((prevPosts) => [...prevPosts, newPost]);
        setNewTitle("");
        setNewContent("");
      } else {
        console.error("Error creating new post");
      }
    } catch (error) {
      console.error("Error creating new post:", error);
    }
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

  const handleDeletePost = async (postId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3001/posts/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      } else {
        console.error("Error deleting post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <div style={{ position: "relative" }}>
      {isLoggedIn && (
        <button style={logoutButtonStyle} onClick={handleLogout}>
          Logout
        </button>
      )}
      <div style={containerStyle}>
        <div style={headerStyle}>
          <h1>Posts</h1>
        </div>
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
                      style={{ ...buttonStyle, marginRight: "10px" }}
                      onMouseOver={(e) =>
                        (e.target.style.backgroundColor = "#e60000")
                      }
                      onMouseOut={(e) =>
                        (e.target.style.backgroundColor = "#ff4d4d")
                      }
                      onClick={() => handleDeletePost(post.id)}
                    >
                      Delete
                    </button>
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
        <form onSubmit={handleNewPost} style={formStyle}>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            style={inputStyle}
            placeholder="New Post Title"
          />
          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            style={inputStyle}
            placeholder="New Post Content"
          />
          <input
            type="text"
            value={newAuthor}
            onChange={(e) => setNewAuthor(e.target.value)}
            style={inputStyle}
            placeholder="Author"
          />
          <button type="submit" style={buttonStyle}>
            Add New Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default Posts;
