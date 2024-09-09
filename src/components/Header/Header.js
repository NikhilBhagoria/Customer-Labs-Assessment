import React from 'react'
import'./Header.style.css';
const Header = ({title,handleBackSegmentClick}) => {
    return (
        <>
            <header className="App-header">
                <div className="header-title">
                    <svg onClick={handleBackSegmentClick} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="arrow-back-ios">
                        <path fill="none" d="M0 0h24v24H0V0z" opacity=".87"></path>
                        <path d="M17.51 3.87L15.73 2.1 5.84 12l9.9 9.9 1.77-1.77L9.38 12l8.13-8.13z"></path>
                    </svg>
                    <p className="view-audience">{title}  </p>
                </div>
            </header>
        </>
    )
}

export default Header