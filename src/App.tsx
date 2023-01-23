import { QueryClientProvider } from './components/ClientProvider'
import { RouterProvider } from './components/RouterProvider'

function App() {
  return (
    <QueryClientProvider>
      <RouterProvider />
    </QueryClientProvider>
  )
}

export default App
