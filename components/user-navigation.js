/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Avatar from '@material-ui/core/Avatar'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import { ProcessComponentsExpression } from './process-components'
import Popover from '@material-ui/core/Popover'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import Collapse from '@material-ui/core/Collapse'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import useWindowSize from '../utils/use-window-size.ts'
import { makeStyles } from '@material-ui/core/styles'
import { useAuth } from '../auth/auth-provider'
import Link from 'next/link'

const drawerWidth = 240

const useStyles = makeStyles({
  root: {
    display: 'flex'
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    zIndex: 999,
    background: 'transparent',
    boxShadow: 'none'
  },
  mobileAppBar: {
    width: '100%',
    marginLeft: 0,
    zIndex: 999,
    background: 'transparent',
    boxShadow: 'none'
  },
  toolbar: {
    display: 'flex',
    backgroundColor: 'white'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPapper: {
    width: drawerWidth,
    background: 'rgba(59, 130, 246, 1)'
  },
  drawerButton: {
    marginRight: '1rem',
    '&:focus': {
      outline: 'none'
    }
  },
  appName: {
    cursor: 'pointer',
    fontSize: '1.4rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '1.25rem'
  },
  listSubheader: {
    color: 'white',
    fontWeight: '500'
  },
  listItemText: {
    '& .MuiTypography-root': {
      color: 'white',
      fontWeight: '500',
      fontFamily: "'Roboto', sans-serif"
    }
  },
  listItemIcon: {
    color: 'white'
  },
  userAvatar: {
    overflow: 'auto',
    filter: 'drop-shadow(0px 2px 5px rgba(0, 0, 0, 0.25))'
  },
  circleButton: {
    width: '40px',
    height: '40px',
    backgroundColor: 'rgba(59, 130, 246, 1)',
    color: 'white',
    filter: 'drop-shadow(0px 2px 5px rgba(0, 0, 0, 0.25))',
    '&:hover': {
      backgroundColor: 'rgba(59, 130, 246, 1)'
    }
  },
  content: {
    flexGrow: '1',
    paddingTop: '4.5rem'
  }
})

UserNavigation.propTypes = {
  children: PropTypes.any
}

function UserNavigation ({ children }) {
  const classes = useStyles()
  const { logout } = useAuth()
  const [openDrawer, setOpenDrawer] = useState(false)
  const [width] = useWindowSize()

  /**
   * Handle open close navigation drawer
   * @param {boolean} open
   */
  const openNavigationDrawer = open => {
    setOpenDrawer(open)
  }

  return (
    <>
      <div className={classes.root}>
        <AppBar position="fixed" className={(width >= 1024) ? classes.appBar : classes.mobileAppBar}>
          <Toolbar className={classes.toolbar}>
            <ProcessComponentsExpression
              isCanRender={width < 1024}>
              <IconButton
                className={classes.drawerButton}
                aria-label="open navigation drawer"
                onClick={() => openNavigationDrawer(true)}>
                  <Icon>menu</Icon>
              </IconButton>
            </ProcessComponentsExpression>
            <div className="ml-auto flex gap-3">
              <IconButton className={`${classes.circleButton} w-10 h-10`} style={{ marginRight: '0.25rem' }}>
                <Icon>notifications</Icon>
              </IconButton>
              <PopupState variant="popover" popupId="demo-popup-popover">
                {(popupState) => (
                  <>
                    <div className="flex items-center cursor-pointer" style={{ maxWidth: '250px' }} {...bindTrigger(popupState)}>
                      <Avatar className={classes.userAvatar} style={{ backgroundColor: 'rgba(59, 130, 246, 1)' }}/>
                      <ProcessComponentsExpression
                        isCanRender={width > 768}>
                          <span className="ml-2 overflow-hidden overflow-ellipsis whitespace-nowrap" style={{ color: '#6B6363' }}>
                            Welcome !
                          </span>
                      </ProcessComponentsExpression>
                    </div>
                    <Popover
                      className="mt-3"
                      {...bindPopover(popupState)}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                      }}>
                      <List>
                        <Link passHref href="#">
                          <ListItem button>
                            <ListItemIcon>
                              <Icon>person</Icon>
                            </ListItemIcon>
                            <ListItemText primary="Profile"/>
                          </ListItem>
                        </Link>
                        <Link passHref href="#">
                          <ListItem button>
                            <ListItemIcon>
                              <Icon>settings</Icon>
                            </ListItemIcon>
                            <ListItemText primary="Settings"/>
                          </ListItem>
                        </Link>
                        <ListItem button onClick={async () => { await logout() }}>
                          <ListItemIcon>
                            <Icon>logout</Icon>
                          </ListItemIcon>
                          <ListItemText primary={'Logout'}/>
                        </ListItem>
                      </List>
                    </Popover>
                  </>
                )}
              </PopupState>
            </div>
          </Toolbar>
        </AppBar>

        <SwipeableDrawer
          className={classes.drawer}
          classes={{ paper: classes.drawerPapper }}
          open={openDrawer}
          variant={(width >= 1024) ? 'permanent' : 'temporary'}
          onOpen={() => { openNavigationDrawer(true) }}
          onClose={() => { openNavigationDrawer(false) }}>
            <List>
              <div className={classes.appName}>
                <span className="flex justify-center w-full bg-white p-4 mx-4 rounded-2xl">
                  <img src="/favicon.ico" alt="App logo" className="w-14 h-14"/>
                </span>
              </div>

              <Link passHref href="#">
                <ListItem button>
                  <ListItemIcon className={classes.listItemIcon}>
                    <Icon>book</Icon>
                  </ListItemIcon>
                  <ListItemText className={classes.listItemText} primary="My Book"/>
                </ListItem>
              </Link>
            </List>
        </SwipeableDrawer>
        <main className={classes.content}>{children}</main>
      </div>
    </>
  )
}

ListItemColapsible.propTypes = {
  icon: PropTypes.any,
  text: PropTypes.string.isRequired,
  children: PropTypes.any
}

function ListItemColapsible (props) {
  const [open, setOpen] = useState(false)
  const CustomListItemIcon = () => <ListItemIcon>{props.icon}</ListItemIcon>

  /** Open colapsible items */
  const handleOpen = () => {
    setOpen(!open)
  }

  return (
    <>
      <ListItem button style={{ color: 'white' }} onClick={handleOpen}>
        { props.icon ? <CustomListItemIcon/> : null }
        <ListItemText primary={props.text} />
        { open ? <Icon>expand_less</Icon> : <Icon>expand_more</Icon> }
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {props.children}
      </Collapse>
    </>
  )
}

export default UserNavigation
