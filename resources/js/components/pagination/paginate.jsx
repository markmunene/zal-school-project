import { list } from 'postcss';
import React from 'react'
import { Link } from 'react-router-dom';

export default function paginate({ postPerPage, totalPost, Page }) {
    let pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
        pageNumbers.push(i);
    }
   
    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map((number) => {
                    return (
                        <>
                            <li className="page-item" key={number}>
                                <div style={{cursor:'pointer'}}
                                    onClick={() => Page(number)}
                                    
                                    className="page-link"
                                >
                                    {number}
                                </div>
                            </li>
                        </>
                    );
                })}
            </ul>
        </nav>
    );
}
