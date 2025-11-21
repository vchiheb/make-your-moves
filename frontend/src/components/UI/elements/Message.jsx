import Alert from "@mui/material/Alert";

export default function Message({ variant, children }) {
  return <Alert severity={variant}>{children}</Alert>;
}

Message.defaultProps = {
  variant: "info",
};
