import { Backdrop } from "@mui/material";
import { HashLoader } from "react-spinners";

function Spinner({open}) {
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
        >
            <HashLoader color="#00d0d0" />
        </Backdrop>
    );
}

export default Spinner;