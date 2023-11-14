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
        width: "100%",
        borderRadius: "40px",
        color: theme.palette.text.primary,
      }}
    >
      <CardContent sx={{ padding: 0 }}>
        {/* <Box sx={{ backgroundColor: theme.palette.text.primary, height: "100%", width: "24px" }} /> */}
        <Box component="img" src={imgUrl} sx={{ width: "100%", height: "100px" }} />
        <Typography>{tags}</Typography>
        <Typography>{title}</Typography>

        <Typography>{summary}</Typography>
        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.primary.main,
            }}
            href={articleUrl}
          >
            {" "}
            <Typography>Read More</Typography>
            <ChevronRight />
          </Button> 
        </Box>
      </CardContent>
    </Card>
  );
}

export default NewsCard;
