import * as React from 'react';
import SignIn from './SignIn';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';




// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    return <Box className="container" >

        <img className="banner" src="https://tinyimg.io/i/ioURX0w.png" alt="banner" style={{
            marginTop: "100px"
        }}></img>

        <div className="row">


            <div className="col-4">
                <SignIn />
            </div>


            <div className="col-4 offset-2">
                <div className="col-md-12">
                    <div className="card card-container" style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px"
                    }}>

                        <div style={{
                            border: "15px",
                            fontWeight: "500",
                            color: "black",
                            fontFamily: "Roboto",
                            fontSize: "18px",
                            height: "35px",
                            textAlign: "center",
                        }}>
                            Don't have an account ?
                        </div>

                        <Button variant="contained" disabled={true} style={{
                            backgroundColor: "#ff713e",
                            display: "flex",
                            gap: "10px"
                        }}>
                            <img src="https://tinyimg.io/i/kmAR5A5.png" alt="google" style={{ filter: "invert(100%)", padding: "5px" }} />
                            Sign Up with Google
                        </Button>

                        <Divider >
                            <Chip label="or" style={{ backgroundColor: "#ccc" }} />
                        </Divider>


                        <Link to="/register" style={{ color: '#fff', textDecoration: 'none' }}>
                            <Button variant="contained" style={{
                                backgroundColor: "#ff713e",
                            }}>Sign Up with E-mail</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    </Box>
};