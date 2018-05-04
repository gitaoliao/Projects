import React, {Component} from 'react'

export default class Todo extends Component{
    constructor(props){
        super(props);
        this.state = {
            isInEdit: false,
            editVal:''
        }
    }
    onEdit=()=>{
        this.setState({
            isInEdit:true,
            editVal:this.props.content
        },()=>{         
            this.editInputRef.focus();
          })

    }
    onEditInputKeyDown=(e)=>{
        if(e.keyCode===13){
            this.onSave();

        }
        if(e.keyCode===27){
            this.setState({
                isInEdit:false,
                editVal:this.props.content

            })

        }
        
    }
    editInput=(e)=>{
        this.setState({
            editVal:e.target.value
        });
    }
    onSave=()=>{
        let {changeTodoContent, id, deleteOneTodo} = this.props;
        if(this.state.editVal.trim()===''){
            deleteOneTodo(id);
        }else{
            changeTodoContent(id, this.state.editVal);
            this.setState({
                isInEdit:false
            });
        }
    }
 
    render(){
        let {
            id,
            content,
            isCompleted,
            handletodotaggle,
            deleteOneTodo
        } = this.props;
       
        let {
            isInEdit,
            editVal
        } = this.state;

        let classname = isCompleted ? 'completed' : '';
        classname = isInEdit ? classname + 'editing' : classname;
        
        return(
            <li
                className={classname}
            >
                <div className="view">
                    {/* 勾选按钮  */}
                    <input
                    type="checkbox"
                    className="toggle"
                    checked={isCompleted}
                    onChange={()=>handletodotaggle(id)}
                    />
                    {/* todo的内容 */}
                    <label
                        onDoubleClick={this.onEdit}
                    >
                        {content}
                    </label>
                    {/* 删除按钮 */}
                    <button
                        className="destroy"
                        onClick={()=>{deleteOneTodo(id)}}
                    >
                    </button>
                </div>
                {/* 编辑todo的输入框 */}
                <input
                    type="text"
                    className="edit"
                    ref={elt=>this.editInputRef = elt}
                    value={editVal}
                    onChange={this.editInput}
                    onKeyDown={this.onEditInputKeyDown}
                
                />
            </li>

        )
    }


}