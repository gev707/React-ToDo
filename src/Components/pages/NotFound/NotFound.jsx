import notFound from '../../../assets/Images/banner_error_404.jpg';
import notFoundResult from '../../../assets/Images/No-results-found.jpg';

import styles from './notfound.module.css'
const NotFound = (props) => {
    if(props.location.state === 'isCardId'){
       return (
        <>
        <div className={styles.notFound}>
            <div className={`${styles.notFound} 'container'`}>
                <h1>Card No Found</h1>
                <img src={notFoundResult} alt="error404" style={{width:'80%', margin:'auto'}}/>
            </div>
        </div>
    </>
       )
    } return (
        <>
            <div className={styles.notFound}>
                <div className={`${styles.notFound} 'container'`}>
                    <h1>Page No Found</h1>
                    <img src={notFound} alt="error404" style={{width:'80%', margin:'auto'}}/>
                </div>
            </div>

        </>
    )
}
export default NotFound;