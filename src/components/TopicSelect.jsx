import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
  useTheme,
} from "@mui/material";

function TopicSelect({
  possibleTags,
  selectedTags,
  setSelectedTags,
  showSaveButton = false,
}) {
  const theme = useTheme();

  return (
    <Box sx={{ mb: showSaveButton ? 2 : 6 }}>
      <FormGroup>
        {possibleTags.map((tag) => {
          return (
            <FormControlLabel
              key={tag}
              control={
                <Checkbox
                  checked={selectedTags.includes(tag)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedTags([...selectedTags, tag]);
                    } else {
                      setSelectedTags(
                        selectedTags.filter(
                          (selectedTag) => selectedTag !== tag
                        )
                      );
                    }
                  }}
                  size="large"
                  sx={{
                    "&.MuiCheckbox-colorPrimary": {
                      color: theme.palette.primary.main,
                    },
                  }}
                />
              }
              label={<Typography variant="body2">{tag}</Typography>}
            />
          );
        })}
      </FormGroup>
      {showSaveButton && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 1,
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.text.primary,
              borderRadius: "30px",
              fontSize: "1.2rem",
              filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
              "&:hover": {
                backgroundColor: theme.palette.primary[4],
              },
            }}
          >
            Save
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default TopicSelect;
