import React, { useState, useRef } from "react";
import { router } from "@inertiajs/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import axios from "axios";

const SearchBar = ({ placeholder = "Cari Produk..." }) => {
    const [search, setSearch] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const debounceRef = useRef(null);
    const storedPreferences = JSON.parse(localStorage.getItem("preferences"));

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearch(value);

        if (debounceRef.current) clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(() => {
            handleSearchRequest(value);
        }, 400);
    };

    const handleSearchRequest = async (query) => {
        if (!query) {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }
        try {
            const response = await axios.get('/api/get-suggestion', {
                params: {
                    search: query,
                    categories: storedPreferences.categories,
                    ingredients: storedPreferences.ingredients,
                },
            });
            setSuggestions(response.data || []);
            setShowSuggestions(true);
        } catch (error) {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    const handleSearchSubmit = (value = search) => {
        router.get('/api/search', { search: value });
    };


    const handleSuggestionClick = (item) => {
        const value = item.name || item.title || "";
        setSearch(value);
        setShowSuggestions(false);
        router.get(`/product/${item.id}`);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            setShowSuggestions(false);
            handleSearchSubmit();
        }
    };


    return (
        <div className="relative w-full">
            <input
                aria-label="Cari Produk"
                className="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder={placeholder}
                type="text"
                value={search}
                onChange={handleSearchChange}
                onFocus={() => search && suggestions.length > 0 && setShowSuggestions(true)}
                onKeyDown={handleKeyDown}
                autoComplete="off"
            />
            <button
                aria-label="Search button"
                className="absolute top-1 right-1 flex items-center rounded py-1 px-2.5 border border-transparent text-center text-sm text-white"
                type="button"
                onClick={() => handleSearchSubmit()}

            >
                <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
            </button>
            {showSuggestions && suggestions.length > 0 && (
                <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-30 max-h-60 overflow-y-auto">
                    <ul>
                        {suggestions.map((item) => (
                            <li
                                key={item.id}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                                onClick={() => handleSuggestionClick(item)}
                            >
                                {item.name || item.title}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SearchBar;