import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  useTheme,
  Dialog,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import { ChevronRight, Favorite, FavoriteBorder } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { saveToFavorite } from "../utility/firebase";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import RedditIcon from "@mui/icons-material/Reddit";
import LinkIcon from "@mui/icons-material/Link";
import CloseIcon from "@mui/icons-material/Close";
import IosShareIcon from "@mui/icons-material/IosShare";
import DefaultNewsImage from "../assets/news-default.jpg";

const NewsCard = ({
  title,
  tags,
  imageUrl,
  articleUrl,
  summary,
  id,
  isFavorite,
  documentId,
  currData,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(isFavorite);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(close);
  };

  const shareArticle = (name) => {
    const encoded = encodeURIComponent(articleUrl);

    if (name === "facebook") {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${articleUrl}`,
        "_blank"
      );
    }

    if (name === "twitter") {
      window.open(`https://twitter.com/intent/tweet?url=${encoded}`, "_blank");
    }

    if (name === "reddit") {
      window.open(`https://www.reddit.com/submit?url=${encoded}`, "_blank");
    }

    if (name === "clipboard") {
      navigator.clipboard.writeText(articleUrl);
    }
  };

  return (
    <Card
      sx={{
        display: "flex",
        padding: 0,
        height: "auto",
        minHeight: "306px",
        width: "100%",
        borderRadius: "40px",
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.primary[1],
        filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.5))",
        mb: 4,
      }}
    >
      <CardContent
        sx={{
          padding: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          "&.MuiCardContent-root:last-child": {
            paddingBottom: 0,
          },
          width: "100%",
        }}
      >
        <Box
          sx={{
            backgroundColor: theme.palette.text.primary,
            height: "100%",
            width: "46px",
          }}
        />
        <Box sx={{ width: "calc(100% - 46px)" }}>
          <Box
            component="img"
            src={imageUrl !== "" ? imageUrl : DefaultNewsImage}
            sx={{ width: "100%", height: "100px", objectFit: "cover" }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "10px 30px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h4">{tags}</Typography>
              <Box sx={{ display: "flex" }}>
                <Button
                  sx={{ minWidth: "36px", width: "36px" }}
                  onClick={() => {
                    saveToFavorite(documentId, isSaved);
                    setIsSaved(!isSaved);
                  }}
                >
                  {isSaved ? <Favorite /> : <FavoriteBorder />}
                </Button>
                <Button
                  sx={{ minWidth: "36px", width: "36px" }}
                  onClick={() => handleDialogOpen()}
                >
                  <IosShareIcon />
                </Button>
              </Box>
            </Box>
            <Typography variant="h3" sx={{ mb: 1 }}>
              {title}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              {summary}
            </Typography>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Button
                onClick={() => navigate("/comment", { state: currData })}
                sx={{ padding: 0 }}
              >
                {currData.comments.length === 0 && "No Comment"}
                {currData.comments.length === 1 && "1 Comment"}
                {currData.comments.length > 1 &&
                  `${currData.comments.length} Comments`}
              </Button>
              <Button
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.text.primary,
                  borderRadius: "30px",
                  pl: 2,
                  filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.5))",
                  "&:hover": {
                    backgroundColor: theme.palette.primary[4],
                    color: theme.palette.text.primary,
                  },
                }}
                href={articleUrl}
                target="_blank"
                rel="noreferrer noopener"
              >
                <Typography sx={{ fontSize: "10px" }}>Read More</Typography>
                <ChevronRight />
              </Button>
            </Box>
          </Box>
        </Box>
      </CardContent>
      <Dialog fullWidth open={isDialogOpen} onClose={handleDialogClose}>
        <Box sx={{ padding: "3%" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontWeight: "bolder" }}>Share Article</Typography>
            <IconButton onClick={handleDialogClose} sx={{ color: "#000000" }}>
              <CloseIcon />
            </IconButton>
          </Box>
          <hr />
          <List>
            <ListItem
              component="button"
              sx={{
                backgroundColor: theme.palette.primary.main,
                mb: 1,
                border: "none",
              }}
              onClick={() => shareArticle("facebook")}
            >
              <ListItemIcon sx={{ color: "#ffffff" }}>
                <FacebookIcon />
              </ListItemIcon>
              <ListItemText primary={<Typography>Facebook</Typography>} />
            </ListItem>
            <ListItem
              component="button"
              sx={{
                backgroundColor: theme.palette.primary.main,
                mb: 1,
                border: "none",
              }}
              onClick={() => shareArticle("twitter")}
            >
              <ListItemIcon sx={{ color: "#ffffff" }}>
                <TwitterIcon />
              </ListItemIcon>
              <ListItemText primary={<Typography>Twitter</Typography>} />
            </ListItem>
            <ListItem
              component="button"
              sx={{
                backgroundColor: theme.palette.primary.main,
                mb: 1,
                border: "none",
              }}
              onClick={() => shareArticle("reddit")}
            >
              <ListItemIcon sx={{ color: "#ffffff" }}>
                <RedditIcon />
              </ListItemIcon>
              <ListItemText primary={<Typography>Reddit</Typography>} />
            </ListItem>
            <ListItem
              component="button"
              sx={{
                backgroundColor: theme.palette.primary.main,
                mb: 1,
                border: "none",
              }}
              onClick={() => shareArticle("clipboard")}
            >
              <ListItemIcon sx={{ color: "#ffffff" }}>
                <LinkIcon />
              </ListItemIcon>
              <ListItemText primary={<Typography>Copy Link</Typography>} />
            </ListItem>
          </List>
        </Box>
      </Dialog>
    </Card>
  );
};

export default NewsCard;
