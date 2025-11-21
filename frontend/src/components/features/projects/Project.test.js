import { render, screen } from "@testing-library/react";
const { default: userEvent } = require("@testing-library/user-event");
import Project from "./Project";

test("renders project", () => {
  const data = {
    _id: "01",
    title: "Test Project",
    description: "This is a test project.",
    coverImage: "/uploads/test-image.jpg",
  };
  render(<Project data={data} />);
  //screen.logTestingPlaygroundURL();
  const titleElement = screen.getAllByText(/Test Project/i);
  expect(titleElement).toHaveLength(2);
});

test("does not render when it receives no data", () => {
  const data = null;

  const { container } = render(<Project data={data} />);

  expect(container).toBeInTheDocument();
  expect(container.firstChild).toBeNull();
  //screen.logTestingPlaygroundURL();
});

test("does not render when it receives empty data", () => {
  const data = {};

  const { container } = render(<Project data={data} />);

  expect(container).toBeInTheDocument();
  expect(container.firstChild).toBeNull();
  //screen.logTestingPlaygroundURL();
});
