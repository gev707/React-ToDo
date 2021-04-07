import React from 'react'
import { Link } from 'react-router-dom'
import styles from './contact.module.css'
const linkTitle = [
    {
        linkName: 'Contact Form With Local State ',
        to: '/contactformclass',
        name: '/ContactWithClass',
    },
    {
        linkName: 'Contact Form With Use State',
        to: '/contactformhook',
        name: '/ContactWithHook'
    },
    {
        linkName: 'Contact Form With Use Context',
        to: '/contactpage',
        name: '/ContactPage'
    },
    {
        linkName: 'Contact Form With Use Reducer',
        to: '/contact-reducer',
        name: '/ContactWithReducer'
    }
]
const Contact = () => {
    const links = linkTitle.map((link, index) => {
        return (
            <h2 className={styles.linkTitles} key={index}>
                <Link
                    to={link.to}
                    name={link.name}
                    className={styles.linkA}
                >{link.linkName}
                </Link>
            </h2>
        )
    })
    return (
        <>
            <h1 className={styles.title}>Contact Section</h1>
            <div className={styles.contactMainPage}>
                {links}
            </div>
        </>

    )
}
export default Contact