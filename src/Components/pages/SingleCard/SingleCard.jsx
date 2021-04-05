import { useContext } from 'react';
import styles from './singlecard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import Modal from '../../Modal/Modal'
import Spinner from '../../Spinner/Spinner';
import { contextForSingleCard } from '../../../Context/context';

const SingleCard = (props) => {
    const contextCard = useContext(contextForSingleCard)
    const {
        singleCard,
        editModal,
        spinner,
        //
        handleEditCard,
        deleteSingleCard,
        toggleEditModal

    } = contextCard;
    return (
        
        
            <contextForSingleCard.Consumer>
                 {
                     (contextCard)=> {
                        if (!singleCard.singleCard) return spinner.loading && <Spinner />
                        return (
                            <>
                                <div className={styles.singleCardHolder}>
                                    <div className={styles.goBackPage}>
                                        <Button
                                            variant='dark'
                                            style={{ color: '#ddd' }}
                                            onClick={() => props.history.goBack()}
                                            >Go Back
                                        </Button>
                                    </div>
                                    <div className={styles.singleCardBody}>
                                        <h1>- Title - <br />{singleCard.singleCard.title}</h1>
                                        <h2>- Description - <br />{singleCard.singleCard.description}</h2>
                                        <p><small>- Date - {singleCard.singleCard.date}</small></p>
                                        <small>- Created At - {singleCard.singleCard.created_at}</small>
                                        <div className={styles.singleCardBtns}>
                                            <button
                                                onClick={deleteSingleCard}>
                                                <FontAwesomeIcon icon={faTrashAlt} />
                                            </button>
                                            <button
                                                onClick={toggleEditModal}>
                                                <FontAwesomeIcon icon={faAddressCard} />
                                            </button>

                                        </div>
                                    </div>
                                </div>
                                {
                                    editModal.isEditModal && <Modal
                                        onHide={toggleEditModal}
                                        onSubmit={handleEditCard}
                                        editCard={singleCard.singleCard}
                                    />
                                }
                            </>
                        
                        )
                            
                    }
                }
            
            </contextForSingleCard.Consumer>
               
      
    )

}

export default SingleCard
