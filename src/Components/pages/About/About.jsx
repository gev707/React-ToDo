import {Button,Dropdown} from 'react-bootstrap'
import todoImage from '../../../assets/Images/Screenshot_3.png';
import todoImage1 from '../../../assets/Images/Screenshot_1.png';
import todoImage2 from '../../../assets/Images/Screenshot_2.png';
import styles from './about.module.css'
const About = (props) => {
    const sections = [
        {
            text:`I know it is an overdone project, however, 
            building a todo application can be a great way to learn
            React and solidify some of the basic principles of the library.
            So today, we will be building a simple React app.`,
            image: todoImage,
            figcaption: 'We make todo list !',
            alt:'myTodoList'
        },
        {
            text:`For our styling, we will be using an external CSS.
            With the settings menu still open, flip over to the CSS tab, 
            scroll down to the external scripts section.`,
            image: todoImage1,
            figcaption: 'Css style for our project !',
            alt:'myTodoList1'
        },
        {
            text:`It’s always a good idea to have a plan of what you are going to build before
            you start typing. Especially when building a user interface with React. We want to have some idea of what 
            the interface will look like so we can know what 
        components we need to build and what data each component will be responsible for handling`,
            image: todoImage2,
            figcaption: 'Nice modal for our todo !',
            alt:'myTodoList2'
        },
    ];
    const section=sections.map((section,index)=>{
    
        return (
            <div key={index}>
                <h2 className={styles.aboutTitle}>{section.text}</h2>
                <figure>
                    <img src={section.image} alt={section.alt}/>
                    <figcaption>{section.figcaption}</figcaption>
                </figure>
            </div>
        )

    });
        return (

            <div 
                className={styles.aboutHolder}
            >
                <h1>About Section</h1>
                <div className={`${styles.dropDown} d-flex justify-content-flex-start`}>
                    <Dropdown>  
                        <Dropdown.Toggle variant="info" id="dropdown-basic">
                            Page Routing
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">
                                <Button 
                                    variant='info' 
                                    onClick = {()=>props.history.push('/')}
                                    >To Home
                                </Button>
                            </Dropdown.Item>
                            <Dropdown.Item href="#/action-2">
                                <Button 

                                    variant='info' 
                                    onClick = {()=>props.history.go(-1)}
                                    >Previus Page

                                </Button>
                            </Dropdown.Item>
                            <Dropdown.Item href="#/action-3">
                                <Button 
                                    variant='info' 
                                    onClick = {()=>props.history.goBack()}
                                    >Go Back
                                </Button>
                            </Dropdown.Item>
                            <Dropdown.Item href="#/action-4">
                                <Button 
                                    variant='info' 
                                    onClick = {()=>props.history.goForward()}
                                    >Go Forward
                                </Button>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>  
                </div>
                {section}
            </div>

        )
}
export default About;