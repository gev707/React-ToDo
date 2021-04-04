import React from 'react';
import PropTypes from 'prop-types';
import styles from "./task.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faAddressCard } from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom'
import {withRouter} from  'react-router-dom'
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
               
                <Link  to={'/card/' + card._id}><p>{card.title}</p></Link>
                <p className={styles.description}>- Description - <br />{card.description}</p>
                <p>Date: {card.date.slice(0,10)}</p>
                <div>
                    <button>
                        <FontAwesomeIcon
                            onClick={() => deleteCard(card._id)}
                            icon={faTrashAlt}
                        />
                    </button>
                    <button>
                        <FontAwesomeIcon
                            icon={faAddressCard}
                            onClick={()=>setEditableCard(card)}
                        />
                    </button>
                </div>

            </div>
        </div>
    )
}

Task.propTypes = {
    card:PropTypes.shape({
        _id:PropTypes.string.isRequired,
        title:PropTypes.string.isRequired,
        description:PropTypes.string.isRequired
    }),
    handleToggleCheckCards:PropTypes.func,
    deleteCard:PropTypes.func.isRequired,
    isChecked:PropTypes.bool

}
export default withRouter(memo(Task));