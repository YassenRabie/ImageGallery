import React from 'react'

const CategorieFilter = ({ value, handleCategorieChange, handleTyping }) => {
    return (

        <form onSubmit={handleCategorieChange} className="filter-container">
            <input
                type="text"
                value={value}
                onChange={handleTyping}
            />
            <input type="submit" value="Search" />
        </form>
    )
}

export default CategorieFilter
