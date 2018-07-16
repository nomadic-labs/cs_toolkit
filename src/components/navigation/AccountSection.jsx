import React from "react";
import Link, { navigateTo } from "gatsby-link";
import firebase from "../../firebase/init";
import { connect } from "react-redux";

import {
  userLoggedIn,
  userLoggedOut,
  toggleRegistrationModal,
} from "../../redux/actions";

import Button from "@material-ui/core/Button";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import List from "@material-ui/core/List";

const styles = {
  iconLabel: {
    marginRight: "4px"
  }
}

class AccountSection extends React.Component {
  state = {
    anchorEl: null
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const ref = firebase
          .app()
          .database()
          .ref(`users/${user.uid}`);
        ref.once("value").then(snapshot => {
          const userData = snapshot.val();
          if (userData) {
            this.props.userLoggedIn(userData);
          } else {
            const newUser = {
              uid: user.uid,
              displayName: user.displayName,
              email: user.email,
              photoURL: user.photoURL
            };
            ref.set(newUser);
            this.props.userLoggedIn(newUser);
          }
        });
      } else {
        this.props.userLoggedOut();
      }

      if (this.props.showRegistrationModal) {
        this.props.onToggleRegistrationModal();
      }
    });
  }

  logout = e => {
    firebase.auth().signOut();
    this.props.userLoggedOut();
    navigateTo("/");
  };

  login = e => {
    this.props.onToggleRegistrationModal();
  };

  openMenu = e => {
    this.setState({ anchorEl: e.currentTarget });
  };

  closeMenu = e => {
    this.setState({ anchorEl: null });
  };

  render() {
    if (this.props.isLoggedIn) {
      const accountName = this.props.user.displayName ? this.props.user.displayName : "Account"
      return(
        <Button color="default" onClick={this.props.onClick}>
          <span className="hide-on-mobile" style={styles.iconLabel}>
            {accountName}
          </span>
          <AccountCircle />
        </Button>
      )
    }

    return(
      <Button color="default" onClick={this.login}>
        <span className="hide-on-mobile" style={styles.iconLabel}>
          Sign In / Sign Up
        </span>
        <AccountCircle />
      </Button>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.adminTools.isLoggedIn,
    user: state.adminTools.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    userLoggedIn: user => {
      dispatch(userLoggedIn(user));
    },
    userLoggedOut: () => {
      dispatch(userLoggedOut());
    },
    onToggleRegistrationModal: () => {
      dispatch(toggleRegistrationModal());
    },
  };
};

export const AccountSectionContent = connect(mapStateToProps, mapDispatchToProps)((props) => {
  const logout = e => {
    firebase.auth().signOut();
    props.userLoggedOut();
    props.closeMenu();
    navigateTo("/");
  };

  return(
    <List
      id="account-dropdown"
      >
      <MenuItem
        component={Link}
        to={"/dashboard"}
        onClick={props.closeMenu}
      >
        Dashboard
      </MenuItem>
      <MenuItem onClick={logout}>Sign out</MenuItem>
    </List>
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountSection);