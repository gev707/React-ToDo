import React from 'react';
import styles from './singlecard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faAddressCard } from '@fortawesome/free-solid-svg-icons';
import {Spinner,Button} from 'react-bootstrap';
import Modal from '../../Modal/Modal'


const API_HOST = 'http://localhost:3001';

class SingleCard extends React.Component {
    state = {
        singleCard:null,
        isEditModal:false,
        isCardId : false
    }
    toggleEditModal = () => {
        const {isEditModal} = this.state.isEditModal
        this.setState({
            isEditModal:!isEditModal
        })
    }
    handleEditCard = (editCard) => {
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
                this.props.history.push('/')
            })
            .catch(error => {
                console.log('Catch Error', error)
            })
    }
    deleteSingleCard = () => {
        const { _id } = this.state.singleCard;
        fetch(`${API_HOST}/task/${_id}`,{
            method:'DELETE'
        })
        .then(res=>res.json())
        .then(data=>{
            if (data.error) throw data.error
            this.props.history.push('/')
        })
        .catch(error=>{
            console.log('singleCardError',error)
        })
    }
    componentDidMount() {
        const {id} = this.props.match.params;
        fetch(`${API_HOST}/task/${id}`,)
            .then(res => res.json())
            .then(data => {
                if (data.error) throw data.error
                this.setState({
                    singleCard: data
                })
            })
            .catch(error => {
                this.props.history.push('/notcard')
            })
    }
    render() {
       const {singleCard,isEditModal} = this.state;
       if(!singleCard) {
           return (
               <div className={styles.spinner}>
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
               </div>
           );
       }
        return (
        <>
            <div className={styles.singleCardHolder}>
                <div className={styles.goBackPage}>
                    <Button 
                        variant='dark' 
                        style={{color:'#ddd'}}
                        onClick = {()=>this.props.history.goBack()}
                        >Go Back
                    </Button>
                </div>
                <div className={styles.singleCardBody}>
                   <h1>~ Title ~ <br />{singleCard.title}</h1>
                   <hr/>
                   <h2>~ Description ~ <br />{singleCard.description}</h2>
                   <div className={styles.singleCardBtns}>
                        <button 
                            onClick = {this.deleteSingleCard}>
                            <FontAwesomeIcon
                                icon={faTrashAlt}
                                
                            />
                        </button>
                        <button 
                            onClick = {this.toggleEditModal}>
                            <FontAwesomeIcon
                                icon={faAddressCard}
                            />
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