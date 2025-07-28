import "../src/app/globals.css";
import type { Preview } from "@storybook/nextjs";
import {
  getRouter,
  ReadonlyURLSearchParams,
  usePathname,
  useSearchParams,
} from "@storybook/nextjs/navigation.mock";
import mockRouter from "next-router-mock";
import { useMemo } from "react";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
    nextjs: {
      appDirectory: true,
    },
  },

  beforeEach: () => {
    getRouter().push.mockImplementation((...args: Parameters<typeof mockRouter.push>) =>
      mockRouter.push(...args)
    );
    getRouter().replace.mockImplementation((...args: Parameters<typeof mockRouter.replace>) =>
      mockRouter.replace(...args)
    );
    usePathname.mockImplementation(() => mockRouter.pathname);
    useSearchParams.mockImplementation(() => {
      const searchParams = useMemo(
        () =>
          new ReadonlyURLSearchParams(
            new URLSearchParams(mockRouter.query as Record<string, string>)
          ),
        []
      );
      return searchParams;
    });
  },
};

export default preview;
