import { render, screen } from "@testing-library/react";
const { default: userEvent } = require("@testing-library/user-event");

import Task from "./Task";

test("renders task", () => {
  const data = {
    _id: "01",
    title: "Test Task",
    priority: "none",
  };

  render(<Task data={data} />);
  //screen.logTestingPlaygroundURL();

  const task = screen.getByText(/test task/i);
  expect(task).toBeInTheDocument();

  const tasks = screen.getAllByText(/test task/i);
  expect(tasks).toHaveLength(1);
});

test("does not render when it receives no data", () => {
  const data = null;

  const { container } = render(<Task data={data} />);

  expect(container).toBeInTheDocument();
  expect(container.firstChild).toBeNull();
  //screen.logTestingPlaygroundURL();
});

test("does not render when it receives empty data", () => {
  const data = {};

  const { container } = render(<Task data={data} />);

  expect(container).toBeInTheDocument();
  expect(container.firstChild).toBeNull();
  //screen.logTestingPlaygroundURL();
});
