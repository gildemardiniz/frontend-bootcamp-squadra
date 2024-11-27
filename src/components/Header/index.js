import MailIcon from '@mui/icons-material/Mail';
import SettingsIcon from '@mui/icons-material/Settings';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';

const Header = () => {

    return (
        <div id='home'>
            <nav className="navbar navbar-expand-lg navbar-fixed-top  bg-light border-bottom border-body mb-3">
                <div className="container flex-row">
                    <div className='d-flex'>
                        <a className="navbar-brand" href="#..."><img className=" mx-3 img-fluid " width="100" src='https://demo.dashboardpack.com/analytic-html/img/logo.png' alt="" /></a>
                    </div>
                    <div className='d-flex align-items-cente'>
                        <Badge className='mt-3 mx-2' badgeContent={4} color="primary">
                            <MailIcon color="action" />
                        </Badge>
                        <Badge className='mt-3 mx-2' badgeContent={0} color="primary">
                            <SettingsIcon color="action" />
                        </Badge>
                        <Badge className='mt-1 mx-2' color="secondary" overlap="circular" badgeContent=" " variant="dot">
                            <Avatar alt="Remy Sharp" src='https://assets.minimals.cc/public/assets/images/mock/avatar/avatar-25.webp' />
                        </Badge>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;