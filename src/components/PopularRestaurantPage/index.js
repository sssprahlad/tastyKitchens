import {Link} from 'react-router-dom'
import {VscArrowSmallRight} from 'react-icons/vsc'
import {BsFilterLeft} from 'react-icons/bs'

import './index.css'

const PopularRestaurantsPage = props => {
  const {
    updateSortItems,
    sortByOptions,
    sortedValue,
    updateSearchResult,
  } = props

  const SortItemsFunction = event => {
    updateSortItems(event.target.value)
  }

  const showSearch = event => {
    updateSearchResult(event.target.value)
  }

  return (
    <>
      <div className="popular-bar-container">
        <div className="popular-container">
          <h1 className="popular-text">Popular Restaurants</h1>
          <p className="popular-name">
            Select Your favourite restaurant special dish and make your day
            happy...
          </p>
        </div>
        <input
          type="search"
          className="search-bar"
          placeholder="Search"
          onChange={showSearch}
        />
        <div className="icon-bar-container">
          <BsFilterLeft />
          <div className="dropDown-container">
            <p className="sort">Sort By</p>
            <select
              className="drop-down"
              onChange={SortItemsFunction}
              value={sortedValue}
            >
              {sortByOptions.map(eachItem => (
                <option
                  value={eachItem.value}
                  key={eachItem.id}
                  className="option"
                >
                  {eachItem.displayText}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="add-link-to-navigate-open-restaurant">
        <div className="get-row">
          <h1 className="open-restaurant">
            <Link to="/open-restaurant" className="open-restaurant-for-link">
              See Open Restaurants
            </Link>
          </h1>
          <VscArrowSmallRight className="right-arrow" />
        </div>
      </div>
    </>
  )
}

export default PopularRestaurantsPage
