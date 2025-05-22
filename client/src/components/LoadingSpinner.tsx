import { Box, CircularProgress, Typography } from "@mui/material";

const LoadingSpinner = ({ message }: { message: string }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      minHeight: "100vh",
    }}
  >
    <CircularProgress />
    <Typography variant="h6" sx={{ marginTop: 2 }}>
      {message}
    </Typography>
  </Box>
);

export default LoadingSpinner;
