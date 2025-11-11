import Button from "@mui/material/Button";

export default function ({ children, onClick, disabled }) {
  return (
    <Button
      fullwidth="true"
      variant="contained"
      type="submit"
      color="primary"
      disabled={disabled}
      sx={{
        backgroundColor: "primary.main",
        width: "100%",
        "&:hover": {
          backgroundColor: "black", // Change to desired hover color
          color: "white", // Optional: change text color on hover
        },
        "&:focus": {
          backgroundColor: "primary.main", // Change to your desired active color
        },
      }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
