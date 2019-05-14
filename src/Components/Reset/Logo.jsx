import React from 'react';
// import './logo.css';
import Reset from './reset.png';

class Logo extends React.Component {
    render() {
        return (
            <div className='logo'>
                <img alt='logo' width="25px" height="20px" src={Reset}></img>
            </div>
        )
    }
}

export default Logo;