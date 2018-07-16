import React from "react";
import PropTypes from "prop-types";
import Link, { navigateTo } from "gatsby-link";
import { filter, orderBy } from "lodash";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Drawer from '@material-ui/core/Drawer';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import logo from "../../assets/img/coalition-logo.png";
import RegistrationModal from "./RegistrationModal";
import MenuSection from "./MenuSection";
import AccountSection from "./AccountSection";
import AdminSectionContainer from "../../containers/AdminSectionContainer";


const styles = theme => ({
  drawerPaper: {
    maxWidth: '80vw',
    minWidth: '280px',
    background: theme.palette.grey[100],
  },
  toolbar: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end"
  },
  logo: {
    height: "60px",
    marginBottom: "4px",
    marginTop: "4px"
  },
  yellow: {
    color: "#f7a700",
  },
  orange: {
    color: "#f06b33",
  },
  teal: {
    color: "#01b4aa",
  },
  root: {
    fontSize: '1rem',
    whiteSpace: 'normal',
    height: 'auto',
  },
  list: {
    paddingTop: 0,
    paddingBottom: 0,
  }
});

const menuSections = [
  {
    title: "Introduction",
    color: null,
    pageType: "about"
  },
  {
    title: "A: Analysis",
    color: "yellow",
    pageType: "building_block_a"
  },
  {
    title: "B: Design",
    color: "orange",
    pageType: "building_block_b"
  },
  {
    title: "C: MEAL",
    color: "teal",
    pageType: "building_block_c"
  },
  {
    title: "Case Study",
    color: null,
    pageType: "case_study"
  },
  {
    title: "Tools",
    color: null,
    pageType: "tools"
  },
  {
    title: "Reference",
    color: null,
    pageType: "reference"
  }
];

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    }
  }

  filterPagesByType = type => {
    return orderBy(
      filter(this.props.pages, page => page.node.navigation.group === type),
      "node.navigation.order"
    );
  };

  openMenu = e => {
    this.setState({ anchorEl: e.currentTarget })
  }

  closeMenu = e => {
    this.setState({ anchorEl: null })
  }

  render() {
    const openModal = Boolean(this.props.showRegistrationModal);
    const openMenu = Boolean(this.state.anchorEl)

    return (
      <div>
        <AppBar color="inherit" position="static">
          <Toolbar className={this.props.classes.toolbar}>
            <Link to="/">
              <img className={this.props.classes.logo} src={logo} alt="Save the Children" />
            </Link>

            <IconButton
              aria-label="Menu"
              aria-owns={openMenu ? 'main-menu' : null}
              aria-haspopup="true"
              onClick={this.openMenu}
            >
              <MenuIcon />
            </IconButton>

            <Drawer
              anchor="right"
              open={openMenu}
              onClose={this.closeMenu}
              classes={{
                paper: this.props.classes.drawerPaper,
              }}
            >
              <List>
                {menuSections.map(section => {
                  const pages = this.filterPagesByType(section.pageType);
                  return (
                    <ExpansionPanel key={section.navGroup} className={this.props.classes.expanded}>
                      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} className={this.props.classes[section.color]}>
                        {section.title}
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <List className={this.props.classes.list}>
                        {pages.map(pageNode => {
                          const page = pageNode.node;
                          const pageTitle = page.navigation.displayTitle || page.title;

                          return (
                            <MenuItem
                              key={page.slug}
                              component={Link}
                              to={`/${page.slug}`}
                              onClick={this.closeMenu}
                              tabIndex={0}
                              className={this.props.classes.root}
                              margin="dense"
                            >
                              {pageTitle}
                            </MenuItem>
                          );
                        })}
                        </List>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  );
                })}
              </List>
            </Drawer>

          </Toolbar>
        </AppBar>
        <RegistrationModal
          open={openModal}
          onToggleRegistrationModal={this.props.onToggleRegistrationModal}
        />
      </div>
    );
  }
}

export default withStyles(styles)(Navigation);