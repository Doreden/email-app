import { useEffect } from "react";
import { useState } from "react";
import searchBtn from "../../../src/assets/svg/search.png"

export function EmailFilter({ onSetFilter }) {
    const [filter, setFilter] = useState("Search");

    useEffect(() => {
        onSetFilter(filter)
    }, [filter])


    return (
        <div className="filter-container">
            <div className="search-box">
                
                <button>
                    <img src={searchBtn} className="search-image" />
                </button>
                
                <input
                    type="text"
                    name="type"
                    id="type"
                    placeholder={filter.body || "Search mail"}
                    onChange={(email) => setFilter({ body: email.target.value })}
                />
            </div>
        </div>
    )
}



