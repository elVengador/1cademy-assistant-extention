import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
// import OneCademyAssistantLogo from '/1cademy-assistant.svg'
import MicIcon from "@mui/icons-material/Mic";
import chatImage from "/chat-image.svg";
// import { Box, Button, Divider, IconButton, InputBase, Stack, Typography } from '@mui/material'
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { CustomAvatar } from "./CustomAvatar";
import { DESIGN_SYSTEM_COLORS } from "../utils/colors";
// import VolumeUpIcon from "@mui/icons-material/VolumeUp";
// import OneCademyAssistantLogo from "/1cademy-assistant.svg";
// import MicIcon from "@mui/icons-material/Mic";
// import chatImage from "/chat-image.svg";
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputBase,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
// import { Fragment, useState } from "react";
// import { CustomAvatar } from "./CustomAvatar";
// import { DESIGN_SYSTEM_COLORS } from "../utils/colors";
import { RiveComponentMemoized } from "./RiveMemoized";
import { getFirestore } from "firebase/firestore";
import { useAuth } from "../utils/AuthContext";
import { NodeType } from "../types";
import NodeTypeIcon from "./NodeTypeIcon";
import { NodeLink } from "./NodeLink";
import {
  CHAT_BACKGROUND_IMAGE_URL,
  LOGO_URL,
  SEARCH_ANIMATION_URL,
} from "../utils/constants";
import { useTheme } from "../hooks/useTheme";

export type IAssitantRequestAction =
  | "Practice"
  | "TeachContent"
  | "RemindLater"
  | "Yes"
  | "ExplainMore"
  | "GiveMoreExplanation"
  | "IllContribute"
  | "Question"
  | "Text";

/**
 * - NORMAL: is only content
 * - HELP: content + button to practice + teach content page
 * - NODE: Node Link + content
 * - PRACTICE: content + button to remind later + begin practice
 * - EXPLANATION: content + button to continue explaining + button to stop explanation
 */
// type MessageType = "NORMAL" | "HELP" | "NODE" | "PRACTICE";
export type NodeLinkType = {
  type: NodeType;
  id: string;
  title: string;
};
type Message = {
  date: string;
  messages: {
    id: string;
    type: "WRITER" | "READER";
    uname: string;
    image: string;
    content: string;
    nodes: NodeLinkType[];
    actions: {
      type: IAssitantRequestAction;
      title: string;
      variant: "contained" | "outlined";
    }[];
    hour: string;
  }[];
};
const MESSAGES: Message[] = [
  {
    date: "12/12/12",
    messages: [
      {
        id: "01",
        type: "READER",
        hour: "20:00",
        image: "",
        content: "Message with actions",
        nodes: [],
        uname: "1Cademy Assistant",
        actions: [
          {
            title: "Teach me the content of this page",
            type: "TeachContent",
            variant: "outlined",
          },
          {
            title: "Remind me later",
            type: "RemindLater",
            variant: "outlined",
          },
          { title: "Yes", type: "Yes", variant: "outlined" },
          { title: "ExplainMore", type: "ExplainMore", variant: "outlined" },
          {
            title: "Provide me an explanation",
            type: "GiveMoreExplanation",
            variant: "outlined",
          },
          {
            title: "I’ll contribute",
            type: "IllContribute",
            variant: "outlined",
          },
          { title: "Question", type: "Question", variant: "outlined" },
          { title: "Text", type: "Text", variant: "outlined" },
          { title: "Let’s practice", type: "Practice", variant: "outlined" },
        ],
      },
      {
        id: "03",
        type: "READER",
        hour: "20:00",
        image: "",
        content: "Message with Nodes",
        nodes: [
          {
            id: "01",
            title: "Advertisement Node title",
            type: "Advertisement",
          },
          { id: "02", title: "Code Node title", type: "Code" },
          { id: "03", title: "Concept Node title", type: "Concept" },
          { id: "04", title: "Idea Node title", type: "Idea" },
          { id: "05", title: "News Node title", type: "News" },
          { id: "06", title: "Private Node title", type: "Private" },
          { id: "07", title: "Profile Node title", type: "Profile" },
          { id: "08", title: "Question Node title", type: "Question" },
          { id: "09", title: "Reference Node title", type: "Reference" },
          { id: "10", title: "Relation Node title", type: "Relation" },
          { id: "11", title: "Sequel Node title", type: "Sequel" },
        ],
        uname: "1Cademy Assistant",
        actions: [],
      },
      {
        id: "07",
        type: "READER",
        hour: "20:00",
        image: "",
        content: "klkljg",
        nodes: [],
        uname: "1Cademy Assistant",
        actions: [],
      },
      {
        id: "05",
        type: "READER",
        hour: "20:00",
        image: "",
        content: "klkljg",
        nodes: [],
        uname: "1Cademy Assistant",
        actions: [],
      },
      {
        id: "06",
        type: "WRITER",
        hour: "20:00",
        image: "",
        content: "klkljg",
        nodes: [],
        uname: "You",
        actions: [],
      },
      {
        id: "04",
        type: "WRITER",
        hour: "20:00",
        image: "",
        content: "klkljg",
        nodes: [],
        uname: "You",
        actions: [],
      },
      {
        id: "02",
        type: "WRITER",
        hour: "20:00",
        image: "",
        content: "What can you tell me about Visual Communications?",
        nodes: [],
        uname: "You",
        actions: [],
      },
    ],
  },
  {
    date: "11/11/11",
    messages: [
      {
        id: "08",
        type: "READER",
        hour: "20:00",
        image: "",
        content: "klkljg",
        nodes: [{ type: "Idea", id: "dfdgfsdf", title: "adasd" }],
        uname: "1Cademy Assistant",
        actions: [],
      },
    ],
  },
];

