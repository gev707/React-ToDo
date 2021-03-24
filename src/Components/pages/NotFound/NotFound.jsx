import notFound from '../../../assets/Images/banner_error_404.jpg';
//import notFoundResult from '../../../assets/Images/No-results-found.jpg';

import styles from './notfound.module.css'
const NotFound = props => {
    console.log(props)
    return (
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