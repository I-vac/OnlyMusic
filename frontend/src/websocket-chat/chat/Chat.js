import { Container, Divider, FormControl, Grid, List, ListItem, ListItemText, Paper, Typography, TextField, IconButton } from "@mui/material";
import { Fragment, useState, useRef, useEffect } from "react";
import {Box} from "@mui/system";
import { chatMessageDTO } from "../../models/chatMessageDTO";
import "./Chat.css"
import SendIcon from "@mui/icons-material/Send"
import Auth from "../../services/auth.service"

export default function Chat() {

    const ENTER_KEY_CODE = 13;

    const scrollBottomRef = useRef(null);

    const webSocket = useRef(null);

    const [chatMessages, setChatMessages] = useState([]);

    const user = Auth.getCurrentUser().username;
    const [message, setMessage] = useState("");

    useEffect(() => {
        console.log("Opening WebSocket");
        webSocket.current = new WebSocket("ws://localhost:8080/chat")
        webSocket.current.onopen = (event) => {
            console.log("Open:", event);
        }
        webSocket.current.onclose = (event) => {
            console.log("Close:", event);
        }
        return () => {
            console.log ("Closing WebSocket");
            webSocket.current.close();
        }
    }, []);

    useEffect(() => {
        webSocket.current.onmessage = (event) => {
            const chatMessageDTO = JSON.parse(event.data);
            console.log("Message: ", chatMessageDTO);
            setChatMessages([...chatMessages,{
                user: chatMessageDTO.user,
                message: chatMessageDTO.message
            }]);
            //automatically scroll to the bottom of the chat
            if(scrollBottomRef.current){
                scrollBottomRef.current.scrollIntoView({behavior: "smooth"});
            }
        }
    },[chatMessages]);


    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    }

    const handleEnterKey = (event) => {
        if(event.keyCode === ENTER_KEY_CODE){
            sendMessage();
        }
    }

    const sendMessage = () => {
        if(user && message){
        console.log("Send!");
        webSocket.current.send(
            JSON.stringify(new chatMessageDTO(user, message))
        );
        setMessage("");
        }
    }

    const listChatMessages = chatMessages.map((chatMessageDTO, index)=> 
        <ListItem key={index}>
            <ListItemText primary={`${chatMessageDTO.user}: ${chatMessageDTO.message}`} />
        </ListItem>
    );

    return(
        <Fragment>
            <Container>
                <Paper elevation={5}>
                    <Box p={3} style={{
                        height: "calc(80vh - 50px)", 
                        flexDirection: "column",
                        justifyContent: "space-around",
                        display: "flex",
                        
                        
                        }}>
                        <Typography variant="h4" gutterBottom>
                            Connect with people !
                        </Typography>
                        <Divider />
                        <Grid container spacing={4} alignItems="center">
                            <Grid id="chat-window" xs ={12} item>
                                <List id="chat-window-messages">
                                    {listChatMessages}
                                    <ListItem ref={scrollBottomRef} />
                                </List>
                            </Grid>
                            
                            <Grid xs={10} item>
                                <FormControl fullWidth>
                                    <TextField onChange={handleMessageChange} onKeyDown={handleEnterKey}
                                        value={message}
                                        label="Type your message here"
                                        variant="outlined"/>
                                </FormControl>
                            </Grid>
                            <Grid xs={1} item>
                                <IconButton onClick={sendMessage}
                                aria-label="send"
                                color="primary">
                                    <SendIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Container>
        </Fragment>
    )
}