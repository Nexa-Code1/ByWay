import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router/dom";
import { CookiesProvider } from "react-cookie";

import { router } from "./routes";

function App() {
    const queryClient = new QueryClient();

    return (
        <CookiesProvider>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </CookiesProvider>
    );
}

export default App;
