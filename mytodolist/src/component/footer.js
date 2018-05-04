import React, {Component} from 'react';
import '../index.css'

export default class extends Component {
    constructor(props){
        super(props);
    }
    render(){
        let {
            leftItem,
            view,
            changeView,
            clearAllCompleted,
            isShowClearButton
        }=this.props;
        return(
            <footer className="footer">
                    <span className="todo-count">
                        <strong>{leftItem}</strong>
                        <span>item left</span>
                    </span>
                    <ul className="filters">
                        <li onClick={()=>changeView('all')}>
                            <a 
                            className={view==='all'? 'selected':''}
                            >All</a>

                        </li>
                        <li onClick={()=>changeView('active')}>
                            <a 
                            className={view==='active'? 'selected':''}
                            >Active</a>

                        </li>
                        <li onClick={()=>changeView('completed')}>
                            <a
                            className={view==='completed'? 'selected':''}
                            >Completed</a>
 
                        </li>
                    </ul>
                    {
                        isShowClearButton&&(
                        <button
                            className="clear-completed"
                            onClick={()=>clearAllCompleted()}
                           >
                           clear all completed
       
                        </button>
                            
                        )
                    }
                    

                </footer>

        )

    }

}