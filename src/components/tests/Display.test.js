import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Display from "../Display";
import fetchShow from "../../api/fetchShow";
jest.mock("../../api/fetchShow");
const testShow = {
  name: "some shit",
  summary: "summary of some shit",
  seasons: [
    {
      id: 1,
      name: "Season 1",
      episodes: [],
    },
    {
      id: 2,
      name: "Season 2",
      episodes: [],
    },
    {
      id: 3,
      name: "Season 3",
      episodes: [],
    },
  ],
};

test("render Display without any props", () => {
  render(<Display />);
});

test("when the fetch button is pressed, the show component will display", async () => {
  fetchShow.mockResolvedValueOnce(testShow);
  render(<Display />);
  const button = screen.getByRole("button");
  userEvent.click(button);
  const show = await screen.findByTestId("show-container");
  expect(show).toBeInTheDocument();
});

test("when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data", async () => {
  fetchShow.mockResolvedValueOnce(testShow);
  render(<Display />);
  const button = screen.getByRole("button");
  userEvent.click(button);
  const options = await screen.findByRole("combobox");
  expect(options).toHaveLength(4);
});

test("test when fetch button is pressed, function called", async () => {
  const displayFunction = jest.fn();
  fetchShow.mockResolvedValueOnce(testShow);
  render(<Display displayFunc={displayFunction} />);
  const button = screen.getByRole("button");
  userEvent.click(button);
  await waitFor(() => {
    expect(displayFunction).toBeCalledTimes(1);
  });
});

///Tasks:
//1. Add in nessisary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.
