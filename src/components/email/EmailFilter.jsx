import { useEffect } from "react";
import { useState } from "react";

export function EmailFilter({ onSetFilter }) {
    const [filter, setFilter] = useState("Search");

    useEffect(() => {
        onSetFilter(filter)
    }, [filter])


    return (
        <div className="search-outer-box">
            <div className="search-box">
                <span className="img-span-container">
                    <img src="../../src/assets/svg/search.png" className="search-image" />
                </span>
                <input className="search-box"
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



