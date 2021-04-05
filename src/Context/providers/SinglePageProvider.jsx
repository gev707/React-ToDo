import { useState, useEffect } from 'react';
import { contextForSingleCard } from '../context';

const API_HOST = 'http://localhost:3001';

const SinglePageProvider = props => {
    
    const { children, history, match } = props
    const [singleCard, setSingleCard] = useState({
        singleCard: null
    })
    const [spinner, setSpinner] = useState({
        loading: false
    });
    const [editModal, setEditModal] = useState({
        isEditModal: false
    });
    useEffect(() => {
        const id = match.params.id;
        fetch(`${API_HOST}/task/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.error) throw data.error
                setSingleCard({
                    singleCard:data
                })
            })
            .catch(error => {
                history.push({ pathname: '/404', state: 'isCardId' });
                console.log(error)
            })
    }, []);
    const toggleEditModal = () => {
        setEditModal({
            isEditModal: !editModal.isEditModal
        })
    }
    const handleEditCard = (editCard) => {
        setSpinner({ loading: true });
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

                setSingleCard({
                    singleCard: data
                })

            })
            .catch(error => {
                console.log('Catch Error', error)
            })
            .finally(() => {
                setEditModal({
                    loading: false
                })
            })
    }



    const deleteSingleCard = () => {
        setSpinner({ loading: true });
        const { _id } = this.state.singleCard;
        fetch(`${API_HOST}/task/${_id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) throw data.error
                history.push('/');
            })
            .catch(error => {
                console.log('singleCardError', error);
                setSpinner({ loading: false });
            })
    }
    return (
        <contextForSingleCard.Provider value={{
            singleCard,
            setSingleCard,
            editModal,
            setEditModal,
            spinner,
            setSpinner,
            //
            handleEditCard,
            deleteSingleCard,
            toggleEditModal
        }}>
            {children}
        </contextForSingleCard.Provider>
    )
}
export default SinglePageProvider

