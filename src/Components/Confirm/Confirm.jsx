import React from 'react';
import PropTypes from 'prop-types';
import styles from './confirm.module.css'
const Confirm = ({onHide,deleteCard,countOrCardTitle})=>{
    const deleteCurrentCard = () => {
            deleteCard();
    }
    return (
        <div onHide={onHide} className={styles.confirm}>
            <h2>{countOrCardTitle !== 0 ? 'Are you sure!':'Please check some card!'}</h2>
            <small>{countOrCardTitle !== 0 ? 
                `Do you want delete ( ${countOrCardTitle} ) from Cards?`:
                'There are no card to delete'}
            </small>
            <hr />
            <div className='p-3'>
            <button onClick={onHide} className={styles.closeConfirm}>Cancel</button>
            <button 
                onClick={deleteCurrentCard} 
                className={styles.btnDelete}
                disabled={countOrCardTitle===0}
            >Delete Card
            </button> 
            </div>
        </div>
    )
}
Confirm.propTypes = {
    onHide:PropTypes.func.isRequired,
    deleteCard:PropTypes.func.isRequired,
    countOrCardTitle:PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ])
}
export default Confirm