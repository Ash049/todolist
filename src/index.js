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
        this.setState({
            todoToShow: s
        })
    };
 handleDeleteTodo = (id) => {
     this.setState({
         todos: this.state.todos.filter(todo => todo.id !== id)
     });
 };
     // removeAllTodoThatAreComplete = () => {
     //     this.setState({
     //         todos: this.state.todos.filter(todo => !todo.complete)
     //     });
    // }
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
                {this.state.todos.map(
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
                {/*{this.state.todos.some(todo => todo.complete)?*/}
                {/*( <div>*/}
                    {/*<button onClick={this.removeAllTodoThatAreComplete}>*/}
                        {/*remove all complete todos*/}
                    {/*</button>*/}
                {/*</div>) : null}*/}
            </div>
        );
    }
}
const destination = document.getElementById("container");
ReactDOM.render(<TodoList />,destination);

