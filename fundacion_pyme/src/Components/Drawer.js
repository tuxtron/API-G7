import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import './Drawer.css';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
  rtaList: {
    backgroundColor:'#c6c6c6',
  },
  list: {
    width: 300,
    overflowY: "scroll"
  },
  fullList: {
    width: 'auto',
  },
  form: {
    position:"fixed", 
    bottom:"0", 
  },
  input: {
      height:"50px",
      margin:0,
      borderRadius:0,
      outline: "none"
  }
});

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
    //   onClick={toggleDrawer(anchor, false)}
    //   onKeyDown={toggleDrawer(anchor, false)}
    >
      <List className={classes.rtaList}>
            <ListItem>
                <ListItemText secondary={"Respuesta : me llamo gato"} />
            </ListItem>
      </List>
      <Divider />
      <List>
          <ListItem>
            <ListItemIcon><PersonIcon /></ListItemIcon>
            <ListItemText secondary={
                <React.Fragment>
                    <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                    >
                        Supervisor
                    </Typography>
                    <br/>
                    {"Revisa porque no se llama gato"}
                    <br/>
                    {"11:15"}
                </React.Fragment>
            } />
          </ListItem>
      </List>
      <Divider />
      <List>
          <ListItem>
            <ListItemIcon><PersonIcon /></ListItemIcon>
            <ListItemText secondary={
                <React.Fragment>
                    <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                    >
                        Operador
                    </Typography>
                    <br/>
                    {"ok"}
                    <br/>
                    {"11:30"}
                </React.Fragment>} />
          </ListItem>
      </List>
      <Divider />
      <List className={classes.rtaList}>
            <ListItem>
                <ListItemText secondary={"Respuesta Validada: me llamo Cato"} />
            </ListItem>
      </List>
      <Divider />
      <List>
          <ListItem>
            <ListItemIcon><PersonIcon /></ListItemIcon>
            <ListItemText secondary={
                <React.Fragment>
                    <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                    >
                        Operador
                    </Typography>
                    <br/>
                    {"Revisado"}
                    <br/>
                    {"11:40"}
                </React.Fragment>} />
          </ListItem>
      </List>
      <Divider />

      <form className={classes.form}>
            <input className={classes.input} type="text" placeholder="Escriba su comentario..." />
      </form>
    </div>
  );

  return (
        <React.Fragment key={'right'}>
          <Button className="drawer__btnObservacion" onClick={toggleDrawer('right', true)}>Observación</Button>
          <Drawer anchor={'right'} open={state['right']} onClose={toggleDrawer('right', false)}>
            {list('right')}
          </Drawer>
        </React.Fragment>
  );
}
