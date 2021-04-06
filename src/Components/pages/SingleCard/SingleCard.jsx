import { useContext, useEffect } from 'react';
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
        isEditModal,
        loading,
        //
        handleEditCard,
        deleteSingleCard,
        toggleEditModal,
        //setSingleCard,
        //setLoading,
        getSingleCard

    } = contextCard;
    useEffect(() => {
        getSingleCard();
    }, [getSingleCard])
    return (

        <>
            {

                !singleCard ? (loading && <Spinner />) :
                    (
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
                                    <h1>- Title - <br />{singleCard.title}</h1>
                                    <h2>- Description - <br />{singleCard.description}</h2>
                                    <p><small>- Date - {singleCard.date.slice(0, 10)}</small></p>
                                    <small>- Created At - {singleCard.created_at.slice(0, 10)}</small>
                                    <div className={styles.singleCardBtns}>
                                        <button
                                            onClick={deleteSingleCard}>
                                            <FontAwesomeIcon icon={faTrashAlt} />
                                        </button>
                                        <button
                                            onClick={()=>toggleEditModal(true)}>
                                            <FontAwesomeIcon icon={faAddressCard} />
                                        </button>

                                    </div>
                                </div>
                            </div>
                            {
                                isEditModal && <Modal
                                    onHide={()=>toggleEditModal(false)}
                                    onSubmit={handleEditCard}
                                    editCard={singleCard}
                                />
                            }
                        </>

                    )


            }

        </>



    )

}

export default SingleCard
