import { ThemeProvider } from "./components/theme/theme-provider"
import InsuranceClaimsAgent from "./InsuranceClaimsAgent"


function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <InsuranceClaimsAgent />
    </ThemeProvider>
  )
}

export default App
