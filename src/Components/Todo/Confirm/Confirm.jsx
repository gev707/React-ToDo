import React from 'react';
import styles from './confirm.module.css'
const Confirm = (props)=>{
    const {onHide,deleteCard} = props
    const deleteAllCards = ()=>{
        deleteCard();
        onHide();
    }
    return (
        <div onHide={onHide} className={styles.confirm}>
            <h2>Do you want delete card</h2>
            <hr />
            <div className='p-3'>
            <button onClick={onHide} className={styles.closeConfirm}>Cancel</button>
            <button onClick={deleteAllCards} className={styles.btnDelete}>Delete Card</button> 
            </div>
        </div>
    )
}
export default Confirm