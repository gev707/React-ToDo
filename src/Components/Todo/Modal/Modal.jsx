import PropTypes from 'prop-types';
import React from "react";
import styles from "./modal.module.css";
const Modal =({
    isOpen,
    editTask
    })=>{
    
    return (
        <div >
            <div className={!isOpen ? styles.modalClose:styles.modalHolder}>
                <div 
                className={styles.closeModal}
                onClick={()=>editTask()}
                >
                    <span></span>
                </div>
                <h2>Create Your Card</h2>
                <button>Edit Card</button>
            </div>
        </div>

    )
}
Modal.propTypes = {
    isOpen:PropTypes.bool.isRequired,
    editTask:PropTypes.func
}
export default Modal