import { useEffect, useState } from 'react';
import { getAllPropertiesByType } from '../../service/propertyService';
import ReactPaginate from 'react-paginate';
import './SalesRentals.css';
import WideCard from '../Card/WideCard';
import FiltersAndSort from './FiltersAndSort';
import Spinner from '../Spinner/Spinner';
import Carousel from 'react-material-ui-carousel';
import { Link } from 'react-router-dom';
import { observer } from '../../constants/helperFunctions';
import { Helmet } from 'react-helmet-async';

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
        const cardsForIntersection = document.querySelectorAll('.exploreWideCard');
        cardsForIntersection.forEach(card => {
            observer.observe(card);
        });
    }, [_filteredPropertyList]);

    useEffect(() => {
        fetch();
    }, [type]);

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        let items = [...filteredPropertyList];
        _setFilteredPropertyList(items.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(items.length / itemsPerPage));
        window.scrollTo({top: 200, behavior: 'auto'});
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
        const value = event ? event.selected : event;
        const newOffset = value * itemsPerPage % filteredPropertyList.length;
        setItemOffset(newOffset);
    }

    return (
        <div className="salesMainContainer">
            <Helmet>
                <title>Намери Идеалния за Теб Имот</title>
                <meta name="description" content="Избери Бързо и Лесно Имот от Богата Гама на Достъпни Цени Като се Възползваш от Нашите Разнообразни Филтри и Сортиране" />
            </Helmet>
            <div className="landscapeImageContainer">
                <img src="images/urbanDarken.png" alt="Продажби/Наеми Лого" className="landscapeImage" />
                <div className="favouritesFlexContainer">
                    <h2 className="favouritesLandscapeTitle">Намери мечтания си дом</h2>
                </div>
            </div>
            <FiltersAndSort
                initialPropertyList={initialPropertyList}
                filteredPropertyList={filteredPropertyList}
                setFilteredPropertyList={setFilteredPropertyList}
                toFirstPage={handlePageClick}
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
                    :   <h3 className="noResults colorText">Съжалявам но не открихме имоти, моля опитайте с други филтри.</h3>
                }
            </div>
            <div className="moreOffers">
                <h2 className="moreOffersTitle colorText">More Offers</h2>
                <Carousel className="carouselBoxSales" interval={3000}>
                    {initialPropertyList.map(property =>
                        <>
                            <img src={`https://realestatebulgariaserver.onrender.com/${property.images[0].destination}${property.images[0].filename}`} alt="Снимка на имота" className="propertyImageSales" />
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