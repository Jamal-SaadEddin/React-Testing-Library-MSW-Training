import { waitFor } from "@testing-library/react";

export const waitForButtonToBeDisabled = async (button) => {
  await waitFor(() => {
    expect(button).toBeDisabled();
  });
};
