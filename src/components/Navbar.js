import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";

const Navbar = () => {
    return(
        <AppBar position="static" className="navbar">
            <Toolbar>
                <Typography variant="h6">
                    Test Task App
                </Typography>
            </Toolbar>
        </AppBar>
    )
};

export default Navbar;