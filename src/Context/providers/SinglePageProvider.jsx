import { useState ,useCallback} from 'react';
import { contextForSingleCard } from '../context';

const API_HOST = 'http://localhost:3001';

const SinglePageProvider = props => {
    const [singleCard, setSingleCard] = useState(null)
    const [isEditModal , toggleEditModal] = useState(false)
    const [loading,setLoading] = useState(false);
    
    const getSingleCard = useCallback(() => {
        const { id } = props.match.params;
        setLoading(true);
        fetch(`${API_HOST}/task/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.error) throw data.error
                setSingleCard(data)
                setLoading(false)
            })
            .catch(error => {
                props.history.push({ pathname: '/404', state: 'isCardId' });
                console.log(error)
            })
    },[props.history,props.match.params]);

    const handleEditCard = (editCard) => {
        setLoading(true);
        fetch(`${API_HOST}/task/${editCard._id}`, {
            method: 'PUT',
            body: JSON.stringify(editCard),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) throw data.error
                toggleEditModal(false)
                setSingleCard(data)
            })
            .catch(error => {
                console.log('Catch Error', error)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const deleteSingleCard = useCallback(() => {
        setLoading(true);
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
            setLoading(false);
        })
    },[singleCard,props.history])
    return (
        <contextForSingleCard.Provider value={{
            //states
            singleCard,
            isEditModal,
            loading,

            // functions

            handleEditCard,
            deleteSingleCard,
            toggleEditModal,
            setSingleCard,
            setLoading,
            getSingleCard
        }}>
            {props.children}
        </contextForSingleCard.Provider>
    )
}
export default SinglePageProvider

