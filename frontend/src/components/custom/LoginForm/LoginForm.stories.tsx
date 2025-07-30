import type { Meta, StoryObj } from "@storybook/react";
import LoginForm from "./LoginForm";
import { MockedProvider } from "@apollo/client/testing";

const meta: Meta<typeof LoginForm> = {
  title: "Forms/LoginForm",
  component: LoginForm,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof LoginForm>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <MockedProvider mocks={[]} addTypename={false}>
        <div className="w-full max-w-md p-4 bg-white dark:bg-black">
          <Story />
        </div>
      </MockedProvider>
    ),
  ],
};
