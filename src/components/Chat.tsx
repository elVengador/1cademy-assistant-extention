import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import OneCademyAssistantLogo from '/1cademy-assistant.svg'
import MicIcon from '@mui/icons-material/Mic';
import chatImage from '/chat-image.svg'
import { Box, Button, Divider, IconButton, InputBase, Stack, Typography } from '@mui/material'
import { Fragment } from 'react'
import { CustomAvatar } from './CustomAvatar'
import { DESIGN_SYSTEM_COLORS } from '../utils/colors';

/**
 * - NORMAL: is only content
 * - HELP: content + button to practice + teach content page
 * - NODE: Node Link + content
 * - PRACTICE: content + button to remind later + begin practice
 * - EXPLANATION: content + button to continue explaining + button to stop explanation
 */
type MessageType = "NORMAL" | "HELP" | "NODE" | "PRACTICE"
type Message = {
  date: string, messages: {
    type: "WRITER" | "READER"
    uname: string,
    image: string,
    message: {
      type: MessageType,
      content: string,
      nodeId?: string
    },
    hour: string
  }[]
}
const MESSAGES: Message[] = [
  {
    date: "12/12/12", messages: [
      {
        type: "READER", hour: "20:00", image: "", message: {
          type: "HELP", content: "Hey Carl, How can I help you today? Select one of the following options or type your question."
        }, uname: "bot"
      },
      { type: "WRITER", hour: "20:00", image: "", message: { type: "NORMAL", content: "What can you tell me about Visual Communications?" }, uname: "user" },
      { type: "READER", hour: "20:00", image: "", message: { type: "NORMAL", content: "klkljg" }, uname: "bot" },
      { type: "WRITER", hour: "20:00", image: "", message: { type: "NORMAL", content: "klkljg" }, uname: "user" },
      { type: "READER", hour: "20:00", image: "", message: { type: "NORMAL", content: "klkljg" }, uname: "bot" },
      { type: "WRITER", hour: "20:00", image: "", message: { type: "NORMAL", content: "klkljg" }, uname: "user" },
      { type: "READER", hour: "20:00", image: "", message: { type: "NORMAL", content: "klkljg" }, uname: "bot" },
    ]
  },
  { date: "11/11/11", messages: [{ type: "READER", hour: "20:00", image: "", message: { type: "NORMAL", content: "klkljg" }, uname: "bot" }] },
]