export const Chat = () => {
  const db = getFirestore();
  const [{ user, reputation, settings }, { dispatch }] = useAuth();
  console.log({ user });
  const [messagesObj, setMessagesObj] = useState<Message[]>([]);
  const [speakingMessageId, setSpeakingMessageId] = useState<string>("");
  const chatElementRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { mode } = useTheme();
  const scrollToTheEnd = () => {
    if (!chatElementRef.current) return;
    chatElementRef.current.scrollTop = chatElementRef.current.scrollHeight;
  };

  const narrateMessage = useCallback((id: string, message: string) => {
    if (!window.speechSynthesis.speaking) {
      const msg = new SpeechSynthesisUtterance(message);
      window.speechSynthesis.speak(msg);
      setSpeakingMessageId(id);
      msg.onend = () => {
        setSpeakingMessageId("");
      };
    } else {
      window.speechSynthesis.cancel();
      setSpeakingMessageId("");
    }
  }, []);

  useEffect(() => {
    const idTimeout = setTimeout(() => {
      setMessagesObj(MESSAGES);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(idTimeout);
  }, []);

  useEffect(() => {
    scrollToTheEnd();
  }, [messagesObj]);

  return (
    <Stack
      sx={{
        width: "420px",
        height: "600px",
        position: "absolute",
        bottom: "112px",
        right: "38px",
        borderRadius: "8px",
        backgroundColor:
          mode === "dark"
            ? DESIGN_SYSTEM_COLORS.notebookG900
            : DESIGN_SYSTEM_COLORS.gray50,
        border: `solid 2px ${
          mode === "light"
            ? DESIGN_SYSTEM_COLORS.primary200
            : DESIGN_SYSTEM_COLORS.primary400
        }`,
      }}
    >
      {/* header */}
      <Box
        sx={{
          width: "100%",
          height: "80px",
          p: "16px 24px",
          display: "grid",
          alignItems: "center",
          gridTemplateColumns: "48px auto",
          gap: "11px",
          borderBottom: `solid 1px ${
            mode === "light"
              ? DESIGN_SYSTEM_COLORS.gray300
              : DESIGN_SYSTEM_COLORS.notebookG500
          }`,
        }}
      >
        <CustomAvatar
          imageUrl={LOGO_URL}
          alt="onecademy assistant logo"
          size="lg"
        />
        <Box
          sx={{
            display: "flex",
            alignContent: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: "18px",
                color:
                  mode === "dark"
                    ? DESIGN_SYSTEM_COLORS.gray25
                    : DESIGN_SYSTEM_COLORS.gray900,
                fontWeight: 500,
              }}
            >
              1Cademy Assistant
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                color:
                  mode === "dark"
                    ? DESIGN_SYSTEM_COLORS.gray100
                    : DESIGN_SYSTEM_COLORS.gray500,

                fontWeight: 400,
              }}
            >
              AI Powered
            </Typography>
          </Box>
          {messagesObj.length > 0 && (
            <Button onClick={() => setMessagesObj([])}>Clear chat</Button>
          )}
        </Box>
      </Box>

      {/* sticky message */}
      <Box
        sx={{
          width: "100%",
          height: "38px",
          p: "10px 24px",
          display: "grid",
          placeItems: "center",
          borderBottom: `solid 1px ${
            mode === "light"
              ? DESIGN_SYSTEM_COLORS.gray300
              : DESIGN_SYSTEM_COLORS.notebookG500
          }`,
        }}
      >
        <Typography
          sx={{
            color:
              mode === "light"
                ? DESIGN_SYSTEM_COLORS.gray500
                : DESIGN_SYSTEM_COLORS.gray50,
            fontSize: "12px",
          }}
        >
          This conversation is recorded and can be viewable by instructors
        </Typography>
      </Box>

      {/* messages */}
      <Stack
        ref={chatElementRef}
        spacing="14px"
        sx={{
          // height: "358px",
          p: "12px 24px",
          overflowY: "auto",
          scrollBehavior: "smooth",
          flexGrow: 1,
          ...(!messagesObj.length && {
            backgroundImage: `url(${CHAT_BACKGROUND_IMAGE_URL})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }),
        }}
      >
        {isLoading && (
          <Box sx={{ width: "300px", height: "300px", mx: "auto" }}>
            <RiveComponentMemoized
              src={SEARCH_ANIMATION_URL}
              artboard="New Artboard"
              animations={"Timeline 1"}
              autoplay={true}
            />
          </Box>
        )}
        {!isLoading &&
          messagesObj.map((cur) => {
            return (
              <Fragment key={cur.date}>
                <Box>
                  <Divider
                    sx={{
                      ":before": {
                        borderTop: `solid 1px ${
                          mode === "light"
                            ? DESIGN_SYSTEM_COLORS.notebookG100
                            : DESIGN_SYSTEM_COLORS.notebookG500
                        }`,
                      },
                      ":after": {
                        borderTop: `solid 1px ${
                          mode === "light"
                            ? DESIGN_SYSTEM_COLORS.notebookG100
                            : DESIGN_SYSTEM_COLORS.notebookG500
                        }`,
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        color:
                          mode === "dark"
                            ? DESIGN_SYSTEM_COLORS.gray25
                            : DESIGN_SYSTEM_COLORS.gray900,
                      }}
                    >
                      {" "}
                      {cur.date}
                    </Typography>
                  </Divider>
                </Box>
                {cur.messages.map((c) => (
                  <Stack
                    key={c.id}
                    direction={c.type === "READER" ? "row" : "row-reverse"}
                    spacing="12px"
                  >
                    {c.type === "READER" && (
                      <CustomAvatar
                        imageUrl={LOGO_URL}
                        alt="onecademy assistant logo"
                      />
                    )}
                    <Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          mb: "7px",
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Typography
                            sx={{
                              fontWeight: 500,
                              fontSize: "14px",
                              color:
                                mode === "dark"
                                  ? DESIGN_SYSTEM_COLORS.gray25
                                  : DESIGN_SYSTEM_COLORS.gray900,
                            }}
                          >
                            {c.uname}
                          </Typography>
                          {c.type ===
                            "READER" /* && <Tooltip title={speakingMessageId === c.id ? "Stop narrating" : "Narrate message"} placement='top'> */ && (
                            <IconButton
                              onClick={() => narrateMessage(c.id, c.content)}
                              size="small"
                              sx={{ p: "4px", ml: "4px" }}
                            >
                              {speakingMessageId === c.id ? (
                                <VolumeOffIcon
                                  sx={{
                                    fontSize: "16px",
                                    color:
                                      mode === "dark"
                                        ? DESIGN_SYSTEM_COLORS.gray25
                                        : DESIGN_SYSTEM_COLORS.gray900,
                                  }}
                                />
                              ) : (
                                <VolumeUpIcon
                                  sx={{
                                    fontSize: "16px",
                                    color:
                                      mode === "dark"
                                        ? DESIGN_SYSTEM_COLORS.gray25
                                        : DESIGN_SYSTEM_COLORS.gray900,
                                  }}
                                />
                              )}
                            </IconButton>
                          )}
                        </Box>
                        <Typography
                          sx={{
                            fontWeight: 400,
                            fontSize: "14px",
                            color:
                              mode === "dark"
                                ? DESIGN_SYSTEM_COLORS.gray25
                                : DESIGN_SYSTEM_COLORS.gray900,
                          }}
                        >
                          {c.hour}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          p: "10px 14px",
                          borderRadius:
                            c.type === "WRITER"
                              ? "8px 0px 8px 8px"
                              : "0px 8px 8px 8px",
                          backgroundColor:
                            c.type === "WRITER"
                              ? DESIGN_SYSTEM_COLORS.orange100
                              : mode === "light"
                              ? DESIGN_SYSTEM_COLORS.gray200
                              : DESIGN_SYSTEM_COLORS.notebookG600,
                        }}
                      >
                        {c.nodes.length > 0 && (
                          <Stack spacing={"12px"} sx={{ mb: "10px" }}>
                            {c.nodes.map((node) => (
                              <NodeLink
                                key={node.id}
                                title={node.title}
                                type={node.type}
                                id={node.id}
                              />
                            ))}
                          </Stack>
                        )}
                        <Typography
                          sx={{
                            fontSize: "14px",
                            color:
                              mode === "dark"
                                ? c.type === "WRITER"
                                  ? DESIGN_SYSTEM_COLORS.notebookG700
                                  : DESIGN_SYSTEM_COLORS.gray25
                                : DESIGN_SYSTEM_COLORS.gray900,
                          }}
                        >
                          {c.content}
                        </Typography>
                        {c.actions.length > 0 && (
                          <Stack spacing={"12px"} sx={{ mt: "12px" }}>
                            {c.actions.map((action, idx) => (
                              <Button
                                key={idx}
                                variant={action.variant}
                                fullWidth
                              >
                                {action.title}
                              </Button>
                            ))}
                          </Stack>
                        )}
                      </Box>
                    </Box>
                  </Stack>
                ))}
              </Fragment>
            );
          })}
      </Stack>

      {/* footer options */}
      <Box
        sx={{
          width: "100%",
          height: "124px",
          p: "16px 24px",
          borderTop: `solid 1px ${DESIGN_SYSTEM_COLORS.gray300}`,
        }}
      >
        <Box
          sx={{
            height: "92px",
            border: `solid 1px ${DESIGN_SYSTEM_COLORS.gray300}`,
            borderRadius: "4px",
            backgroundColor: DESIGN_SYSTEM_COLORS.gray100,
          }}
        >
          <InputBase
            id="message chat"
            fullWidth
            placeholder="Type your message here..."
            sx={{ p: "10px 14px", fontSize: "14px" }}
          />
          <Box
            sx={{
              width: "100%",
              p: "0px 8px 8px 8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <IconButton size="small" sx={{ p: "5px" }}>
              <MicIcon />
            </IconButton>
            <Button
              variant="contained"
              sx={{
                minWidth: "0px",
                width: "36px",
                height: "36px",
                p: "10px",
                borderRadius: "8px",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.74976 10.2501L16.4998 1.50014M7.85608 10.5235L10.0462 16.1552C10.2391 16.6513 10.3356 16.8994 10.4746 16.9718C10.5951 17.0346 10.7386 17.0347 10.8592 16.972C10.9983 16.8998 11.095 16.6518 11.2886 16.1559L16.7805 2.08281C16.9552 1.63516 17.0426 1.41133 16.9948 1.26831C16.9533 1.1441 16.8558 1.04663 16.7316 1.00514C16.5886 0.957356 16.3647 1.0447 15.9171 1.21939L1.84398 6.71134C1.34808 6.90486 1.10013 7.00163 1.02788 7.14071C0.965237 7.26129 0.965322 7.40483 1.0281 7.52533C1.10052 7.66433 1.34859 7.7608 1.84471 7.95373L7.47638 10.1438C7.57708 10.183 7.62744 10.2026 7.66984 10.2328C7.70742 10.2596 7.74028 10.2925 7.76709 10.3301C7.79734 10.3725 7.81692 10.4228 7.85608 10.5235Z"
                  stroke="white"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
          </Box>
        </Box>
      </Box>
    </Stack>
  );
};
