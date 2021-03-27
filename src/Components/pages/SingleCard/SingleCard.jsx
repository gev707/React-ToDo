import React from 'react';
import styles from './singlecard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import Modal from '../../Modal/Modal'
import Spinner from '../../Spinner/Spinner';


const API_HOST = 'http://localhost:3001';

class SingleCard extends React.Component {
    state = {
        singleCard: null,
        isEditModal: false,
        loading: false,
    }
    toggleEditModal = () => {
        const { isEditModal } = this.state;
        this.setState({
            isEditModal: !isEditModal
        })
    }
    handleEditCard = (editCard) => {
        this.setState({loading:true});
        fetch(`${API_HOST}/task/${editCard._id}`, {
            method: 'PUT',
            body: JSON.stringify(editCard),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) throw data.error;
                this.setState({
                    singleCard:data,
                    isEditModal:false,
                })
                
            })
            .catch(error => {
                console.log('Catch Error', error)
            })
            .finally(()=>{
                this.setState({loading:false})
            })
    }
    deleteSingleCard = () => {
        this.setState({loading:true});
        const { _id } = this.state.singleCard;
        fetch(`${API_HOST}/task/${_id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) throw data.error
                this.props.history.push('/');
            })
            .catch(error => {
                console.log('singleCardError', error);
                this.setState({loading:false});
            })
    }
    componentDidMount() {
        const id  = this.props.match.params.id;
        fetch(`${API_HOST}/task/${id}`,)
            .then(res => res.json())
            .then(data => {
                if (data.error) throw data.error
                this.setState({ singleCard: data })
            })
            .catch(error => {
                this.props.history.push({pathname:'/404',state:'isCardId'});
            })   
    }
    render() {
        const { singleCard, isEditModal, loading } = this.state;
        if (!singleCard) return loading && <Spinner />
        return (
            <>
                <div className={styles.singleCardHolder}>
                    <div className={styles.goBackPage}>
                        <Button
                            variant='dark'
                            style={{ color: '#ddd' }}
                            onClick={() => this.props.history.goBack()}
                        >Go Back
                    </Button>
                    </div>
                    <div className={styles.singleCardBody}>
                        <h1>- Title - <br />{singleCard.title}</h1>
                        <h2>- Description - <br />{singleCard.description}</h2>
                        <p><small>- Date - {singleCard.date.slice(0,10)}</small></p>
                        <small>- Created At - {singleCard.created_at.slice(0,10)}</small>
                        <div className={styles.singleCardBtns}>
                            <button
                                onClick={this.deleteSingleCard}>
                                <FontAwesomeIcon icon={faTrashAlt} />
                            </button>
                            <button
                                onClick={this.toggleEditModal}>
                                <FontAwesomeIcon icon={faAddressCard} />
                            </button>
                        </div>
                    </div>
                </div>
                {
                    isEditModal && <Modal
                        onHide={this.toggleEditModal}
                        onSubmit={this.handleEditCard}
                        editCard={singleCard}
                    />
                }
            </>
        )
    }
}

export default SingleCard