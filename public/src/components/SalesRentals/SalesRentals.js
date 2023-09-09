import { useEffect, useState } from 'react';
import { getAllPropertiesByType } from '../../service/propertyService';
import ReactPaginate from 'react-paginate';
import './SalesRentals.css';
import WideCard from '../Card/WideCard';
import FiltersAndSort from './FiltersAndSort';
import Spinner from '../Spinner/Spinner';
import Carousel from 'react-material-ui-carousel';
import { Link } from 'react-router-dom';

function SalesRentals({type}) {
    const [initialPropertyList, setInitialPropertyList] = useState([]);
    const [filteredPropertyList, setFilteredPropertyList] = useState([]);
    const [_filteredPropertyList, _setFilteredPropertyList] = useState([]);
    const [favourites, setFavourites] = useState(JSON.parse(window.localStorage.getItem('favourites')) || {});
    const [openSpinner, setOpenSpinner] = useState(false);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 6;

    useEffect(() => {
        fetch();
    }, [type]);

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        let items = [...filteredPropertyList];
        _setFilteredPropertyList(items.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(items.length / itemsPerPage));
        window.scrollTo({top: 200, behavior: 'smooth'});
      }, [itemOffset, itemsPerPage, filteredPropertyList]);

    const fetch = async () => {
        setOpenSpinner(true);
        try {
            const properties = await getAllPropertiesByType(type);
            setInitialPropertyList(properties.data);
            setFilteredPropertyList(properties.data);
            setOpenSpinner(false);
        } catch (error) {
            console.error(error);
            setOpenSpinner(false);
        }
    };

    const handlePageClick = (event) => {
        const newOffset = event.selected * itemsPerPage % filteredPropertyList.length;
        setItemOffset(newOffset);
    }

    return (
        <div className="salesMainContainer">
            <div className="landscapeImageContainer">
                <img src="images/urbanDarken.png" alt="" className="landscapeImage" />
                <div className="favouritesFlexContainer">
                    <h2 className="favouritesLandscapeTitle">Find Your Dream Property</h2>
                </div>
            </div>
            <FiltersAndSort
                initialPropertyList={initialPropertyList}
                filteredPropertyList={filteredPropertyList}
                setFilteredPropertyList={setFilteredPropertyList}
            />
            <Spinner open={openSpinner}/>
            <div className="exploreCardsSales">
                {_filteredPropertyList.map(property =>
                    <WideCard key={property._id} propertyInfo={property} favourites={favourites} setFavourites={setFavourites}/>
                )}
                {_filteredPropertyList.length 
                    ?   <ReactPaginate
                            nextLabel={'>'}
                            previousLabel={'<'}
                            breakLabel={'...'}
                            pageCount={pageCount}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={2}
                            onPageChange={handlePageClick}
                            containerClassName='paginationContainer'
                            breakClassName='pageItem'
                        />
                    :   <h3 className="noResults colorText">Sorry no results found, please try again with different filters.</h3>
                }
            </div>
            <div className="moreOffers">
                <h2 className="moreOffersTitle colorText">More Offers</h2>
                <Carousel className="carouselBoxSales" interval={3000}>
                    {initialPropertyList.map(property =>
                        <>
                            <img src={`http://localhost:5000/${property.images[0].destination}${property.images[0].filename}`} alt="" className="propertyImageSales" />
                                <Link to={`/properties/details/${property._id}`} className="linkToInCarousel">
                                    <div className="carouselImageInfoBox">
                                            <h2 className="carouselImageTitle">{property.title}</h2>
                                            <h2 className="carouselPrice">{`${property.price.number} ${property.price.currency ? 'EUR' : 'BGN'}`}</h2>
                                    </div>
                                </Link>
                        </>    
                    )}
                </Carousel>
            </div>
        </div>
    );
}

export default SalesRentals;