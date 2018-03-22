class FreeAgentTracker extends React.Component {
    constructor(props) {
        super(props);

        // bind the required methods to this
        this.handleAddPlayer = this.handleAddPlayer.bind(this);
        this.handleDeletePlayers = this.handleDeletePlayers.bind(this);
        this.handleDeletePlayer = this.handleDeletePlayer.bind(this);

        // Set the initial state of the players here. Even though we're not directly
        // rendering it inside of this component, we will be performing almost all of
        // the functionality of it at this level.
        this.state = {
            players: []
        };
    }

    // componentDidMount: we're going to use this to retrieve our players from local storage
    componentDidMount() {

        try {
            const playerJSON = localStorage.getItem('players');
            const players = JSON.parse(playerJSON);

            if (players) {
                this.setState(() => ({ players }));
            }
        } catch (e) {
            // No action required.
        }
    }

    // componentDidUpdate: we're going to use this to save our updated player state in local storage
    componentDidUpdate(prevProps, prevState) {

        if (prevState.players.length !== this.state.players.length) {

            const playerJSON = JSON.stringify(this.state.players);
            localStorage.setItem('players', playerJSON);
        }
    }

    // handleAddPlayer: Used to add a new player to the list of free agents
    handleAddPlayer(player) {

        if (!player.name) {
            return 'Please enter a valid player name.';
        }

        // update the state
        this.setState((prevState) => {
            return {
                players: prevState.players.concat(player)
            };
        });
    }

    // handleDeletePlayers: Used to clear all players from the list
    handleDeletePlayers() {

        // update the state
        this.setState((prevState) => {
            return {
                players: []
            };
        });
    }

    // handleDeletePlayer: Used to remove a specific player from the list
    handleDeletePlayer(player) {

        const newPlayerList = this.state.players.filter((thePlayer) => {
            if (thePlayer.name == player.name) {
                return false;
            }
            else {
                return true;
            }
        });

        // update the state
        this.setState((prevState) => {
            return {
                players: newPlayerList
            };
        });
    }

    
    render() {
        return (
            <div>
                <Header>Free Agent Tracker</Header>
                <Body 
                    handleAddPlayer={this.handleAddPlayer}
                    handleDeletePlayers={this.handleDeletePlayers}
                    handleDeletePlayer={this.handleDeletePlayer}
                    players={this.state.players}
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
            <PlayersList
                players={props.players}
                handleDeletePlayers={props.handleDeletePlayers}
                handleDeletePlayer={props.handleDeletePlayer}
            />
            
            <NewFreeAgentForm handleAddPlayer={props.handleAddPlayer} />
        </div>
    );
}

const PlayersList = (props) => {
    return (
        <div>
            {props.players.length <= 0 && <p>No free agents, everybody is playing!</p>}
            {props.players.length > 0 && <button onClick={props.handleDeletePlayers}>Remove All Players</button>}
            <ul>
                {
                props.players.map((player) => <Player key={player.name} player={player} handleDeletePlayer={props.handleDeletePlayer} />)
                }
            </ul>
        </div>
    );
}

class Player extends React.Component {
    constructor(props) {

        // bind the required methods to this
        super(props);
        this.deletePlayer = this.deletePlayer.bind(this);
    }

    // deletePlayer: used to pass up the player to delete into the handleDeletePlayer() method
    deletePlayer() {

        // delete the player via the handler method
        this.props.handleDeletePlayer(this.props.player);
    }

    render() {
        return (
            <li>
                {this.props.player.name} ({this.props.player.gender}) 
                
                <br />
                <br />
                
                <p>
                    <strong>About Me:</strong>
                    <br />
                    {this.props.player.message}
                </p>
                <button onClick={this.deletePlayer}>Remove</button>
            </li>
        );
    }
}

class NewFreeAgentForm extends React.Component {
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

        const player = {
            name: e.target.elements.yourName.value.trim(),
            gender: e.target.elements.yourGender.value.trim(),
            message: e.target.elements.yourMessage.value.trim()
        };
        const error = this.props.handleAddPlayer(player);

        // update the state
        this.setState(() => {
            return { error };
        });

        if (!error) {
            e.target.elements.yourName.value = '';
            e.target.elements.yourGender.value = 'Male';
            e.target.elements.yourMessage.value = '';
        }
    }

    render() {
        return (
            <div>
                <h2>Add a New Free Agent</h2>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.formDidSubmit}>
                    <label>Name: </label>
                    <input type="text" name="yourName" />
                    <br />
                    <br />
                    <label>Gender: </label>
                    <select name="yourGender">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    </select>
                    <br />
                    <br />
                    <label>Your Message: </label>
                    <br />
                    <textarea name="yourMessage" rows="8" cols="100"></textarea>
                    <br />
                    <br />
                    <button>Submit Your Name</button>
                </form>
            </div>
        );
    }
}

ReactDOM.render(<FreeAgentTracker />, document.getElementById('app'));