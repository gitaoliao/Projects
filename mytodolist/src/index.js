import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Footer from './component/footer'
import Todo from './component/todo'
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';
class Mytodolist extends Component{
    constructor(props){
        super(props);
        this.state = {
            inputVal: '',
            todos:[],
            view:''
        }
    }
    handleInputChange=(ev)=>{
      
        this.setState({
            inputVal: ev.target.value       
        })

    }
    handleInputKeyDown=(ev)=>{
        let {todos} = this.state;
        let {value} = ev.target
        
        value = value.trim();
        if(ev.keyCode === 13 && value !== ''){
            this.setState({
                inputVal:'',
                todos:[
                    {
                        id: Math.random(),
                        content: value,
                        isCompleted: false
                    },
                    ...todos
                ]

            })

        }

    }
    //全选和全部取消
    handleToggleAll=(ev)=>{
        let {todos} = this.state;
        
        this.setState({
            todos:todos.map(todo=>{
                todo.isCompleted=ev.target.checked;
                return todo;
    
            })
            
        });

    }
    //改变todo完成与未完成的状态
    handletodotaggle=(id)=>{
        let {todos} = this.state;
        this.setState({
            todos: todos.map(todo=>{
                if(todo.id===id){
                    todo.isCompleted = !todo.isCompleted
                }
                return {...todo};
            })
           
        })
       
    }
    changeView=(view)=>{
        this.setState({
            view
        })

    }
    deleteOneTodo=(id)=>{
        let {todos} = this.state;
        this.setState({
            todos:todos.filter(todo=>{
                return todo.id!==id;
            })
    
        })
        
    }
    changeTodoContent=(id,content)=>{
        let {todos} = this.state;
      
        this.setState({
            todos:todos.map(todo=>{
                if(todo.id===id){
                    todo.content = content;
                }
                return {...todo};
            })
        })

    }
    clearAllCompleted=()=>{
        let {todos} = this.state;
        this.setState({
            todos:todos.filter(todo=>{
                return !todo.isCompleted
            })
        })
    }
    
    render(){

        let {
            todos,
            inputVal,
            view
        } = this.state;
        let leftItem = todos.length;
        let currentShowTodo = todos.filter(todo=>{
            if(todo.isCompleted){
                leftItem--;
            };

            switch(view){
    
                case 'active':
                    return !todo.isCompleted
                    break;

                case 'completed':
                    return todo.isCompleted
                    break;
                default :
                    return true;
                    
            }


        });
     
        let todosComp = currentShowTodo.map(todo=>{
            return (
                <Todo
                    key={todo.id}
                    {...todo}
                    {...{
                        handletodotaggle: this.handletodotaggle,
                        deleteOneTodo: this.deleteOneTodo,
                        changeTodoContent:this.changeTodoContent
                    }}                

                />
            )
        });

        let hasCompleteAll = todos.every(todo=>todo.isCompleted);
        
      
    


        return(
            <div>
                <header className="header">
                    <h1>todos</h1>
                    {/* 输入框 */}
                    <input
                        type="text"
                        className="new-todo"
                        placeholder="type something here"
                        value={inputVal}
                        onChange={this.handleInputChange}
                        onKeyDown={this.handleInputKeyDown}
                    
                    />
                </header>
                {todos.length>0 && (
                    <section className="main">
                      <input
                       type="checkbox"
                       className="toggle-all"
                       checked = {hasCompleteAll}
                       onChange={this.handleToggleAll}
                       
                      />
                      <ul className="todo-list">
                          {todosComp}
                      </ul>
                    </section>
                )}
                {todos.length>0 &&( 
                    <Footer
                    {...{leftItem,
                        isShowClearButton:todos.length>leftItem,
                        view,
                        changeView:this.changeView,
                        clearAllCompleted:this.clearAllCompleted
                    }}
            
                    />)
                         
                }
              
              
            </div>
        )
    }
}
ReactDOM.render(<Mytodolist />, document.getElementById('root'));
// registerServiceWorker();
