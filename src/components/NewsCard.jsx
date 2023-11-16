import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  useTheme,
} from "@mui/material";
import { ChevronRight } from "@mui/icons-material";

function NewsCard({ title, tags, imgUrl, articleUrl, summary }) {
  const theme = useTheme();

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
            src={imgUrl}
            sx={{ width: "100%", height: "100px", objectFit: "cover" }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "10px 30px",
            }}
          >
            <Typography variant="h4" sx={{ mb: 2 }}>
              {tags.join("/")}
            </Typography>
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
                justifyContent: "flex-end",
                alignItems: "center",
                mb: 1,
              }}
            >
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
                <Typography>Read More</Typography>
                <ChevronRight />
              </Button>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default NewsCard;
