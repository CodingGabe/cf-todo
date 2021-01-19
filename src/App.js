
class App extends React.Component {
  
    // state = {
    //   tasks: ['Apply for Cloudfare Front-End Dev Role', 'Interview with Team', 'Take Coding Test']
    // };
  
    // makes a copy of the state, removes from array and updates state
    handleDelete = (index) => {
      const newArr = [...this.state.tasks];
      // removes elements from an array
      newArr.splice(index, 1);
      this.setState({tasks: newArr});
    }
  
    handleSubmit = task => {
      this.setState({tasks: [...this.state.tasks, task]});
    }
  
    render() {
      // initiate state with tasks with Hooks
      const [tasks, setTasks] = useState([
      {
        title: "Apply for Cloudfare Front-End Dev Role",
        completed: true
      },
      {
        title: "Interview with Team",
        completed: true
      },
      {
        title: "Take Coding Test",
        completed: false
      },
    ]);
      return(
        <div className='container'>
            {/* gets the state of tasks and displays the total number but getting the length of the obj */}
            <Header numTodos={this.state.tasks.length} />
            <TodoList tasks={this.state.tasks} onDelete={this.handleDelete} />
            <SubmitForm onFormSubmit={this.handleSubmit} />
         
        </div>
      );
    }
  }
  
  // component for updating the state and listens for user to add items
  class SubmitForm extends React.Component {
    state = { term: ''};
  
    // create event handler that prevents the default submit feature and updates state with new item
    // checks if there is text and if not then do nothing
    // sets state of inptut to blank again after submit
    handleSubmit = (e) => {
      e.preventDefault();
      if(this.state.term === '') return;
      this.props.onFormSubmit(this.state.term);
      this.setState({ term: '' });
    }
  
    render() {
      return(
        <form onSubmit={this.handleSubmit}>
          <div className='u-flex--split'>
            <input
              type='text'
              className='input'
              placeholder='Enter Task'
              value={this.state.term}
              onChange={(e) => this.setState({term: e.target.value})}
            />
            <button className='btn cf-btn'>Add Item</button>
          </div>
        </form>
      );
    }
  }
  
  // header for the Card that passes props
  const Header = (props) => {
    return(
      <div className='card-header'>
        {/* passes number of todos into title */}
        <h1 className='title'>
          ToDo(s): <span className='cf-color'>{props.numTodos}</span>
        </h1>
      </div>
    )
  }
  
  // todo list component that loops through each task
  const TodoList = (props) => {
    // loops or maps through each task and assigns it a unique id to render properly
    const todos = props.tasks.map((todo, index) => {
      return <Todo title={todo} key={index} id={index} onDelete={props.onDelete} />
    })
    // displays the todos when created
    return (
      <div className='list-wrapper'>
        {todos}
      </div>
    )
  }
  
  const Todo = (tasks) => {
    return(
      <div 
        className='list-item'
        style={{ textDecoration: tasks.completed ? 'line-through' : '' }}
      >
        {tasks.title}
        {/* add button with event handler to delete task */}
        <button className='btn remove-btn' onClick={() => {tasks.onDelete(tasks.id)}}>Remove</button>
      </div>
    )
  }