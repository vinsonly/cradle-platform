import { Dispatch, bindActionCreators } from 'redux';
import { Link, Route, Switch } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { push } from 'connected-react-router';
import { OrNull, User } from '@types';
import { AdminPage } from '../pages/admin';
import AppBar from '@material-ui/core/AppBar';
import AppImg from './img/app_icon.png';
import CreateImg from './img/create.svg';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import EduImg from './img/graduation-cap-solid.svg';
import { HelpPage } from '../pages/help';
import { HomePage } from '../pages/home';
import { Icon } from 'semantic-ui-react';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { LoginPage } from '../pages/login';
import { NewReadingPage } from '../pages/newReading';
import { NotFoundPage } from '../pages/notFound';
import { PatientSummaryContainer } from '../shared/components/patientSummary/container';
import PatientsImg from './img/patients.svg';
import { PatientsPage } from '../pages/patients';
import { PrivateRoute } from './privateRoute';
import { ReduxState } from '../redux/rootReducer';
import ReferralsImg from './img/referrals.svg';
import { ReferralsPage } from '../pages/referrals';
import { RoleEnum } from '../enums';
import { SignUpPage } from '../pages/signUp';
import StatisticsImg from './img/statistics.svg';
import { StatisticsPage } from '../pages/statistics';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { VideoChatPage } from '../pages/videoChat';
import VideoImg from './img/video-solid.svg';
import { VideoSessionPage } from '../pages/videoSession';
import { connect } from 'react-redux';
import { logoutUser } from '../shared/reducers/user/currentUser';
import { makeStyles } from '@material-ui/core/styles';
import { routesNames } from './toolbar/utils';
import { Pathname } from 'history';

const drawerWidth = 200;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    backgroundColor: '#15152B',
    zIndex: theme.zIndex.drawer + 1,
  },
  toolbarButtons: {
    marginLeft: 'auto',
    marginRight: -12,
  },
  toolbarButtonsPadded: {
    marginLeft: 'auto',
    paddingLeft: 30,
    paddingRight: 30,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#3b679e+0,34787e+0,45889f+51,65a6df+100 */
    background: '#3b679e' /* Old browsers */,
    //@ts-ignore
    background:
      '-moz-linear-gradient(top,  #3b679e 0%, #34787e 0%, #45889f 51%, #65a6df 100%)' /* FF3.6-15 */,
    //@ts-ignore
    background:
      '-webkit-linear-gradient(top,  #3b679e 0%,#34787e 0%,#45889f 51%,#65a6df 100%)' /* Chrome10-25,Safari5.1-6 */,
    //@ts-ignore
    background:
      'linear-gradient(to bottom,  #3b679e 0%,#34787e 0%,#45889f 51%,#65a6df 100%)' /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */,
    filter:
      "progid:DXImageTransform.Microsoft.gradient( startColorstr='#3b679e', endColorstr='#65a6df',GradientType=0 )" /* IE6-9 */,

    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
  listItem: { flexDirection: 'column', margin: '10px 0px 10px 0px' },
  logout: { marginTop: '20px', bottom: 0 },
  itemText: { color: 'white', paddingTop: '8px' },
}));

interface IProps {
  loggedIn: boolean;
  logoutUser: () => void;
  navigateToHelpPage: () => void;
  user: OrNull<User>;
  pathName: Pathname;
}

