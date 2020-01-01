import React from 'react';
import Form from '../components/form';
import Result from '../components/result';

const Search = ({ location }) => {
    const query = location.state && location.state.query ||
        location.pathname.replace(/^\/search\/?/, '') ||
        '';
    const name = query.replace(/-+/g, ' ');

    return (<>
        <h1>{name ? `Showing results for ${name}` : `Search Rick & Morty Character`}</h1>
        <p>
            Find some cool Rick and Morty characters.
        </p>
        <Form />
        {name && <Result name={name} />}
    </>)
}


export default Search;
