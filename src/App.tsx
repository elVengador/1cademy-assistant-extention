import { brandingLightTheme } from './utils/brandingTheme'
import './styles.css'

import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { Box, Button, Divider, IconButton, InputBase, Stack, TextField, ThemeProvider, Tooltip, tooltipClasses, TooltipProps, Typography } from "@mui/material"
import { Fragment, useEffect, useState } from "react"
import { DESIGN_SYSTEM_COLORS } from './utils/colors';
import { CustomAvatar } from './components/CustomAvatar';
import { Chat } from './components/Chat';
import { LOGO_URL } from './utils/constants';
// import { getFirebaseApp, initFirebaseClientSDK } from './utils/firestoreClient.config';


function App() {
  console.log('app loaded')
  const [displayAssistant, setDisplayAssistant] = useState(false)
  const [selectedText, setSelectedText] = useState('')
  // const getText = (text: string) => {

  // }

  // useEffect(() => {
  //   chrome.tabs && chrome.tabs.query({
  //     active: true,
  //     currentWindow: true
  //   }, tabs => {
  //     /**
  //      * Sends a single message to the content script(s) in the specified tab,
  //      * with an optional callback to run when a response is sent back.
  //      *
  //      * The runtime.onMessage event is fired in each content script running
  //      * in the specified tab for the current extension.
  //      */
  //     chrome.tabs.connect(tabs[0].id || 0).onMessage.addListener((message) => {
  //       console.log('react:', message)
  //     })
  //   });
  // }, [])


  // useEffect(() => {
  //   /**
  //    * We can't use "chrome.runtime.sendMessage" for sending messages from React.
  //    * For sending messages from React we need to specify which tab to send it to.
  //    */
  //   chrome.tabs && chrome.tabs.query({
  //     active: true,
  //     currentWindow: true
  //   }, tabs => {
  //     /**
  //      * Sends a single message to the content script(s) in the specified tab,
  //      * with an optional callback to run when a response is sent back.
  //      *
  //      * The runtime.onMessage event is fired in each content script running
  //      * in the specified tab for the current extension.
  //      */
  //     chrome.tabs.sendMessage(
  //       tabs[0].id || 0,
  //       { type: 'GET_DOM' } as DOMMessage,
  //       (response: DOMMessageResponse) => {
  //         setTitle(response.title);
  //         setHeadlines(response.headlines);
  //       });
  //   });
  // });

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

        {/* <Button
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
        </Button> */}

        {!displayAssistant && <CustomWidthTooltip open={Boolean(selectedText)} title={<Box sx={{ textAlign: "center" }}>I can clarify the selected text and respond to your queries.</Box>} placement='top'  >
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
            <img src={LOGO_URL} alt="onecademy assistant logo" style={{ width: "32px", height: "32px" }} />
          </Button>
        </CustomWidthTooltip>}
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


const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 250,
  },
});