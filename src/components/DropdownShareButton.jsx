import React from "react";
import { FaRegShareSquare } from "react-icons/fa";
import PopupState, { bindToggle, bindPopper } from "material-ui-popup-state";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import RedditIcon from "@mui/icons-material/Reddit";
import LinkIcon from "@mui/icons-material/Link";
import {
  Button,
  Popper,
  Paper,
  Fade,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  Typography,
} from "@mui/material";

function DropdownShareButton({ articleUrl }) {
  const theme = useTheme();
  const handleShare = (e) => {
    e.preventDefault();

    const encodedAhref = encodeURIComponent(articleUrl);
    var link;

    switch (e.currentTarget.id) {
      case "facebook":
        link = `https://www.facebook.com/sharer/sharer.php?u=${articleUrl}`;
        open(link);
        break;
      case "twitter":
        link = `https://twitter.com/intent/tweet?url=${encodedAhref}`;
        open(link);
        break;
      case "reddit":
        link = `https://www.reddit.com/submit?url=${encodedAhref}`;
        open(link);
        break;
      case "copy":
        navigator.clipboard.writeText(articleUrl);
        break;

      default:
        break;
    }
  };

  const open = (socialLink) => {
    window.open(socialLink, "_blank");
  };

  return (
    <PopupState variant="popper" popupId="demo-popup-popper">
      {(popupState) => (
        <div>
          <Button color="inherit" {...bindToggle(popupState)}>
            <FaRegShareSquare />
            Share Article
          </Button>
          <Popper {...bindPopper(popupState)} transition>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper
                  sx={{
                    backgroundColor: theme.palette.primary[3],
                    pl: 1,
                    pr: 1,
                  }}
                >
                  <List dense={true}>
                    <ListItem
                      component="button"
                      id="facebook"
                      onClick={handleShare}
                      sx={{
                        backgroundColor: theme.palette.primary.main,
                        mb: 1,
                        border: "none",
                        transition: "background-color 0.15s ease-in-out",
                        cursor: "pointer",
                        "&:hover": {
                          backgroundColor: theme.palette.primary[4],
                        },
                      }}
                    >
                      <ListItemIcon>
                        <FacebookIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography
                            variant="button"
                            sx={{ color: theme.palette.text.primary }}
                          >
                            Facebook
                          </Typography>
                        }
                      />
                    </ListItem>
                    <ListItem
                      component="button"
                      id="twitter"
                      onClick={handleShare}
                      sx={{
                        backgroundColor: theme.palette.primary.main,
                        mb: 1,
                        border: "none",
                        transition: "background-color 0.15s ease-in-out",
                        cursor: "pointer",
                        "&:hover": {
                          backgroundColor: theme.palette.primary[4],
                        },
                      }}
                    >
                      <ListItemIcon>
                        <TwitterIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography
                            variant="button"
                            sx={{ color: theme.palette.text.primary }}
                          >
                            Twitter
                          </Typography>
                        }
                      />
                    </ListItem>
                    <ListItem
                      component="button"
                      id="reddit"
                      onClick={handleShare}
                      sx={{
                        backgroundColor: theme.palette.primary.main,
                        mb: 1,
                        border: "none",
                        transition: "background-color 0.15s ease-in-out",
                        cursor: "pointer",
                        "&:hover": {
                          backgroundColor: theme.palette.primary[4],
                        },
                      }}
                    >
                      <ListItemIcon>
                        <RedditIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography
                            variant="button"
                            sx={{ color: theme.palette.text.primary }}
                          >
                            Reddit
                          </Typography>
                        }
                      />
                    </ListItem>
                    <ListItem
                      component="button"
                      id="copy"
                      onClick={handleShare}
                      sx={{
                        backgroundColor: theme.palette.primary.main,
                        border: "none",
                        transition: "background-color 0.15s ease-in-out",
                        cursor: "pointer",
                        "&:hover": {
                          backgroundColor: theme.palette.primary[4],
                        },
                      }}
                    >
                      <ListItemIcon>
                        <LinkIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography
                            variant="button"
                            sx={{ color: theme.palette.text.primary }}
                          >
                            Copy Link
                          </Typography>
                        }
                      />
                    </ListItem>
                  </List>
                </Paper>
              </Fade>
            )}
          </Popper>
        </div>
      )}
    </PopupState>
  );
}

export default DropdownShareButton;
