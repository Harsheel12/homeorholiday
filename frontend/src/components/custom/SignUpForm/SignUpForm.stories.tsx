import type { Meta, StoryObj } from "@storybook/react";
import { MockedProvider } from "@apollo/client/testing";
import SignUpForm from "./SignUpForm";

const meta: Meta<typeof SignUpForm> = {
  title: "Forms/SignUpForm",
  component: SignUpForm,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <MockedProvider mocks={[]} addTypename={false}>
        <div className="flex justify-center">
          <div className="w-full max-w-md p-4 bg-white dark:bg-black">
            <Story />
          </div>
        </div>
      </MockedProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof SignUpForm>;

export const Default: Story = {};
