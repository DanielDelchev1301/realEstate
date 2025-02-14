import { Backdrop } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import './ImagesCloseView.css';

function ImagesCloseView({open, images, setOpenImagesCloseView}) {
    return (
        <Backdrop
            sx={{ color: '#aaa', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={() => setOpenImagesCloseView(false)}
        >
            <Carousel
                className="carouselCloseView"
                navButtonsAlwaysVisible={true}
            >
                {images && images.map(image => (
                    <img src={`https://realestatebulgariaserver.onrender.com/${image.destination}${image.filename}`} alt="снимки на имота" className="propertyImageCloseView" />
                ))}
            </Carousel>
        </Backdrop>
    );
}

export default ImagesCloseView;