import { createContext } from "react";

export const ProjectsContext = createContext({
  stateData: [],
  handleViewProjectArchive: () => {},
  handleCloseProjectArchiveDrawer: () => {},
});
