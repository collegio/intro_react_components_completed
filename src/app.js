class ActivityTracker extends React.Component {
    constructor(props) {
        super(props);

        // bind the required methods to this
        this.handleAddActivity = this.handleAddActivity.bind(this);
        this.handleDeleteActivities = this.handleDeleteActivities.bind(this);
        this.handleDeleteActivity = this.handleDeleteActivity.bind(this);

        // Set the initial state of the activities here. Even though we're not directly
        // rendering it inside of this component, we will be performing almost all of
        // the functionality of it at this level.
        this.state = {
            activities: []
        };
    }

    // componentDidMount: we're going to use this to retrieve our activities from local storage
    componentDidMount() {

        try {
            const activityJSON = localStorage.getItem('activities');
            const activities = JSON.parse(activityJSON);

            if (activities) {
                this.setState(() => ({ activities }));
            }
        } catch (e) {
            // No action required.
        }
    }

    // componentDidUpdate: we're going to use this to save our updated activity state in local storage
    componentDidUpdate(prevProps, prevState) {

        if (prevState.activities.length !== this.state.activities.length) {

            const activityJSON = JSON.stringify(this.state.activities);
            localStorage.setItem('activities', activityJSON);
        }
    }

    // handleAddActivity: Used to add a new activity to the list of free agents
    handleAddActivity(activity) {

        if (!activity.name) {
            return 'Please enter a valid activity name.';
        }

        // update the state
        this.setState((prevState) => {
            return {
                activities: prevState.activities.concat(activity)
            };
        });
    }

    // handleDeleteActivities: Used to clear all activities from the list
    handleDeleteActivities() {

        // update the state
        this.setState((prevState) => {
            return {
                activities: []
            };
        });
    }

    // handleDeleteActivity: Used to remove a specific activity from the list
    handleDeleteActivity(activity) {

        const newActivityList = this.state.activities.filter((theActivity) => {
            if (theActivity.name == activity.name) {
                return false;
            }
            else {
                return true;
            }
        });

        // update the state
        this.setState((prevState) => {
            return {
                activities: newActivityList
            };
        });
    }

    
    render() {
        return (
            <div>
                <Header>Activity Tracker</Header>
                <Body 
                    handleAddActivity={this.handleAddActivity}
                    handleDeleteActivities={this.handleDeleteActivities}
                    handleDeleteActivity={this.handleDeleteActivity}
                    activities={this.state.activities}
                />
            </div>
        );
    }
}

const Header = (props) => {
    return (
        <div>
            <h1>{props.children}</h1>
            <h2>{props.subtitle}</h2>
        </div>
    );
}
Header.defaultProps = {
    subtitle: "Get active after work!"
};

const Body = (props) => {
    return (
        <div>
            <ActivitiesList
                activities={props.activities}
                handleDeleteActivities={props.handleDeleteActivities}
                handleDeleteActivity={props.handleDeleteActivity}
            />
            
            <NewActivityForm handleAddActivity={props.handleAddActivity} />
        </div>
    );
}

const ActivitiesList = (props) => {
    return (
        <div>
            {props.activities.length <= 0 && <p>No activities entered</p>}
            {props.activities.length > 0 && <button onClick={props.handleDeleteActivities}>Remove All Activities</button>}
            <ul>
                {
                props.activities.map((activity) => <Activity key={activity.name} activity={activity} handleDeleteActivity={props.handleDeleteActivity} />)
                }
            </ul>
        </div>
    );
}

class Activity extends React.Component {
    constructor(props) {

        // bind the required methods to this
        super(props);
        this.deleteActivity = this.deleteActivity.bind(this);
    }

    // deleteActivity: used to pass up the activity to delete into the handleDeleteActivity() method
    deleteActivity() {

        // delete the activity via the handler method
        this.props.handleDeleteActivity(this.props.activity);
    }

    render() {
        return (
            <li>
                {this.props.activity.name} - {this.props.activity.activity}
                
                <br />
                
                <p>
                    <strong>Distance:</strong> {this.props.activity.distance}
                </p>
                <button onClick={this.deleteActivity}>Remove</button>
            </li>
        );
    }
}

class NewActivityForm extends React.Component {
    constructor(props) {
        super(props);
        this.formDidSubmit = this.formDidSubmit.bind(this);

        // set an error state for form submission
        this.state = {
            error: undefined
        };
    }

    // The form was submitted. We need to wrap the form submission into a function 
    // so that we can attach the form data
    formDidSubmit(e) {
        e.preventDefault();

        const activity = {
            name: e.target.elements.yourName.value.trim(),
            activity: e.target.elements.yourActivity.value.trim(),
            distance: e.target.elements.yourDistance.value.trim()
        };
        const error = this.props.handleAddActivity(activity);

        // update the state
        this.setState(() => {
            return { error };
        });

        if (!error) {
            e.target.elements.yourName.value = '';
            e.target.elements.yourActivity.value = 'Running';
            e.target.elements.yourDistance.value = '';
        }
    }

    render() {
        return (
            <div>
                <h2>Add a New Activity</h2>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.formDidSubmit}>
                    <label>Name: </label>
                    <input type="text" name="yourName" />
                    <br />
                    <br />
                    <label>Activity: </label>
                    <select name="yourActivity">
                    <option value="Running">Running</option>
                    <option value="Walking">Walking</option>
                    <option value="Cycling">Cycling</option>
                    <option value="Swimming">Swimming</option>
                    </select>
                    <br />
                    <br />
                    <label>Distance: </label>
                    <input type="text" name="yourDistance" />
                    <br />
                    <br />
                    <button>Submit Activity</button>
                </form>
            </div>
        );
    }
}

ReactDOM.render(<ActivityTracker />, document.getElementById('app'));