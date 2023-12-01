import { useState, useEffect } from "react";
import { Box, IconButton, Typography, TextField } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { updateComments } from "../utility/firebase";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DefaultNewsImage from "../assets/news-default.jpg";

const CommentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const [news, setNews] = useState(state);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const init = () => {
      const { comments: currComments } = news;
      setComments(currComments);
    };

    init();
  }, []);

  const postComment = () => {
    if (comment && comment != "") {
      const photoURL = localStorage.getItem("photoUrl");
      const displayName = localStorage.getItem("name");
      const commentObject = {
        photoURL,
        displayName,
        comment,
      };
      comments.push(commentObject);
      setComments(comments);

      const uid = localStorage.getItem("uid");
      const { documentId } = news;

      updateComments(documentId, {
        id: uid,
        comment,
      });

      setComment("");
    }
  };

  const openNews = () => {
    window.open(news.articleUrl, "_blank");
  };

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <IconButton
            onClick={() => navigate("/home")}
            sx={{ padding: 0, mb: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant="h3"
            sx={{ width: "100%", mb: 1, textAlign: "center" }}
          >
            {news.title}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Box
          component="img"
          src={news.image !== "" ? news.image : DefaultNewsImage}
          sx={{ width: "90%", height: "300px" }}
          onClick={() => openNews()}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "5%",
          height: "calc(100% - 510px)",
        }}
      >
        <Box sx={{ maxHeight: "80%", overflowY: "auto" }}>
          {comments.length === 0 && (
            <Typography sx={{ textAlign: "center", fontWeight: "bolder" }}>
              Be the first person to comment!
            </Typography>
          )}
          {comments.map((comment, index) => (
            <Box
              key={index}
              sx={{
                marginBottom: "5px",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  component="img"
                  src={comment.photoURL}
                  sx={{
                    width: "45px",
                    height: "45px",
                    borderRadius: "50%",
                    filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
                  }}
                />
                <Box
                  sx={{
                    marginLeft: "20px",
                    backgroundColor: "#999ea7",
                    padding: "3%",
                    borderRadius: "15px",
                    color: "#ffffff",
                  }}
                >
                  <Typography sx={{ fontSize: "0.8rem", fontWeight: "bolder" }}>
                    {comment.displayName}
                  </Typography>
                  <Typography sx={{ fontSize: "1rem" }}>
                    {comment.comment}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>

        <Box sx={{ width: "100%", marginTop: "10px", marginBottom: "15px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TextField
              label="Comment"
              variant="standard"
              sx={{ width: "100%" }}
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            />
            <IconButton onClick={() => postComment()} sx={{ color: "#000000" }}>
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CommentPage;
