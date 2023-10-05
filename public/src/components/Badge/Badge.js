import './Badge.css';
import CallIcon from '@mui/icons-material/Call';

function Badge({phoneNumber}) {
    return (
        <div className="badgeContainer">
            <img src="./images/unnamed.jpg" alt="Аватар" className="badgeImg"/>
            <div className="badgeInfoContainer">
                <h2 className="badgeNameInfo">Даниел Делчев</h2>
                <p className="badgeDescriptionInfo">Старши брокер на недвижимо имущество с <span className="differentColorInsideText"><strong>над десетилетие</strong></span> опит.</p>
                <p className="ownerPhoneInfo badgePhoneInfo">Телефон: {phoneNumber}
                    <a href={`tel:${phoneNumber}`}>
                        <CallIcon />
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Badge;