import {BsFilterRight} from 'react-icons/bs'

import './index.css'

const FoodItemHeader = props => {
  const {sortbyOptions, activeOptionId} = props
  const onChangeSortby = event => {
    const {changeSortby} = props
    changeSortby(event.target.value)
  }
  return (
    <div className="FoodItemHeader">
      <div className="FoodItemHeaderSubContainer">
        <div>
          <h1 className="products-list-heading">Popular Restaurants</h1>
          <p className="description">
            Select your favourite restaurants special dish and make your day
            happy...{' '}
          </p>
        </div>
        <div className="sort-by-container">
          <BsFilterRight className="sort-by-icon" />
          <p className="sort-by mt-3">Sort by</p>
          <select
            className="sort-by-select"
            value={activeOptionId}
            onChange={onChangeSortby}
          >
            {sortbyOptions.map(eachOption => (
              <option
                key={eachOption.optionId}
                value={eachOption.optionId}
                className="select-option"
              >
                {eachOption.displayText}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
export default FoodItemHeader
