
import styles from './modal.module.css'
const ErrorModal = ({errorMessage,errorStatus,onHide})=>{
   
    return (
        <div className={styles.errorModal}>
            <h2>{`Status ${errorStatus}`}</h2>
            <small>
                {`Contact ${errorMessage}`}
            </small>
            <hr />
            <div className='p-3'>
            <button className={styles.closeConfirm} onClick={onHide}>Cancel</button>
            
            </div>
        </div>
    )
}

export default ErrorModal