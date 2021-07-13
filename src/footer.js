import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Divider, TextField, Typography, Button, Container, Grid, Tooltip} from '@material-ui/core/';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    backgroundColor: '#021022',
    color: '#fff',
    padding: 20,
    paddingBottom: 0,
    alignItems: 'center',
    minHeight: 250,
    marginTop: '100px'
  },
  image: {
    height: 30,
  },
  divider: {
    margin: '20px 0px',
    backgroundColor: '#FFF',
  },
  share: {
    margin: 5,
    height: 30
  },
  heading: {
    color: '#FFF'
  },
  input: {
    margin: '10px 0px',
    backgroundColor: '#5A616A',
    outline: 'none',
    color: '#E0E0E0',
    borderRadius: 40,
    flex: 2,
    maxHeight: 40,
    paddingRight: 40,
    minWidth: 300,
    [theme.breakpoints.down('sm')]: {
      paddingRight: 0,
      width: '90%'
    }
  },
  mainContainer: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'center'
    }
  },
  primaryButton: {
    background: 'rgb(151, 136, 238)',
    color: 'black',
    marginTop: '10px 0px',
    minWidth: 120,
    maxHeight: 40,
    marginLeft: -45,
    borderRadius: '50px',
    height: '56px',
    textTransform: 'none',
    '&:hover': {
      background: 'black',
      color: 'rgb(151, 136, 238)',
      border: '1px solid white'
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: 10,
      marginLeft: 0,
      height: 38
    }
  },
  mobileOrder: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      marginTop: 10,
      alignItems: 'center',
      marginBottom: 20
    },
  },
  signUpBox: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: 20
    },
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },
  subheading: {
    fontSize: 12,
    color: '#FFF'
  }
}));

export default function Footer() {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [copied, setCopied] = useState(false);
  const [isFormSubmitted, setFormSubmitted] = useState(false);

  const onChange = (e) => {
    const {value} = e.target;
    setEmail(value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(email === '') {
      return;
    }
    const form = {
      email: email,
      formType: 'email'
    }
    const settings = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form)
    };
    try {
      const fetchResponse = await fetch(`${process.env.REACT_APP_URL}/submit_form`, settings);
      const data = await fetchResponse.json();
      setFormSubmitted(true);
      return data;
    } catch (e) {
        return e;
    } 
  }

  return (
    <footer className={classes.root}>
      <Container>
        <Grid container justify='space-between' className={classes.mainContainer}>
          <Grid className={classes.mobileOrder}>
            <Typography variant="h6" className={classes.heading}>Sharing is caring</Typography>
            <Grid>
              <a href="#" target="_blank">
                <img src="https://www.pinclipart.com/picdir/middle/548-5485361_logo-facebook-black-and-white-computer-icons-transparent.png" className={classes.share}/>
              </a>
              <a href="#" target="_blank">
                <img src="data:image/png;base64,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" className={classes.share}/>
              </a>
              <a href="#" target="_blank">
                <img src="https://image.similarpng.com/very-thumbnail/2020/06/Black-icon-Twitter-logo-transparent-PNG.png" className={classes.share}/>
              </a>
            </Grid>
          </Grid>
          <Grid className={classes.signUpBox}>
            <Typography className={classes.subheading} gutterBottom>Like what you see?</Typography>
            <Typography className={classes.heading} gutterBottom><b>Sign up for the latest news and updates.</b></Typography>
            <Grid container justify='center' alignItems='center' className={classes.textFieldContainer}>
              <form onSubmit={handleSubmit} className={classes.form}>
                <TextField variant="outlined" type="email" onChange={onChange} value={email} placeholder="Email" id="email" 
                  className={classes.input} size="small" inputProps={{style: {color: '#FFF'}}} required/>
                <Button className={classes.primaryButton} type="submit">Sign up</Button>
              </form>
            </Grid>
            {isFormSubmitted && <Typography style={{color: '#FFF'}} variant="body2">Thank you for signing up!</Typography>}
          </Grid>
        </Grid>
        <Divider className={classes.divider}/>
        <Grid container justify='center' direction='column' alignItems='center'>
          <img style={{width:"10%",height:"10%",borderRadius:"50%"}} src="https://media-exp3.licdn.com/dms/image/C4E03AQGh3fX1JMs6jQ/profile-displayphoto-shrink_200_200/0/1568047722967?e=1631145600&v=beta&t=DhyWEITKvUxqXTOj4oYkJb5Xrk3xMb3qXlSmYsDgt2s" className={classes.image}/>
          <Typography style={{marginTop: 5, color: '#DEDEDE'}} variant="body2">&#169; 2021 sanyat.hoque@gmail.com</Typography>
        </Grid>
      </Container>
    </footer>
  );
}
