import { Backdrop } from "@mui/material";
import { HashLoader } from "react-spinners";

function Spinner({open}) {
    return (
        <Backdrop
            sx={{ color: '#8b8b8b', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
        >
            <HashLoader color="#00d0d0" />
        </Backdrop>
    );
}

export default Spinner;