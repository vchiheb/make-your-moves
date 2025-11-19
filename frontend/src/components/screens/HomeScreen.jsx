import { ThemeProvider } from "@mui/material/styles";
import customTheme from "../../theme"; // Import your custom theme
import Loader from "../UI/Loader.jsx";
import Message from "../UI/Message.jsx";
//import { visions } from "../data/visions.js";
import { projects } from "../../data/projects.js";

export default function HomeScreen() {
  const error = null;
  const isLoading = false;

  return (
    <>
      {isLoading ? (
        <div className="container">
          <Loader />
        </div>
      ) : error ? (
        <Message variant="error">
          {error?.data?.message || error?.error}
        </Message>
      ) : (
        <>
          <ThemeProvider theme={customTheme}></ThemeProvider>
        </>
      )}
    </>
  );
}
