import React from 'react';
import {Link} from 'react-router-dom';
import styles from './contact.module.css'
const Contact =()=>{
    return (
        <>
        <h1 className={styles.title}>Contact Section</h1>
        <div className={styles.contactMainPage}>
            <h2>
                <Link 
                    to='/contactformclass'
                    name='/ContactWithClass'
                    style={{color:'#ddd'}}
                    >Contact Form With Class 
                </Link>
            </h2>
            <h2>
                <Link 
                    to='/contactformhook'
                    name='/ContactWithClass'
                    style={{color:'#ddd'}}
                    >Contact Form With Hook
                </Link>
            </h2>
        </div>
    </>
    )
}
export default Contact