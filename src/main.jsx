import ReactDOM from "react-dom/client";
import App from "./App";
import { NotificationContextProvider } from "./contexts/notification";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BlogProvider } from "./contexts/blogs";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <BlogProvider>
      <NotificationContextProvider>
        <App />
      </NotificationContextProvider>
    </BlogProvider>
  </QueryClientProvider>
);
