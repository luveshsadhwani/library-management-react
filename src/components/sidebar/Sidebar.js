import React from 'react'
import './Sidebar.css'
import { Redirect } from "react-router-dom"
import { useHistory } from 'react-router-dom';
import { NavLink } from "react-router-dom"

// Custom Css
import "./Sidebar.css"

import AppNavigator from '../navigator/AppNavigator';

// Material Ui imports
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import AddToPhotosRoundedIcon from '@material-ui/icons/AddToPhotosRounded';
import EventSeatRoundedIcon from '@material-ui/icons/EventSeatRounded';
import GpsFixedRoundedIcon from '@material-ui/icons/GpsFixedRounded';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
// Material Ui imports end

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
           
        },
    },
    appBar: {
        color:"white",
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
            backgroundColor:"#594f8d"
        },
    },
    menuButton: {
        
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
            
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
        backgroundColor:"#111",
        color:"white"
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));



function Sidebar(props) {

    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List>
                <NavLink exact to="/home" className="style-link">
                    <ListItem button className="glowonhover">
                        <ListItemIcon><HomeIcon className="color-icon"/></ListItemIcon>
                        <ListItemText>Home</ListItemText>
                    </ListItem>
                </NavLink>

                <NavLink exact to="/home/profile" className="style-link">
                    <ListItem button className="glowonhover">
                        <ListItemIcon><AccountCircleRoundedIcon className="color-icon"/></ListItemIcon>
                        <ListItemText>Account</ListItemText>
                    </ListItem>
                </NavLink>

                <NavLink exact to="/home/dashboard" className="style-link">
                    <ListItem button className="glowonhover">
                        <ListItemIcon><DashboardRoundedIcon className="color-icon"/></ListItemIcon>
                        <ListItemText>Dashboard</ListItemText>
                    </ListItem>
                </NavLink>

                <NavLink exact to="/home/add" className="style-link">
                    <ListItem button className="glowonhover">
                        <ListItemIcon><AddToPhotosRoundedIcon className="color-icon"/></ListItemIcon>
                        <ListItemText>Add Entry</ListItemText>
                    </ListItem>
                </NavLink>

                <NavLink exact to="/home/events" className="style-link">
                    <ListItem button className="glowonhover">
                        <ListItemIcon><EventSeatRoundedIcon className="color-icon"/></ListItemIcon>
                        <ListItemText>Events</ListItemText>
                    </ListItem>
                </NavLink>

                <NavLink exact to="/home/location" className="style-link">
                    <ListItem button className="glowonhover">
                        <ListItemIcon><GpsFixedRoundedIcon className="color-icon"/></ListItemIcon>
                        <ListItemText>Location</ListItemText>
                    </ListItem>
                </NavLink>
            </List>
            <Divider />
            <List>
                <ListItem button onClick={log_out} className="glowonhover">
                    <ListItemIcon><ExitToAppRoundedIcon className="color-icon "/></ListItemIcon>
                    <ListItemText>Logout</ListItemText>
                </ListItem>
            </List>
        </div>
    );

    let history = useHistory();
    function log_out() {
        localStorage.clear()
        history.push("/")
    }
    const container = window !== undefined ? () => window().document.body : undefined;
    console.log(`auth check is ${props.auth_check}`)
    if (props.auth_check) {
        return (
            <div className="wrapper">
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar className="colorme">
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            className={classes.menuButton}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            {`Welcome ${props.user}`}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <nav className={classes.drawer} aria-label="mailbox folders">
                    <Hidden smUp implementation="css">
                        <Drawer
                            container={container}
                            variant="temporary"
                            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            variant="permanent"
                            open
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                </nav>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    {/* <div className="header">Welcome!!</div>
                    <div className="info">
                        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae eius adipisci nihil natus temporibus facere animi qui praesentium, dolore suscipit aliquid impedit saepe amet ad nostrum quas et debitis accusantium nulla. Dolore laboriosam sed suscipit, fugiat iure aperiam ab ut placeat. Soluta a numquam nam eveniet ipsum, laudantium labore minus dignissimos molestias commodi at accusantium eligendi quis aperiam possimus natus eius hic aut beatae facilis quibusdam fuga voluptates dolorem? Veritatis corporis doloribus illo optio delectus consequatur, at perspiciatis veniam laboriosam, dolores ipsum nemo error vel sit ut aliquid. Excepturi esse laboriosam dolor, ad eos quis dicta quidem unde porro voluptatibus eveniet atque consequuntur recusandae fugit dolores rerum at. Facere, perspiciatis ipsa adipisci provident delectus tempore deserunt voluptatum ducimus. Dolores esse obcaecati sit aliquam voluptatibus, autem eveniet, neque illo nostrum quae sequi culpa quod cumque omnis inventore dolore vitae, fugit nesciunt ipsam repudiandae nam sint voluptates? Excepturi temporibus ducimus omnis, modi atque nam necessitatibus eum! Qui vel aliquam quae maxime. Minus quae, dolore voluptate sunt obcaecati reiciendis! Commodi voluptates illo odio minima, voluptatum esse fugit corrupti laudantium tempora reprehenderit fugiat numquam quo assumenda qui facilis magnam magni aliquam aut atque voluptas ipsum animi dolorem vero. Dolor dolorum perspiciatis voluptate deserunt blanditiis placeat? Autem quae inventore quasi totam nostrum tenetur iusto veniam tempora animi quisquam deserunt, sed ratione quod neque atque nihil ut, minima tempore. Pariatur voluptas possimus ipsum modi aliquid iure et dolore debitis aliquam placeat rem, eligendi fuga eaque sit sunt cum in similique. Porro animi accusantium, ipsam aliquid sapiente inventore esse iusto debitis ad ipsa praesentium facere nulla nisi eum voluptatem perferendis sed. Modi impedit beatae quia a exercitationem ratione, harum cum voluptatibus iste similique sunt labore alias sequi earum delectus voluptatum asperiores repellendus, perspiciatis voluptate fugiat! Similique optio ad aliquam consequuntur suscipit magni pariatur dolores veritatis, nulla recusandae enim commodi sequi dolorem quas, corrupti dolor vel atque aliquid quo cupiditate unde nihil accusamus? Sint rerum error voluptatibus eum vero minus odit, architecto dolorem illo atque, ea in. Laborum modi, laboriosam unde quod ratione facere dolores. Ea, ipsum ratione facilis illo molestiae nostrum repellat rem voluptas ipsa, iusto nulla dicta porro enim autem. Eum veniam sequi nihil consectetur pariatur beatae? Cum, vel sunt itaque id accusamus ducimus ipsum libero labore, harum et minus commodi magni sapiente eveniet totam necessitatibus alias. Libero tempore tenetur atque corrupti reiciendis corporis veritatis soluta est minus ut in nostrum, alias quidem sequi, quos porro. Fugit aspernatur quod sunt odit placeat! Officia ea veniam illum magni voluptatem eos itaque facilis modi temporibus nulla assumenda tempora atque, soluta autem labore laborum vero adipisci quis hic ipsam eum. Nihil iste et tempora laborum eius nemo expedita voluptas delectus dolor fuga omnis, quae dolorum iure illo earum explicabo, laudantium voluptatibus vel tenetur quibusdam voluptate sit corrupti sapiente ratione. Modi, natus. Consequatur explicabo beatae, accusantium reprehenderit, similique deleniti asperiores minus doloribus recusandae dolores aliquam ipsa repudiandae veritatis autem dolorem. Est cumque a porro doloremque, debitis nemo sequi, temporibus voluptas vero vitae accusantium dolorem ab optio fugit, voluptatum asperiores eius. Quis omnis numquam exercitationem necessitatibus delectus eum voluptas cum incidunt? Doloremque dignissimos dolorum accusamus perferendis id aliquam nobis ex laboriosam animi! Debitis, praesentium tenetur eos cum accusamus velit iure sunt, explicabo fugiat illo neque tempora aperiam eaque id eligendi dicta similique error incidunt officia fuga ullam eius accusantium repudiandae asperiores! Natus ab ea magnam, ullam dignissimos commodi esse earum hic mollitia tempore unde maxime quos est itaque in tenetur! Facilis fuga, ex, minima fugit quidem deserunt libero at suscipit a quis rerum quibusdam dolores culpa vero temporibus sapiente! Placeat voluptate facilis, natus labore amet mollitia perferendis autem. Adipisci, nemo saepe. Porro nesciunt nemo quaerat qui cum ab delectus, autem error ipsam consequatur nulla et atque quod voluptatibus vero dolores vel! Ad, rem esse cupiditate iusto debitis atque. Rem consectetur voluptatem in eaque aperiam commodi, repellendus, quo sint ex at itaque consequatur sed dignissimos, harum culpa facilis autem fuga quisquam quia. Esse molestias temporibus corporis ad, numquam ex ipsam accusantium illo nesciunt eum? Quisquam a quibusdam omnis velit veniam vitae libero iure similique. Harum quia temporibus, quam quidem atque laudantium, esse veritatis numquam explicabo autem sunt! Praesentium placeat expedita, voluptas nemo aliquam architecto? Esse saepe consequuntur dolor excepturi quidem illo necessitatibus ipsum animi, sapiente inventore sint beatae laboriosam dolore expedita accusamus tempore nemo quo eos facere, libero nulla aliquid minus? Dolores ducimus consequatur adipisci quas incidunt harum, nam nisi nobis laborum odio! Pariatur ratione cumque minima aspernatur vero. Laboriosam quaerat exercitationem eum voluptatibus? Consectetur suscipit, quibusdam quam aspernatur tempora perferendis eum illo eligendi, temporibus ab accusantium nisi nostrum reprehenderit modi consequuntur dolore ut quidem. Distinctio tempore excepturi animi. Laborum, neque exercitationem incidunt soluta, delectus quidem ipsum sunt praesentium expedita fugit eos eaque error molestias velit, maxime animi. Natus, corrupti rerum. Vero ipsum facilis perferendis dolores ipsam quisquam reiciendis nobis, asperiores quia cupiditate labore expedita saepe! Nostrum sed autem eos, at animi delectus sapiente! Debitis consequatur sunt consequuntur molestias corrupti doloremque optio minima recusandae beatae nobis eaque, iusto quam facilis eligendi fugit. Libero amet repellendus, vitae esse mollitia ipsam, doloremque dolores, magnam eveniet nemo ex sed. Amet, maiores quisquam? At consequuntur corporis corrupti, veritatis quas quae in, natus eius molestias aliquam error. Error ad accusamus, obcaecati fuga provident aliquam tempore. Beatae enim natus repudiandae voluptates, magni eum molestias quos ad praesentium. Nihil dolorum temporibus perspiciatis harum adipisci expedita obcaecati beatae minima, laboriosam quae impedit culpa et praesentium. Quam, aspernatur dignissimos! Molestias, quibusdam. Officiis ab modi eligendi aliquid velit atque veniam tempore. Distinctio ullam labore ut harum est officiis reprehenderit facilis commodi, eaque quia eum delectus aut hic id omnis placeat porro molestiae. Similique, ad quasi debitis repudiandae nihil eaque et error velit illum nostrum harum quam rem dolorem nobis laudantium. Nostrum aut labore error! Animi suscipit sit pariatur doloremque facilis dolorem fuga cumque unde voluptates expedita, sint autem ullam dignissimos voluptatibus. Cumque sequi ullam soluta praesentium laborum dignissimos accusamus ipsa cupiditate, aliquam reiciendis quibusdam veritatis sapiente alias nobis dolorem eos sit iure delectus nostrum labore laudantium? Vitae, nobis? Iure optio dignissimos facilis.</div> */}

                    {/* </div> */}
                        <AppNavigator />
                </main>
            </div>
        )
    } else {
        return (
            <Redirect to="/" />
        )
    }
}
export default Sidebar

