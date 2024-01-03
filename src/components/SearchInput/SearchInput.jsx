'use client'
import React, { useState } from 'react';
import styles from './search.module.css';

const SearchInput = ({ onSearchChange }) => {
    const [searchblog, setSearchblog] = useState('');

    const handleSearchChange = (e) => {
        const searchQuery = e.target.value;
        setSearchblog(searchQuery);
        onSearchChange(searchQuery); // Notify parent component about the search change
    };

    return (
        <div>
            <input
                type='text'
                className={styles.input}
                placeholder='Search Blog...'
                value={searchblog}
                onChange={handleSearchChange}
            />
        </div>
    );
}

export default SearchInput;
