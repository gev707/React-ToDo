import React from "react";
import IdGenerator from "../Todo/helpers/IdGenerators";
import Task from '../Todo/Tasks/Task';
import Modal from '../Todo/Modal/Modal'
import Confirm from '../Todo/Confirm/Confirm'
import styles from "./todo.module.css";

class Todo extends React.Component {
    state = {
        cards: [
            {
                _id: IdGenerator(),
                title: 'Card-1',
                description: 'Card-1'
            },
            {
                _id: IdGenerator(),
                title: 'Card-2',
                description: 'Card-2'
            },
            {
                _id: IdGenerator(),
                title: 'Card-3',
                description: 'Card-3'
            },
        ],
        checkedCards: new Set(),
        isOpenModal: false,
        isOpenConfirm: false,
        editableCard:null
    };
    addCard = (formData) => {
        const card = [...this.state.cards];
        card.push({
            ...formData,
            _id: IdGenerator()
        });
        this.setState({
            cards: card
        });

    }
    deleteCard = (id) => {
        let cards = [...this.state.cards];
        cards = cards.filter(card => card._id !== id)
        this.setState({
            cards
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
    deleteCheckedCard = () => {
        let cards = this.state.cards;
        let checkedCards = this.state.checkedCards;
        cards = cards.filter(card => !checkedCards.has(card._id));
        this.setState({
            cards,
            checkedCards: new Set()
        })
    }
    toggleCheckedAllCards = () => {
        let { cards } = this.state;
        let checkedCards = this.state.checkedCards;
        if (cards.length === checkedCards.size) checkedCards.clear();
        else cards.forEach(card => {
            checkedCards.add(card._id);
        })
        this.setState({
            checkedCards
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
    getSingleCardFromCheckedCards = () => {
        if(this.state.checkedCards.size !==1){
            return
        }
        let id =null;
        this.state.checkedCards.forEach(_id=>{
            id = _id
        })

        return this.state.cards.find(card => card._id === id)
    };

    setEditableCard = (editableCard)=> {
        this.setState({
            editableCard
        })
    };

    removeEditableCard = ()=> {
        this.setState({
            editableCard:null
        })
    }
    handleEditCard = (editableCard)=> {
        const cards = [...this.state.cards];
        const index = cards.findIndex(card=>card._id === editableCard._id)
        cards[index] = editableCard;
        this.setState({
            cards
        })
    }
    render() {
        const { cards, checkedCards, isOpenModal, isOpenConfirm,editableCard } = this.state;
        const card = cards.map(card => {
            return <Task
                card={card}
                key={card._id}
                deleteCard={this.deleteCard}
                handleToggleCheckCards={this.handleToggleCheckCards}
                isAnyCardChecked={checkedCards.size}
                isChecked={checkedCards.has(card._id)}
                toggleOpenModal={this.toggleOpenModal}
                setEditableCard={this.setEditableCard}
            />
        });
        return (
            <section className='container'>
                <div className={isOpenModal || isOpenConfirm ? 'filter' : "noFilter"}>
                    <h1>This is ToDo Component</h1>
                    <div className={styles.inputHolder}>
                        <button
                            className={styles.btnAddText}
                            onClick={this.toggleOpenModal}
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
                                {card.length ? card : <h2>Add some Card!</h2>}
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
                    editableCard && <Modal
                        onHide={this.removeEditableCard}
                        onSubmit={this.handleEditCard}
                        editableCard={this.state.editableCard} 
                    />
                }
                {
                    isOpenConfirm && <Confirm
                        onHide={this.toggleOpenConfirm}
                        deleteCard={this.deleteCheckedCard}
                        countOrCardTitle={checkedCards.size !==1 ? checkedCards.size : this.getSingleCardFromCheckedCards().title}
                    />
                }

            </section>
        )
    }
}
export default Todo