import React, { useState } from 'react';
import { navigate } from 'gatsby';

const Form = () => {

    const [value, setValue] = useState('');

    const handleSearchInput = (event) => setValue(event.target.value);
    const handleForm = (event) => {
        event.preventDefault();
        const query = value
            .toLowerCase()
            .trim()
            .replace(/[^\w ]/g, '')
            .replace(/\s+/g, '-');

        navigate(`/search/${query}`, { state: { query } })


    }

    return (
        <form onSubmit={handleForm}>
            <label>
                Search by Name:
                <input name="search" value={value} onChange={handleSearchInput} />
                <button type="submit">Search</button>
            </label>
        </form>
    )
}

export default Form;