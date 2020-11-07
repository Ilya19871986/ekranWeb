import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import FlipCameraIosIcon from '@material-ui/icons/FlipCameraIos';
import BuildIcon from '@material-ui/icons/Build';
import BrushIcon from '@material-ui/icons/Brush';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import Panels from '../Panels/Panels'
import File from '../File/File'
import Design from '../Design/Design'
import Program from '../Program/Program'
import Settings from '../Settings/Settings'
import Users from '../Users/Users'
import WelcomePage from '../WelcomePage';
import GroupPanels from '../GroupPanel/GroupPanels'

import AccountCircle from '@material-ui/icons/AccountCircle';

import GroupWorkIcon from '@material-ui/icons/GroupWork';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  icon: {
    color: 'navy',
  },
  title: {
    flexGrow: 1,
  },
}));

export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const [selectedIndex, setSelectedIndex] = React.useState(localStorage.getItem("role") === "1" ? 5: 0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);

    if (index === 6) {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('UserId');
        localStorage.removeItem('UserFolder');
        localStorage.removeItem('RoleName');    
        localStorage.removeItem('surname');
        localStorage.removeItem('name');
        localStorage.removeItem('password');
    };

  }
  if (localStorage.getItem('token') == null || localStorage.getItem('token') == 'undefined') return (<WelcomePage/>)

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed"  className={clsx(classes.appBar, {[classes.appBarShift]: open,  })}  >
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer"  onClick={handleDrawerOpen} edge="start"  className={clsx(classes.menuButton, {[classes.hide]: open,})}>
            <MenuIcon fontSize={"large"}/>
          </IconButton>
          <Typography variant="h6" noWrap className={clsx(classes.title)}>ЭКРАН ОНЛАЙН</Typography>
            <IconButton 
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
            <AccountCircle />
          </IconButton>{(localStorage.getItem('surname') == "null" ? "---" : localStorage.getItem('surname')) + ' ' + 
                        (localStorage.getItem('name') == "null" ? "---" : localStorage.getItem('name')) }
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        
        <List>
          {
            localStorage.getItem("role") === "1" &&
            <ListItem 
            button 
            selected={selectedIndex === 5}
            onClick={(event) => handleListItemClick(event, 5) }
          >
            <ListItemIcon className={classes.icon}><PeopleAltIcon fontSize={"large"}/> </ListItemIcon>
            <ListItemText primary={'Пользователи'} />
          </ListItem>
          }
          {
            localStorage.getItem("role") === "2" &&
            <ListItem  
            button 
            selected={selectedIndex === 0}
            onClick={(event) => handleListItemClick(event, 0) }
          >
            <ListItemIcon className={classes.icon}><AddToQueueIcon fontSize={"large"} /> </ListItemIcon>
            <ListItemText primary={'Мои панели'} />
            </ListItem>
          }

          {
            localStorage.getItem("role") === "2" &&
            <ListItem  
            button 
            selected={selectedIndex === 7}
            onClick={(event) => handleListItemClick(event, 7) }
          >
            <ListItemIcon className={classes.icon}><GroupWorkIcon fontSize={"large"} /> </ListItemIcon>
            <ListItemText primary={'Группы панелей'} />
            </ListItem>
          }
          
          {
            localStorage.getItem("role") === "2" &&
            <ListItem 
            button 
            selected={selectedIndex === 1}
            onClick={(event) => handleListItemClick(event, 1) }
          >
            <ListItemIcon className={classes.icon}><FlipCameraIosIcon fontSize={"large"}/> </ListItemIcon>
            <ListItemText primary={'Файлы'} />
            </ListItem>
          }

          <ListItem 
            button 
            selected={selectedIndex === 2}
            onClick={(event) => handleListItemClick(event, 2) }
          >
            <ListItemIcon className={classes.icon}><BrushIcon fontSize={"large"}/> </ListItemIcon>
            <ListItemText primary={'Дизайн'} />
          </ListItem>

          <ListItem 
            button 
            selected={selectedIndex === 3}
            onClick={(event) => handleListItemClick(event, 3) }
          >
            <ListItemIcon className={classes.icon}><SaveAltIcon fontSize={"large"}/> </ListItemIcon>
            <ListItemText primary={'Программы'} />
          </ListItem>

          <ListItem 
            button 
            selected={selectedIndex === 4}
            onClick={(event) => handleListItemClick(event, 4) }
          >
            <ListItemIcon className={classes.icon}><BuildIcon fontSize={"large"}/> </ListItemIcon>
            <ListItemText primary={'Настройки'} />
          </ListItem>

          
          <Divider /> <Divider /><Divider />
          <ListItem 
            button 
            selected={selectedIndex === 6}
            onClick={(event) => handleListItemClick(event, 6) }
          >
            <ListItemIcon className={classes.icon}><ExitToAppIcon fontSize={"large"}/> </ListItemIcon>
            <ListItemText primary={'Выход'} />
          </ListItem>
        </List>
       
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
          {selectedIndex === 0 && <Panels/> }
          {selectedIndex === 1 && <File/> }
          {selectedIndex === 2 && <Design/> }
          {selectedIndex === 3 && <Program/> }
          {selectedIndex === 4 && <Settings/> }
          {selectedIndex === 5 && <Users/> }
          {selectedIndex === 7 && <GroupPanels/> }
      </main>
    </div>
  );
}