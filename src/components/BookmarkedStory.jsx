import { Box, Typography } from "@mui/material";

function BookmarkedStory({ headline, photoUrl, articleUrl }) {
  return (
    <Box
      sx={{
        display: "inline-block",
        ml: 1,
        mr: 1,
        width: "170px",
        maxWidth: "170px",
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
          variant="body1"
          sx={{
            width: "100%",
            height: "auto",
            wordBreak: "break-word",
            textAlign: "center",
            mb: 2,
            display: "inline-block",
          }}
        >
          {headline}
        </Typography>
      </Box>
    </Box>
  );
}

export default BookmarkedStory;