const Component: React.FC<IProps> = (props) => {
  const classes = useStyles();
  const [activeItem, setActiveItem] = useState<OrNull<string>>(null);

  useEffect(() => {
    const pathNameRoute = props.pathName.replace('/', '');
    setActiveItem(routesNames[pathNameRoute]);
  }, [props.pathName]);

  const getRole = (roles?: Array<RoleEnum>): string => {
    if (!roles) {
      return ``;
    }

    if (roles.includes(RoleEnum.ADMIN)) {
      return `ADMIN`;
    } else if (roles.includes(RoleEnum.HCW)) {
      return `Healthcare Worker`;
    } else if (roles.includes(RoleEnum.CHO)) {
      return `CHO`;
    } else if (roles.includes(RoleEnum.VHT)) {
      return `VHT`;
    }
    return ``;
  };

  const titleTextStyle = {
    fontFamily: `Open Sans`,
    fontWeight: `bold` as `bold`,
    fontSize: 36,
  };

  const sidebarTextStyle = {
    fontFamily: `Open Sans`,
    fontWeight: 300,
    fontSize: 18,
  };

  const offsetFromTop = 50;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <img src={AppImg} className="appIcon" />
          <Typography noWrap style={titleTextStyle}>
            CRADLE
          </Typography>
          {props.loggedIn && (
            <div style={{ marginLeft: 'auto', marginRight: 0 }}>
              <IconButton
                className={classes.toolbarButtons}
                onClick={() => ''}
                color="inherit">
                <Icon name="user circle" size="large" />
                <div>
                  <Typography variant="body1" noWrap>
                    {props.user?.firstName} ({getRole(props.user?.roles)})
                  </Typography>
                  {props.user?.healthFacilityName && (
                    <Typography variant="body2" noWrap>
                      Healthcare Facility: {props.user?.healthFacilityName}
                    </Typography>
                  )}
                </div>
              </IconButton>

              <IconButton
                className={classes.toolbarButtonsPadded}
                onClick={() => {
                  setActiveItem('Help');
                  props.navigateToHelpPage();
                }}
                color="inherit">
                <Icon name="help" size="small" />
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>

      {props.loggedIn ? (
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left">
          <div
            className={classes.toolbar}
            style={{ marginTop: offsetFromTop }}
          />
          <List>
            <ListItem
              className={classes.listItem}
              button
              component={Link}
              to="/newreading"
              selected={activeItem === 'Reading'}
              onClick={() => setActiveItem('Reading')}>
              <ListItemIcon>
                <img src={CreateImg} style={{ width: `75%` }} />
              </ListItemIcon>
              <ListItemText
                disableTypography
                className={classes.itemText}
                primary={
                  <Typography style={sidebarTextStyle}>
                    Patient &amp; Reading
                  </Typography>
                }
              />
            </ListItem>
            <ListItem
              className={classes.listItem}
              button
              component={Link}
              to="/patients"
              selected={activeItem === 'Patients'}
              onClick={() => setActiveItem('Patients')}>
              <ListItemIcon>
                <img src={PatientsImg} style={{ width: `75%` }} />
              </ListItemIcon>
              <ListItemText
                disableTypography
                className={classes.itemText}
                primary={
                  <Typography style={sidebarTextStyle}>Patients</Typography>
                }
              />
            </ListItem>
            <ListItem
              className={classes.listItem}
              button
              component={Link}
              to="/referrals"
              selected={activeItem === 'Referrals'}
              onClick={() => setActiveItem('Referrals')}>
              <ListItemIcon>
                <img src={ReferralsImg} style={{ width: `75%` }} />
              </ListItemIcon>
              <ListItemText
                disableTypography
                className={classes.itemText}
                primary={
                  <Typography style={sidebarTextStyle}>Referrals</Typography>
                }
              />
            </ListItem>
            <ListItem
              className={classes.listItem}
              button
              component={Link}
              to="/stats"
              selected={activeItem === 'Statistics'}
              onClick={() => setActiveItem('Statistics')}>
              <ListItemIcon>
                <img src={StatisticsImg} style={{ width: `75%` }} />
              </ListItemIcon>
              <ListItemText
                disableTypography
                className={classes.itemText}
                primary={
                  <Typography style={sidebarTextStyle}>Statistics</Typography>
                }
              />
            </ListItem>
            <ListItem
              className={classes.listItem}
              button
              component={Link}
              to="/chat/landing"
              selected={activeItem === 'Chat'}
              onClick={() => setActiveItem('Chat')}>
              <ListItemIcon>
                <img src={VideoImg} style={{ width: `75%` }} />
              </ListItemIcon>

              <ListItemText
                disableTypography
                className={classes.itemText}
                primary={
                  <Typography style={sidebarTextStyle}>
                    Live Video Chat
                  </Typography>
                }
              />
            </ListItem>
            <ListItem
              className={classes.listItem}
              button
              component={Link}
              to="/resources"
              selected={activeItem === 'Resources'}
              onClick={() => setActiveItem('Resources')}>
              <ListItemIcon>
                <img src={EduImg} style={{ width: `75%` }} />
              </ListItemIcon>

              <ListItemText
                disableTypography
                className={classes.itemText}
                primary={
                  <Typography style={sidebarTextStyle}>Resources</Typography>
                }
              />
            </ListItem>

            <Divider />

            {props.user?.roles.includes(RoleEnum.ADMIN) && (
              <div>
                <ListItem
                  className={classes.listItem}
                  component={Link}
                  button
                  key="new user"
                  to="/signup"
                  selected={activeItem === 'Signup'}
                  onClick={() => setActiveItem('Signup')}>
                  <ListItemText
                    disableTypography
                    className={classes.itemText}
                    primary={
                      <Typography style={sidebarTextStyle}>
                        Create New User
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem
                  className={classes.listItem}
                  component={Link}
                  button
                  key="new user"
                  to="/admin"
                  selected={activeItem === 'Admin'}
                  onClick={() => setActiveItem('Admin')}>
                  <ListItemText
                    disableTypography
                    className={classes.itemText}
                    primary={
                      <Typography style={sidebarTextStyle}>
                        Admin Panel
                      </Typography>
                    }
                  />
                </ListItem>

                <Divider />
              </div>
            )}

            <ListItem
              className={`${classes.listItem} ${classes.logout}`}
              button
              key="Logout"
              onClick={() => props.logoutUser()}>
              <ListItemText
                disableTypography
                className={classes.itemText}
                primary={
                  <Typography style={sidebarTextStyle}>Logout</Typography>
                }
              />
            </ListItem>
          </List>
        </Drawer>
      ) : null}

      <main className={classes.content} style={{ paddingTop: offsetFromTop }}>
        <div className={classes.toolbar} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <PrivateRoute exact path="/admin" component={AdminPage} />
          <PrivateRoute exact path="/help" component={HelpPage} />
          <PrivateRoute exact path="/patients" component={PatientsPage} />
          <PrivateRoute
            path="/patient/:id"
            component={PatientSummaryContainer}
          />
          <PrivateRoute exact path="/signup" component={SignUpPage} />
          <Route exact path="/login" component={LoginPage} />
          <PrivateRoute exact path="/stats" component={StatisticsPage} />
          <PrivateRoute exact path="/referrals" component={ReferralsPage} />
          <PrivateRoute exact path="/newreading" component={NewReadingPage} />
          <PrivateRoute exact path="/resources" component={HelpPage} />
          <PrivateRoute exact path="/chat/landing" component={VideoChatPage} />
          <PrivateRoute
            exact
            path="/chat/session"
            component={VideoSessionPage}
          />
          <PrivateRoute
            exact
            path="/chat/session/:roomId"
            component={VideoSessionPage}
          />
          <PrivateRoute component={NotFoundPage} />
        </Switch>
      </main>
    </div>
  );
};

const mapStateToProps = ({ user, router }: ReduxState) => ({
  loggedIn: user.current.loggedIn,
  user: user.current.data,
  pathName: router.location.pathname,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  ...bindActionCreators(
    {
      logoutUser,
    },
    dispatch
  ),
  navigateToHelpPage: () => dispatch(push(`/help`)),
});

export const App = connect(mapStateToProps, mapDispatchToProps)(Component);
