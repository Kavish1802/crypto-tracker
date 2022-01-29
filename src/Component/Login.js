import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core';
import { Button, TextField } from '@mui/material';
import React,{useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Context from './ContextApi/CreateContext';

const usestyle = makeStyles((theme) => ({
    container: {
        height: "100vh",
        width: "100%",
        margin: 0,
        backgroundImage: 'url(https://entrepreneurhandbook.co.uk/wp-content/uploads/2018/07/Bitcoin.jpg.webp)',
        backgroundSize: 'cover',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    main: {
        width: "50%",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backdropFilter: 'blur(5px) brightness(40%)',
        borderRadius: '20px',
        padding: '10px'
    },
    heading: {
        fontSize: '1.5rem',
        fontFamily: 'Vujahday Script, cursive',
        color: 'gold',
        fontStyle: 'bold',
    },
    button:{
        display:'flex',
        flexDirection:'row',
    }
}))

const darktheme = createTheme({
    palette: {
        primary: {
            main: '#CBD4D4'
        },
        secondary: {
            main: '#CBD4D4'
        },
        type: 'dark'
    },
})

const Login = () => {

    const classes = usestyle();
    const navigate=useNavigate();
    const {LoginUser}=useContext(Context);
    const [detail, setdetail] = useState({email:"",password:""});

    console.log(detail);
    // const ValidationTextField = styled(TextField)({
    //     '& input':{
    //         color:'white'
    //     },
    //     '& input:valid + fieldset': {
    //         borderColor: 'green',
    //         borderWidth: 2,
    //     },
    //     '& input:invalid + fieldset': {
    //         borderColor: 'white',
    //         borderWidth: 2,
    //     },
    //     '& input:focus + fieldset': {
    //         borderLeftWidth: 6,
    //         borderColor:'white',
    //     },
    // });

    const handleLogin=(e)=>{
        console.log(e.target.id,e.target.value);
        setdetail({...detail,[e.target.id]:e.target.value})
    }

    return (
        <ThemeProvider theme={darktheme}>
            <div className={classes.container}>
                <div className={classes.main}>
                    <h3 className={classes.heading}>Login To Continue Hunting</h3>
                    {/* <TextField
                        label="outlined"
                        variant="outlined"
                        sx={{
                            input: { color: 'white' },
                            borderColor: { color: 'white' }
                        }}
                        fontColor="white"
                    /> */}
                    <TextField
                        label="Email Id"
                        type="email"
                        sx={{input:{color:'white'}}}
                        required
                        variant="outlined"
                        id="email"
                        focused
                        onChange={handleLogin}
                        style={{
                            width:'100%',
                            margin:'5px',
                        }}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        sx={{input:{color:'white'}}}
                        required
                        variant="outlined"
                        id="password"
                        focused
                        onChange={handleLogin}
                        style={{
                            width:'100%',
                            margin:'5px',
                        }}
                    />
                    <div className={classes.button}>
                        <Button 
                        variant='outlined'
                        style={{
                            color:'#F0E584',
                            margin:'20px 5px 20px 5px',
                        }}
                        onClick={()=>{
                            navigate('/signup')
                        }}
                        >
                            Don't have an Account? Signup
                        </Button>
                        <Button 
                        variant='outlined'
                        style={{
                            color:'#F0E584',
                            margin:'20px 5px 20px 5px',
                        }}
                        onClick={()=>{
                            LoginUser(detail.email,detail.password);
                        }}
                        >
                            Login
                        </Button>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    )
};

export default Login;
