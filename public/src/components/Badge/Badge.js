import './Badge.css';
import CallIcon from '@mui/icons-material/Call';

function Badge({phoneNumber}) {
    return (
        <div className="badgeContainer">
            <img src="./images/unnamed.jpg" alt="avatar" className="badgeImg"/>
            <div className="badgeInfoContainer">
                <h2 className="badgeNameInfo">Daniel Delchev</h2>
                <p className="badgeDescriptionInfo">Senior Real Estate with more than two decades of experience.</p>
                <p className="ownerPhoneInfo badgePhoneInfo">Phone: {phoneNumber}
                    <a href={`tel:${phoneNumber}`}>
                        <CallIcon />
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Badge;