export const Chat = () => {
  return <Stack
    sx={{
      width: "420px",
      height: "600px",
      position: "absolute",
      bottom: "112px",
      right: "38px",
      borderRadius: "8px",
      backgroundColor: DESIGN_SYSTEM_COLORS.gray50,
      border: `solid 2px ${DESIGN_SYSTEM_COLORS.primary200}`
    }}>
    {/* header */}
    <Box sx={{
      width: "100%",
      height: "80px",
      p: "16px 24px",
      display: "grid",
      alignItems: "center",
      gridTemplateColumns: "48px auto",
      gap: "11px",
      borderBottom: `solid 1px ${DESIGN_SYSTEM_COLORS.gray300}`
    }}>
      <CustomAvatar imageUrl={OneCademyAssistantLogo} alt='onecademy assistant logo' size='lg' />
      <Box sx={{ display: "flex", alignContent: "center", justifyContent: "space-between" }}>
        <Box>
          <Typography sx={{ fontSize: "18px", color: DESIGN_SYSTEM_COLORS.gray900, fontWeight: 500 }}>1Cademy Assistant</Typography>
          <Typography sx={{ fontSize: "14px", color: DESIGN_SYSTEM_COLORS.gray500, fontWeight: 400 }}>AI Powered</Typography>
        </Box>
        <Button>Clear chat</Button>
      </Box>
    </Box>

    {/* sticky message */}
    <Box sx={{ width: "100%", height: "38px", p: "10px 24px", display: "grid", placeItems: "center", borderBottom: `solid 1px ${DESIGN_SYSTEM_COLORS.gray300}` }}>
      <Typography sx={{ color: DESIGN_SYSTEM_COLORS.gray500, fontSize: "12px" }}>This conversation is recorded and can be viewable by instructors</Typography>
    </Box>

    {/* messages */}
    <Stack
      spacing="14px"
      sx={{
        // height: "358px",
        p: "12px 24px",
        overflowY: "auto",
        flexGrow: 1,
        ...(!MESSAGES.length && {
          backgroundImage: `url(${chatImage})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        })
      }}>
      {MESSAGES.map(cur => {
        return <Fragment key={cur.date}>
          <Box>
            <Divider>{cur.date}</Divider>
          </Box>
          {cur.messages.map(c => <Stack key={cur.date + c.hour} direction={c.type === 'READER' ? "row" : "row-reverse"} spacing="12px">
            {c.type === 'READER' && <CustomAvatar imageUrl={OneCademyAssistantLogo} alt='onecademy assistant logo' />}
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: "7px" }}>
                <Box sx={{ display: "flex", alignItems: "center", }}>
                  <Typography sx={{ fontWeight: 500, fontSize: "14px", color: DESIGN_SYSTEM_COLORS.gray900 }}>{c.uname}</Typography>
                  {c.type === 'READER' && <IconButton size='small' sx={{ p: "4px", ml: "4px" }}><VolumeUpIcon /></IconButton>}
                </Box>
                <Typography sx={{ fontWeight: 400, fontSize: "14px", color: DESIGN_SYSTEM_COLORS.gray500 }}>{c.hour}</Typography>
              </Box>
              <Box sx={{ p: "10px 14px", borderRadius: c.type === "WRITER" ? "8px 0px 8px 8px" : "0px 8px 8px 8px", backgroundColor: c.type === "WRITER" ? DESIGN_SYSTEM_COLORS.orange100 : DESIGN_SYSTEM_COLORS.gray200 }}>
                {c.message.content}
                <Stack spacing={'12px'}>
                  {c.message.type === 'HELP' && <>
                    <Button variant='outlined' fullWidth sx={{ mt: "12px" }}>Let’s practise</Button>
                    <Button variant='outlined' fullWidth>Teach me the content of this page</Button>
                  </>}
                </Stack>
              </Box>
            </Box>
          </Stack>)}
        </Fragment>
      })}
    </Stack>

    {/* footer options */}
    <Box sx={{ width: "100%", height: "124px", p: "16px 24px", borderTop: `solid 1px ${DESIGN_SYSTEM_COLORS.gray300}` }}>
      <Box sx={{ height: "92px", border: `solid 1px ${DESIGN_SYSTEM_COLORS.gray300}`, borderRadius: "4px", backgroundColor: DESIGN_SYSTEM_COLORS.gray100 }}>
        <InputBase id="message chat" fullWidth placeholder='Type your message here...'
          sx={{ p: "10px 14px", fontSize: "14px" }}
        />
        <Box sx={{ width: "100%", p: "0px 8px 8px 8px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <IconButton size='small' sx={{ p: "5px" }}><MicIcon /></IconButton>
          <Button variant='contained' sx={{ minWidth: "0px", width: "36px", height: "36px", p: "10px", borderRadius: "8px" }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.74976 10.2501L16.4998 1.50014M7.85608 10.5235L10.0462 16.1552C10.2391 16.6513 10.3356 16.8994 10.4746 16.9718C10.5951 17.0346 10.7386 17.0347 10.8592 16.972C10.9983 16.8998 11.095 16.6518 11.2886 16.1559L16.7805 2.08281C16.9552 1.63516 17.0426 1.41133 16.9948 1.26831C16.9533 1.1441 16.8558 1.04663 16.7316 1.00514C16.5886 0.957356 16.3647 1.0447 15.9171 1.21939L1.84398 6.71134C1.34808 6.90486 1.10013 7.00163 1.02788 7.14071C0.965237 7.26129 0.965322 7.40483 1.0281 7.52533C1.10052 7.66433 1.34859 7.7608 1.84471 7.95373L7.47638 10.1438C7.57708 10.183 7.62744 10.2026 7.66984 10.2328C7.70742 10.2596 7.74028 10.2925 7.76709 10.3301C7.79734 10.3725 7.81692 10.4228 7.85608 10.5235Z" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </Button>
        </Box>
      </Box>
    </Box>
  </Stack>

}