import React from 'react';
import PropTypes from 'prop-types';
import styles from "./task.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap'
import { memo } from 'react';
const Task = ({
    card,
    handleToggleCheckCards,
    deleteCard,
    isChecked,
    setEditableCard,

}) => {
    return (
        <div className={!isChecked ? styles.taskHolder : styles.tasks}>
            <input
                className={styles.check}
                type='checkbox'
                onChange={(e) => handleToggleCheckCards(card._id)}
                checked={isChecked}
            />
            <div className={styles.taskFlex}>
                {/* <Dropdown>  
                        <Dropdown.Toggle variant="info" id="dropdown-basic">
                            
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item>
                            <Link to={'/card/' + card._id}><p>SingleCard With Context</p></Link>
                            </Dropdown.Item>
                            <Dropdown.Item>
                            
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>  */}

                <NavDropdown title={card.title} id="nav-dropdown">
                        <NavLink to={'/card/' + card._id}><p className={styles.para}>SingleCard With Context</p></NavLink>
                        <NavLink to={'/single-card/' + card._id}><p className={styles.para}>SingleCard With Reducer</p></NavLink>
                </NavDropdown>

                <p className={styles.description}>- Description - <br />{card.description}</p>
                <p>Date: {card.date.slice(0, 10)}</p>
                <div>
                    <button className={styles.taskBtn}>
                        <FontAwesomeIcon
                            onClick={() => deleteCard(card._id)}
                            icon={faTrashAlt}
                        />
                    </button>
                    <button className={styles.taskBtn}>
                        <FontAwesomeIcon
                            icon={faAddressCard}
                            onClick={() => setEditableCard(card)}
                        />
                    </button>
                </div>

            </div>
        </div>
    )
}

Task.propTypes = {
    card: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
    }),
    handleToggleCheckCards: PropTypes.func,
    deleteCard: PropTypes.func.isRequired,
    isChecked: PropTypes.bool

}
export default withRouter(memo(Task));