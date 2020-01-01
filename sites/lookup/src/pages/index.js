import React from 'react';
import { Link } from 'gatsby';

const Index = () => (
    <>
        <h1>Search Rick & Morty Character</h1>
        <p>
            Look up your favourite chanracters from <em>Rick & Morty</em> using
            <a href="https://rickandmortyapi.com">Rick and Morty API</a>
        </p>
        <Link to="/search">Search</Link>
    </>
);

export default Index;
