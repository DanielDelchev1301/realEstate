import { useEffect, useState } from 'react';
import './FreeEvaluation.css';
import { getAllProperties } from '../../service/propertyService';
import Map from '../Explore/Map';

function FreeEvaluation() {
    const [propertiesList, setPropertiesList] = useState([]);

    useEffect(() => {
        fetch();
    }, []);

    const fetch = async () => {
        try {
            const properties = await getAllProperties();
            setPropertiesList(properties.data);
            window.scrollTo({top: 100, behavior: 'smooth'});
        } catch (error) {
            console.error(error);
        }
    };

    return(
        <div className="freeEvaluationMainContainer">
            <div className="freeEvaluationContainer">
                <div className="freeEvaluationContent">
                    <div className="freeEvaluationForm">

                    </div>

                </div>
            </div>
            <Map properties={propertiesList}/>
        </div>
    );
}

export default FreeEvaluation;