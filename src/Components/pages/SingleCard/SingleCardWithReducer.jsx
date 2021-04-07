import { useEffect, useReducer, useCallback } from 'react';
import { Button } from 'react-bootstrap'
import styles from './singlecard.module.css'
import Modal from '../../Modal/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faAddressCard } from '@fortawesome/free-solid-svg-icons';

const API_HOST = 'http://localhost:3001';

const initialState = {
    singleCard: {},
    loading: false,
    isEditModal: false
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case 'GET_CARD': {
            return {
                ...state,
                singleCard: action.success
            }
        }
        case 'SET_LOADING': {
            return {
                ...state,
                loading: true
            }
        }
        case 'REMOVE_LOADING': {
            return {
                ...state,
                loading: false
            }
        }
        case 'OPEN_EDIT_MODAL': {
            return {
                ...state,
                isEditModal: !state.isEditModal
            }
        }
        default: return state
    }
}
const SingleCardWithReducer = (props) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {

        const { id } = props.match.params;
        dispatch({ type: 'SET_LOADING' });
        fetch(`${API_HOST}/task/${id}`)
            .then(res => res.json())
            .then(response => {
                if (response.error) throw response.error
                dispatch({ type: 'GET_CARD', success: response })
            })
            .catch(error => {
                props.history.push({ pathname: '/404', state: 'isCardId' });
                dispatch({ type: 'REMOVE_LOADING' })
            })

    }, [props.history,props.match.params]);

    const deleteSingleCard = () => {

        dispatch({ type: 'SET_LOADING' })
        const { _id } = singleCard;
        fetch(`${API_HOST}/task/${_id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) throw data.error
                props.history.push('/');
            })
            .catch(error => {
                console.log('singleCardError', error);
                dispatch({ type: 'REMOVE_LOADING' })
            })

    }
    
    const handleEditCard = useCallback((editCard) => {

        dispatch({ type: 'SET_LOADING' })
        fetch(`${API_HOST}/task/${editCard._id}`, {
            method: 'PUT',
            body: JSON.stringify(editCard),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(response => {
                if (response.error) throw response.error
                dispatch({ type: 'OPEN_EDIT_MODAL' })
                dispatch({ type: 'GET_CARD', success: response })
            })
            .catch(error => {
                console.log('Catch Error', error)
            })
            .finally(() => {
                dispatch({ type: 'REMOVE_LOADING' })
            })
        
    },[]);
    
    const { singleCard, isEditModal } = state;

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
                <div className={styles.singleCardReducerBody}>
                    <h1>- Title - <br />{singleCard.title}</h1>
                    <h2>- Description - <br />{singleCard.description}</h2>
                    <p><small>- Date - {singleCard.date}</small></p>
                    <small>- Created At - {singleCard.created_at}</small>
                    <div className={styles.singleCardBtns}>
                        <button
                            onClick={deleteSingleCard}>
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                        <button
                            onClick={() => dispatch({ type: 'OPEN_EDIT_MODAL' })}>
                            <FontAwesomeIcon icon={faAddressCard} />
                        </button>

                    </div>
                </div>
            </div>
            {
                isEditModal && <Modal

                    onHide={() => dispatch({ type: 'OPEN_EDIT_MODAL' })}
                    onSubmit={handleEditCard}
                    editCard={singleCard}

                />
            }
        </>
    )
}
export default SingleCardWithReducer