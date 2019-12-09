import React from 'react';
import  ReactDOM from "react-dom";
import './index.css'
import TodoForm from './TodoForm'
import Todo from './Todo'

 class TodoList extends React.Component{
    state = {
        todos : [],
        todoToShow: "all"
    }

    addTodo = todo => {
        this.setState({
            todos : [todo , ...this.state.todos]
        })


    }

    toggleComplete = id => {
         this.setState({
             todos:this.state.todos.map( todo => {
                 if(todo.id ==id){
                     return {
                         ...todo,
                         complete: !todo.complete
                     }
                 }
                 else{
                     return todo;
                 }
             })
         })
    }

    updateTodoToshow = (s) => {
    let newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?'+s;
    window.history.pushState({ path: newurl }, '', newurl);
        this.setState({
            todoToShow: s
        })
    };
 handleDeleteTodo = (id) => {
     this.setState({
         todos: this.state.todos.filter(todo => todo.id !== id)
     });
 };
componentDidMount(){
let toShow =window.location.href.split("?");
if(toShow.length >1){
    this.setState({
        todoToShow: toShow[1]
    })
}

    localStorage.getItem("todoItems") && this.setState({
        todos: JSON.parse(localStorage.getItem("todoItems"))

    });
};

componentWillUpdate(nextProps,nextState){
    localStorage.setItem("todoItems",JSON.stringify(nextState.todos));
    localStorage.setItem("todoToShow",nextState.todoToShow);

};
    render(){

        let todos = [];
        if(this.state.todoToShow === "all"){
            todos = this.state.todos;

        }else if(this.state.todoToShow === "active"){
            todos = this.state.todos.filter(todo => !todo.complete);
        }else if(this.state.todoToShow === "complete"){
            todos = this.state.todos.filter(todo => todo.complete);
        }
        return(
            <div>
                <TodoForm onSubmit={this.addTodo}/>
                {todos.map(
                    todo => (
                        <Todo key={todo.id}
                              toggleComplete={() => this.toggleComplete(todo.id)}
                              onDelete = { () => this.handleDeleteTodo(todo.id)}
                              todo={todo} />

                    )
                )}
                <div>
                    todos left: {this.state.todos.filter(todo => !todo.complete).length}
                </div>
                <div>
                    <button onClick={() => this.updateTodoToshow("all")} >all</button>
                    <button onClick={() => this.updateTodoToshow("active")}>active</button>
                    <button onClick={() => this.updateTodoToshow("complete")}>complete</button>
                </div>
            </div>
        );
    }
}
const destination = document.getElementById("container");
ReactDOM.render(<TodoList />,destination);

