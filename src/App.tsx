import OneCademyAssistantLogo from '/1cademy-assistant.svg'
import CloseIcon from '@mui/icons-material/Close';
import { Button } from "@mui/material"
import { useState } from "react"


function App() {
  const [displayAssistant, setDisplayAssistant] = useState(false)

  return (
    <div className="App">
      {displayAssistant && <Button sx={{ width: "52px", height: "52px" }}>
        <CloseIcon />

      </Button>}
      {!displayAssistant && <Button sx={{ width: "52px", height: "52px" }}>
        <img src={OneCademyAssistantLogo} alt="Vite logo" style={{ width: "40px", height: "40px" }} />
      </Button>}
    </div>
  )
}

export default App