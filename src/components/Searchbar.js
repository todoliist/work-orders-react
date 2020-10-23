import React from 'react'
const Searchbar = props => {
    return (
        <input
            placeholder="Filter by worker name..."
            value={props.searchVal}
            onChange={(e)=>props.handleChange(e)}
            className="bar"
            />
    )
}

export default Searchbar