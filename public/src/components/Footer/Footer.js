import './Footer.css';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import NorthIcon from '@mui/icons-material/North';

function Footer() {
    return (
        <div className="footerContainer">
            <div className="mainInfo">
                <h2 className="footerTitle colorText">Real Estate Company</h2>
                <img src="images/logo1.png" alt="" className="footerLogo"/>
            </div>
            <div className="aboutUsAndIcons">
                <FacebookIcon className="socialMediaIcons"/>
                <TwitterIcon className="socialMediaIcons"/>
                <InstagramIcon className="socialMediaIcons"/>
                <LinkedInIcon className="socialMediaIcons"/>
                <YouTubeIcon className="socialMediaIcons"/>
            </div>
            <NorthIcon className="moveToTopIcon" onClick={() => window.
                scrollTo({top: 0, behavior: 'smooth'})}/>
        </div>
    );
}

export default Footer;