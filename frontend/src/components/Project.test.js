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
  //  screen.logTestingPlaygroundURL();
  const titleElement = screen.getAllByText(/Test Project/i);
  expect(titleElement).toHaveLength(2);
});
/*
test("adds new task on enter key press", async () => {
  const user = userEvent.setup();
  const data = {
    _id: "01",
    title: "Test Project",
    description: "This is a test project.",
    coverImage: "/uploads/test-image.jpg",
    tasks: [],
  };

  const handleAddTask = jest.fn();

  render(<Project data={data} />);

  const taskInput = screen.getByRole("textbox", { name: /new task/i });

  screen.logTestingPlaygroundURL();

  await user.type(taskInput, "New Task{enter}");

  // expect(handleAddTask).toHaveBeenCalledTimes(1);
});

test("does not add new task on other key press", async () => {
  const user = userEvent.setup();
  const data = {
    _id: "01",
    title: "Test Project",
    description: "This is a test project.",
    coverImage: "/uploads/test-image.jpg",
    tasks: [],
  };

  const handleAddTask = jest.fn();

  render(<Project data={data} />);

  const taskInput = screen.getByLabelText(/New Task/i);

  await user.type(taskInput, "New Task");

  expect(handleAddTask).toHaveBeenCalledTimes(0);
});
*/
