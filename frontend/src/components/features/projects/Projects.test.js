import { render, screen } from "@testing-library/react";
const { default: userEvent } = require("@testing-library/user-event");
import Projects from "./Projects";

test("renders project", () => {
  const data = [
    {
      _id: "01",
      title: "Test Project",
      description: "This is a test project.",
      coverImage: "/uploads/test-image.jpg",
    },
  ];

  render(<Projects data={data} />);
  //screen.logTestingPlaygroundURL();
  const titleElement = screen.getAllByText(/Test Project/i);
  expect(titleElement).toHaveLength(2);
});
