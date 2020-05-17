import React from 'react';
import s from "../App.module.css";

export const Pagination = ({page, pageCount, totalCount, getPage,}) => {

    let pages = [];

    const lastPage = Math.ceil(totalCount / pageCount);

    for (let i = 1; i <= lastPage; i++) pages.push((
        <button
            key={i}
            style={{background: page === i ? '#1C6EA4' : ''}}
            onClick={() => getPage(i, pageCount)}
        >
            {i}
        </button>
    ));

    if ((page + 4) < lastPage) {
        pages[page + 2] = (
            <span key={page + 3}>
                - ... -
            </span>
        );
        pages = pages.filter((p, i) => i < (page + 3) || i === (lastPage - 1));
    }

    if (page > 5) {
        pages[1] = (
            <span key={2}>
                - ... -
            </span>
        );
        pages = pages.filter((p, i) => i < 2 || i > page - 4);
    }

    return (
        <div className={s.paginator}>
            <div>
                <select value={pageCount}
                        onChange={e => getPage(page = 1, Number(e.currentTarget.value))}>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={25}>25</option>
                    <option value={30}>30</option>
                    <option value={40}>40</option>
                </select>
            </div>
            <div>
                {pages}
            </div>
        </div>
    );
};


