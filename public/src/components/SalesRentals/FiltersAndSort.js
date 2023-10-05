import { useEffect, useState } from 'react';
import { FILTERS, SORTING_OPTIONS } from '../../constants/constants';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import { Autocomplete, Menu, MenuItem, Select, Slider, TextField, Tooltip } from '@mui/material';
import './FiltersAndSort.css';
import Spinner from '../Spinner/Spinner';
import { categoriesInfo, conditionOptions } from '../Admin/adminConstantsAndHelperFunctions';

function FiltersAndSort({initialPropertyList, filteredPropertyList, setFilteredPropertyList}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedSortOption, setSelectedSortOption] = useState(window.sessionStorage.getItem('sortOption'));
    const [hideFilters, setHideFilters] = useState(true);
    const [openSpinner, setOpenSpinner] = useState(false);
    const [filters, setFilters] = useState(JSON.parse(window.sessionStorage.getItem('filters')));
    const open = Boolean(anchorEl);

    useEffect(() => {
        handleFilterButton();
        console.log(initialPropertyList);
    }, [initialPropertyList]);

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSort = (event, isInitial, filteredList) => {
        setOpenSpinner(true);
        setAnchorEl(null);
        let text = '';
        isInitial ? text = event : text = event.target.innerText;
        switch (text) {
            case SORTING_OPTIONS.PRICE_HIGH_TO_LOW:
                setSelectedSortOption(SORTING_OPTIONS.PRICE_HIGH_TO_LOW);
                setFilteredPropertyList([...filteredList].sort((a, b) => b.price.numberInBGN - a.price.numberInBGN));
                window.sessionStorage.setItem('sortOption', SORTING_OPTIONS.PRICE_HIGH_TO_LOW);
                break;
            case SORTING_OPTIONS.PRICE_LOW_TO_HIGH:
                setSelectedSortOption(SORTING_OPTIONS.PRICE_LOW_TO_HIGH);
                setFilteredPropertyList([...filteredList].sort((a, b) => a.price.numberInBGN - b.price.numberInBGN));
                window.sessionStorage.setItem('sortOption', SORTING_OPTIONS.PRICE_LOW_TO_HIGH);
                break;
            case SORTING_OPTIONS.SQUARE_METERS_HIGH_TO_LOW:
                setSelectedSortOption(SORTING_OPTIONS.SQUARE_METERS_HIGH_TO_LOW);
                setFilteredPropertyList([...filteredList].sort((a, b) => b.squareMeters - a.squareMeters));
                window.sessionStorage.setItem('sortOption', SORTING_OPTIONS.SQUARE_METERS_HIGH_TO_LOW);
                break;
            case SORTING_OPTIONS.SQUARE_METERS_LOW_TO_HIGH:
                setSelectedSortOption(SORTING_OPTIONS.SQUARE_METERS_LOW_TO_HIGH);
                setFilteredPropertyList([...filteredList].sort((a, b) => a.squareMeters - b.squareMeters));
                window.sessionStorage.setItem('sortOption', SORTING_OPTIONS.SQUARE_METERS_LOW_TO_HIGH);
                break;
            case SORTING_OPTIONS.REMOVE_SORTING:
                setSelectedSortOption(SORTING_OPTIONS.REMOVE_SORTING);
                setFilteredPropertyList([...initialPropertyList.filter(property => filteredList.some(filteredProperty => filteredProperty._id === property._id))]);
                window.sessionStorage.setItem('sortOption', SORTING_OPTIONS.REMOVE_SORTING);
                break;
            default:
                break;
        }
        setOpenSpinner(false);
        setHideFilters(true);
    };

    const handleFilterButton = () => {
        let filteredList = [...initialPropertyList];

        if (filters.price.from !== '' && filters.price.to !== '') {
            filteredList = filteredList.filter(property => {
                return property.price.numberInBGN >= filters.price.from && property.price.numberInBGN <= filters.price.to;
            });
        } else if (filters.price.from !== '') {
            filteredList = filteredList.filter(property => {
                return property.price.numberInBGN >= filters.price.from;
            });
        } else if (filters.price.to !== '') {
            filteredList = filteredList.filter(property => {
                return property.price.numberInBGN <= filters.price.to;
            });
        }

        if (filters.squareMeters.from !== '' && filters.squareMeters.to !== '') {
            filteredList = filteredList.filter(property => {
                return property.squareMeters >= filters.squareMeters.from && property.squareMeters <= filters.squareMeters.to;
            });
        } else if (filters.squareMeters.from !== '') {
            filteredList = filteredList.filter(property => {
                return property.squareMeters >= filters.squareMeters.from;
            });
        } else if (filters.squareMeters.to !== '') {
            filteredList = filteredList.filter(property => {
                return property.squareMeters <= filters.squareMeters.to;
            });
        }

        filteredList = filteredList.filter(property => {
            return property.rooms >= filters.rooms[0] && property.rooms <= filters.rooms[1];
        });
        filteredList = filteredList.filter(property => {
            return property.builtIn >= filters.builtIn[0] && property.builtIn <= filters.builtIn[1];
        });
        filteredList = filteredList.filter(property => {
            return property.condition === filters.condition || filters.condition === '' || filters.condition === null;
        });

        if (filters.categories.length > 0 && filters.categories.length !== categoriesInfo.length) {
            filteredList = filteredList.filter(property => {
                return filters.categories.some(category => property.categories.includes(category));
            });
        }
        setFilteredPropertyList([...filteredList]);
        handleSort(selectedSortOption, true, filteredList);
        window.sessionStorage.setItem('filters', JSON.stringify(filters));
    };

    const handleClearAll = () => {
        setFilters(FILTERS);
        setFilteredPropertyList([...initialPropertyList]);
        handleSort(selectedSortOption, true, [...initialPropertyList]);
        window.sessionStorage.setItem('filters', JSON.stringify(FILTERS));
    };

    return (
        <div className="filtersMainContainer">
            <div className="filtersContainer">
                <FilterAltIcon className="filterIcon" onClick={() => setHideFilters(!hideFilters)}/>
                <div className={`filtersContent ${hideFilters ? 'hideFilters' : ''}`}>
                    <div className="filterContent">
                        <Tooltip title="The price filter is in BGN"><h4 className="filterTitle colorText">Price:</h4></Tooltip>
                        <TextField 
                            value={filters.price.from}
                            onChange={(event) => setFilters({...filters, price: { ...filters.price, from: event.target.value === '' ? '' : Number(event.target.value) }})}
                            id="standard-basic-price-from"
                            type="number"
                            className="inputFieldFilters"
                            label="From"
                            variant="standard"
                        />
                        <TextField 
                            value={filters.price.to}
                            onChange={(event) => setFilters({...filters, price: { ...filters.price, to: event.target.value === '' ? '' : Number(event.target.value) }})}
                            id="standard-basic-price-to"
                            type="number"
                            className="inputFieldFilters"
                            label="To"
                            variant="standard"
                        />
                    </div>
                    <div className="filterContent">
                        <h4 className="filterTitle colorText">Square Meters:</h4>
                        <TextField
                            value={filters.squareMeters.from}
                            onChange={(event) => setFilters({...filters, squareMeters: { ...filters.squareMeters, from: event.target.value === '' ? '' : Number(event.target.value) }})}
                            id="standard-basic-sqareMeters-from"
                            type="number"
                            className="inputFieldFilters"
                            label="From"
                            variant="standard"
                        />
                        <TextField 
                            value={filters.squareMeters.to}
                            onChange={(event) => setFilters({...filters, squareMeters: { ...filters.squareMeters, to: event.target.value === '' ? '' : Number(event.target.value) }})}
                            id="standard-basic-sqareMeters-to"
                            type="number"
                            className="inputFieldFilters"
                            label="To"
                            variant="standard"
                        />
                    </div>
                    <div className="filterContent">
                        <h4 className="filterTitle colorText">Rooms:</h4>
                        <Slider 
                            value={filters.rooms}
                            onChange={(event, newValue) => setFilters({...filters, rooms: newValue})}
                            min={0}
                            max={20}
                            step={1}
                            valueLabelDisplay="auto"
                        />
                    </div>
                    <div className="filterContent">
                        <h4 className="filterTitle colorText">Build In:</h4>
                        <Slider 
                            value={filters.builtIn}
                            onChange={(event, newValue) => setFilters({...filters, builtIn: newValue})}
                            min={1700}
                            max={new Date().getFullYear()}
                            step={1}
                            valueLabelDisplay="auto"
                        />
                    </div>
                    <div className="filterContent">
                        <h4 className="filterTitle colorText">Categories:</h4>
                        <Select
                            labelId="demo-simple-select-filter-label"
                            id="demo-simple-select-filter"
                            variant="outlined"
                            multiple
                            displayEmpty
                            className="categoriesSelectFilter"
                            value={filters.categories}
                            onChange={(event) => {
                                const { value } = event.target;
                                setFilters({...filters, categories: typeof value === 'string' ? value.split(',') : value});
                            }}
                        >
                            {categoriesInfo && categoriesInfo.map((category) => (
                                <MenuItem
                                    key={`${category}-key`}
                                    value={category}
                                >
                                    {category}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                    <div className="filterContent">
                        <h4 className="filterTitle colorText">Condition:</h4>
                        <Autocomplete 
                            value={filters.condition}
                            onChange={(event, value) => setFilters({...filters, condition: value})}
                            options={conditionOptions}
                            getOptionLabel={(option) => option}
                            className="categoriesSelectFilter"
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </div>
                    <div className="filtersButtons">
                        <button onClick={handleFilterButton} className="filtersApplyButton">Apply Filters</button>
                        <button onClick={handleClearAll} className="filtersClearButton">Clear All</button>
                    </div>
                </div>
                <Spinner open={openSpinner}/>
            </div>
            <div className="sortContainer">
                <ImportExportIcon className="sortIcon" onClick={handleOpen}/>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem className={SORTING_OPTIONS.PRICE_HIGH_TO_LOW === selectedSortOption ? 'selectedMenuItem' : ''} onClick={(event) => handleSort(event, false, filteredPropertyList)}>{SORTING_OPTIONS.PRICE_HIGH_TO_LOW}</MenuItem>
                    <MenuItem className={SORTING_OPTIONS.PRICE_LOW_TO_HIGH === selectedSortOption ? 'selectedMenuItem' : ''} onClick={(event) => handleSort(event, false, filteredPropertyList)}>{SORTING_OPTIONS.PRICE_LOW_TO_HIGH}</MenuItem>
                    <MenuItem className={SORTING_OPTIONS.SQUARE_METERS_HIGH_TO_LOW === selectedSortOption ? 'selectedMenuItem' : ''} onClick={(event) => handleSort(event, false, filteredPropertyList)}>{SORTING_OPTIONS.SQUARE_METERS_HIGH_TO_LOW}</MenuItem>
                    <MenuItem className={SORTING_OPTIONS.SQUARE_METERS_LOW_TO_HIGH === selectedSortOption ? 'selectedMenuItem' : ''} onClick={(event) => handleSort(event, false, filteredPropertyList)}>{SORTING_OPTIONS.SQUARE_METERS_LOW_TO_HIGH}</MenuItem>
                    <MenuItem className={SORTING_OPTIONS.REMOVE_SORTING === selectedSortOption ? 'selectedMenuItem' : ''} onClick={(event) => handleSort(event, false, filteredPropertyList)}>{SORTING_OPTIONS.REMOVE_SORTING}</MenuItem>
                </Menu>
            </div>
        </div>
    );
}

export default FiltersAndSort;