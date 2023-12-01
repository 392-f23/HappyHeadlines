import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";

function BookmarkedStory({ headline, photoUrl, articleUrl, title }) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  return (
    <Box
      sx={{
        display: "inline-block",
        ml: 1,
        mr: 1,
        width: "170px",
        maxWidth: "170px",
        maxHeight: "450px",
        whiteSpace: "normal",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          src={photoUrl}
          sx={{
            width: "170px",
            height: "210px",
            borderRadius: "40px",
            objectFit: "cover",
            transition: "filter 0.2s ease-in-out",
            mb: 1,
            filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
            "&:hover": {
              cursor: "pointer",
              filter: "brightness(0.8)",
            },
          }}
          onClick={() => window.open(articleUrl, "_blank")}
        />
        <Typography
          sx={{
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            width: "100%",
            height: expanded ? "auto" : "6em", // Show max 2 lines initially
            overflow: "hidden",
            wordBreak: "break-word",
            textAlign: "center",
            position: "relative",
            display: "-webkit-box",
            lineClamp: expanded ? "unset" : 2, // Limit to 2 lines
            textOverflow: "ellipsis",
            "-webkit-box-orient": "vertical",
          }}
        >
          {headline}
        </Typography>

        {!expanded && (
          <Box>
            <Button
              onClick={toggleExpanded}
              sx={{ display: "block", margin: "0 auto" }}
            >
              Show more
            </Button>
          </Box>
        )}
        {expanded && (
          <Button
            onClick={toggleExpanded}
            sx={{ display: "block", margin: "0 auto" }}
          >
            Show less
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default BookmarkedStory;
