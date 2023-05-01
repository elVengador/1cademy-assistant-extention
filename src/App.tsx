import OneCademyAssistantLogo from '/1cademy-assistant.svg'
import { brandingLightTheme } from './utils/brandingTheme'
import './styles.css'

import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Divider, IconButton, InputBase, Stack, TextField, ThemeProvider, Tooltip, tooltipClasses, Typography } from "@mui/material"
import { Fragment, useState } from "react"
import { DESIGN_SYSTEM_COLORS } from './utils/colors';
import { CustomAvatar } from './components/CustomAvatar';
import { Chat } from './components/Chat';
// import { getFirebaseApp, initFirebaseClientSDK } from './utils/firestoreClient.config';


function App() {
  const [displayAssistant, setDisplayAssistant] = useState(false)
  const [selectedText, setSelectedText] = useState('')
  // const getText = (text: string) => {

  // }

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#123", position: "relative", padding: "0x" }}>

      {/* floating buttons */}
      <Box sx={{ position: "absolute", bottom: "38px", right: "38px" }}>
        {displayAssistant && <Button
          onClick={() => setDisplayAssistant(false)}
          sx={{
            minWidth: "0px",
            width: "52px",
            height: "52px",
            backgroundColor: DESIGN_SYSTEM_COLORS.gray50,
            borderRadius: "50%",
            boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)',
            color: DESIGN_SYSTEM_COLORS.gray800,
            ":hover": {
              backgroundColor: DESIGN_SYSTEM_COLORS.gray300,
            }
          }}>
          <CloseIcon />
        </Button>}

        <Button
          onClick={() => setSelectedText(prev => prev ? '' : 'Loreman df asldkfaslflsdj fljals')}
          sx={{
            minWidth: "0px",
            width: "52px",
            height: "52px",
            backgroundColor: DESIGN_SYSTEM_COLORS.gray50,
            borderRadius: "50%",
            boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)',
            color: DESIGN_SYSTEM_COLORS.gray800,
            ":hover": {
              backgroundColor: DESIGN_SYSTEM_COLORS.gray300,
            }
          }}>
          S
        </Button>

        {!displayAssistant && <Tooltip open={Boolean(selectedText)} title="I can clarify the selected text and respond to your queries." placement='top' sx={{
          '& .MuiTooltip-tooltip': {
            maxWidth: 250,
          }
        }
        } >
          <Button
            onClick={() => setDisplayAssistant(true)}
            sx={{
              minWidth: "0px",
              width: "52px",
              height: "52px",
              border: `solid 2px ${DESIGN_SYSTEM_COLORS.primary200}`,
              borderRadius: "12px",
              backgroundColor: DESIGN_SYSTEM_COLORS.gray100,
              ":hover": {
                backgroundColor: DESIGN_SYSTEM_COLORS.gray300,
              }
            }}>
            <img src={OneCademyAssistantLogo} alt="onecademy assistant logo" style={{ width: "32px", height: "32px" }} />
          </Button>
        </Tooltip>}
      </Box>

      {/* chat */}
      {displayAssistant && <Chat />}

    </div >
  )
}

const AppWrapper = () => <ThemeProvider theme={brandingLightTheme}>
  <App />
</ThemeProvider>

export default AppWrapper