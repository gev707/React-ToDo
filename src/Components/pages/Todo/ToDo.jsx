import React from "react";
import Task from '../../Tasks/Task';
import Modal from '../../Modal/Modal'
import Confirm from '../../Confirm/Confirm';
import styles from "./todo.module.css";
import Spinner from "../../Spinner/Spinner";


const API_HOST = 'http://localhost:3001';

class Todo extends React.Component {
    state = {
        cards: [],
        checkedCards: new Set(),
        isOpenModal: false,
        isOpenConfirm: false,
        editCard: null,
        loading: false,
       
    };

    /** 
     * toggle functions 
     * 1-toggleSetCardModal 
     * 2-toggleOpenModal
     * 3-toggleOpenConfirm
     * 4-toggleCheckedAllCards
     * 5-handleToggleCheckCards
    */

    toggleSetCardModal = (editCard = null) => {
        this.setState({
            editCard
        })
    }
    
    toggleOpenModal = () => {
        const { isOpenModal } = this.state
        this.setState({
            isOpenModal: !isOpenModal
        })
    }
    toggleOpenConfirm = () => {
        const { isOpenConfirm } = this.state
        this.setState({
            isOpenConfirm: !isOpenConfirm
        })
    }
    toggleCheckedAllCards = () => {
        let checkedCards = this.state.checkedCards;
        let { cards } = this.state;

        if (cards.length === checkedCards.size) checkedCards.clear();
        else cards.forEach(card => {
            checkedCards.add(card._id);
        })
        this.setState({
            checkedCards
        })

    }
    handleToggleCheckCards = (_id) => {
        let checkedCards = new Set(this.state.checkedCards)
        if (!checkedCards.has(_id)) checkedCards.add(_id);
        else checkedCards.delete(_id);
        this.setState({
            checkedCards
        });
    }

    /** 
     * add and edit functions
     * 1-addCard 
     * 2-handleEditCard
    */

    addCard = (formData) => {
        this.setState({ loading: true })
        fetch(`${API_HOST}/task`, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) throw data.error
                const cards = [...this.state.cards];
                cards.push(data)
                this.setState({
                    cards,
                    isOpenModal: !this.state.isOpenModal

                })
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                this.setState({ loading: false })
            })
    };

    handleEditCard = (editCard) => {
        this.setState({ loading: true })
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
                const cards = [...this.state.cards];
                const index = cards.findIndex(card => card._id === editCard._id)
                cards[index] = editCard;
                this.setState({
                    cards,
                    editCard: null
                })
            })
            .catch(error => {
                console.log('Catch Error', error)
            })
            .finally(() => {
                this.setState({ loading: false })
            })
    }

    /**
     * delete functions
     */

    deleteCard = (id) => {
        this.setState({ loading: true });
        fetch(`${API_HOST}/task/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) throw data.error;
                let cards = [...this.state.cards];
                cards = cards.filter(card => card._id !== id)
                this.setState({
                    cards
                })
            })
            .catch(error => {
                console.log('Catch Error', error)
            })
            .finally(() => {
                this.setState({
                    loading: false
                })
            })
    }

    deleteCheckedCard = () => {
        this.setState({ loading: true });
        const { checkedCards } = this.state;
        fetch(`${API_HOST}/task`, {
            method: 'PATCH',
            body: JSON.stringify({ tasks: [...checkedCards] }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) throw data.error;
                let cards = this.state.cards;
                cards = cards.filter(card => !checkedCards.has(card._id));
                this.setState({
                    cards,
                    checkedCards: new Set(),
                    isOpenConfirm: !this.state.isOpenConfirm
                })
            })
            .catch(error => {
                console.log('Catch Error', error)
            })
            .finally(() => {
                this.setState({
                    loading: false
                })
            })
    }

    getSingleCardFromCheckedCards = () => {
        if (this.state.checkedCards.size !== 1) {
            return
        }
        let id = null;
        this.state.checkedCards.forEach(_id => {
            id = _id
        })

        return this.state.cards.find(card => card._id === id)
    };

    componentDidMount() {
        this.setState({ loading: true });
        fetch(`${API_HOST}/task`,)
            .then(res => res.json())
            .then(data => {
                if (data.error) throw data.error
                this.setState({
                    cards: data
                })
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                this.setState({
                    loading: false
                })
            })
    }
    render() {
        const { cards, checkedCards, isOpenModal, isOpenConfirm, editCard, loading} = this.state;
        const card = cards.map(card => {
            return <Task
                card={card}
                key={card._id}
                deleteCard={this.deleteCard}
                handleToggleCheckCards={this.handleToggleCheckCards}
                isAnyCardChecked={checkedCards.size}
                isChecked={checkedCards.has(card._id)}
                toggleOpenModal={this.toggleOpenModal}
                setEditableCard={this.toggleSetCardModal}
                
            />
        });
        return (
            <section className='container'>
                <div className={editCard || isOpenModal || isOpenConfirm ? 'filter' : "noFilter"}>
                    <h1>This is ToDo Component</h1>
                    <div className={styles.inputHolder}>
                        <button
                            className={styles.btnAddText}
                            onClick={this.toggleOpenModal}
                            disabled={checkedCards.size !== 0}
                        >Add Card Modal
                        </button>
                    </div>
                    <div className={styles.btnHolder}>
                        <button
                            onClick={this.toggleOpenConfirm}
                            className={styles.btnDeleteAll}
                            disabled={cards.length === 0}
                        >
                            Delete All Cards
                        </button>
                        <button
                            onClick={this.toggleCheckedAllCards}
                            className={styles.btnCheckAll}
                            disabled={cards.length === 0}
                        >
                            {checkedCards.size && cards.length === checkedCards.size ? "Remove Checked" : "Checked All"}
                        </button>
                    </div>
                    <div className={styles.container}>
                        <div className={styles.row}>
                            <div className={styles.textHolder}>
                                {card.length ? card : <h2 className={styles.addSome}>Add some Card!</h2>}
                            </div>
                        </div>
                    </div>
                </div>

                {
                    isOpenModal && <Modal
                        onHide={this.toggleOpenModal}
                        onSubmit={this.addCard}
                    />
                }
                {
                    editCard && <Modal
                        onHide={this.toggleSetCardModal}
                        onSubmit={this.handleEditCard}
                        editCard={editCard}
                    />
                }
                {
                    isOpenConfirm && <Confirm
                        onHide={this.toggleOpenConfirm}
                        deleteCard={this.deleteCheckedCard}
                        countOrCardTitle={checkedCards.size !== 1 ? checkedCards.size : this.getSingleCardFromCheckedCards().title}
                    />
                }
                {
                    loading && <Spinner />
                }
               
            </section>
        )
    }
}
export default Todo