'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FreeAgentTracker = function (_React$Component) {
    _inherits(FreeAgentTracker, _React$Component);

    function FreeAgentTracker(props) {
        _classCallCheck(this, FreeAgentTracker);

        // bind the required methods to this
        var _this = _possibleConstructorReturn(this, (FreeAgentTracker.__proto__ || Object.getPrototypeOf(FreeAgentTracker)).call(this, props));

        _this.handleAddPlayer = _this.handleAddPlayer.bind(_this);
        _this.handleDeletePlayers = _this.handleDeletePlayers.bind(_this);
        _this.handleDeletePlayer = _this.handleDeletePlayer.bind(_this);

        // Set the initial state of the players here. Even though we're not directly
        // rendering it inside of this component, we will be performing almost all of
        // the functionality of it at this level.
        _this.state = {
            players: []
        };
        return _this;
    }

    // componentDidMount: we're going to use this to retrieve our players from local storage


    _createClass(FreeAgentTracker, [{
        key: 'componentDidMount',
        value: function componentDidMount() {

            try {
                var playerJSON = localStorage.getItem('players');
                var players = JSON.parse(playerJSON);

                if (players) {
                    this.setState(function () {
                        return { players: players };
                    });
                }
            } catch (e) {
                // No action required.
            }
        }

        // componentDidUpdate: we're going to use this to save our updated player state in local storage

    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {

            if (prevState.players.length !== this.state.players.length) {

                var playerJSON = JSON.stringify(this.state.players);
                localStorage.setItem('players', playerJSON);
            }
        }

        // handleAddPlayer: Used to add a new player to the list of free agents

    }, {
        key: 'handleAddPlayer',
        value: function handleAddPlayer(player) {

            if (!player.name) {
                return 'Please enter a valid player name.';
            }

            // update the state
            this.setState(function (prevState) {
                return {
                    players: prevState.players.concat(player)
                };
            });
        }

        // handleDeletePlayers: Used to clear all players from the list

    }, {
        key: 'handleDeletePlayers',
        value: function handleDeletePlayers() {

            // update the state
            this.setState(function (prevState) {
                return {
                    players: []
                };
            });
        }

        // handleDeletePlayer: Used to remove a specific player from the list

    }, {
        key: 'handleDeletePlayer',
        value: function handleDeletePlayer(player) {

            var newPlayerList = this.state.players.filter(function (thePlayer) {
                if (thePlayer.name == player.name) {
                    return false;
                } else {
                    return true;
                }
            });

            // update the state
            this.setState(function (prevState) {
                return {
                    players: newPlayerList
                };
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    Header,
                    null,
                    'Free Agent Tracker'
                ),
                React.createElement(Body, {
                    handleAddPlayer: this.handleAddPlayer,
                    handleDeletePlayers: this.handleDeletePlayers,
                    handleDeletePlayer: this.handleDeletePlayer,
                    players: this.state.players
                })
            );
        }
    }]);

    return FreeAgentTracker;
}(React.Component);

var Header = function Header(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'h1',
            null,
            props.children
        ),
        React.createElement(
            'h2',
            null,
            props.subtitle
        )
    );
};
Header.defaultProps = {
    subtitle: "Get active after work!"
};

var Body = function Body(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(PlayersList, {
            players: props.players,
            handleDeletePlayers: props.handleDeletePlayers,
            handleDeletePlayer: props.handleDeletePlayer
        }),
        React.createElement(NewFreeAgentForm, { handleAddPlayer: props.handleAddPlayer })
    );
};

var PlayersList = function PlayersList(props) {
    return React.createElement(
        'div',
        null,
        props.players.length <= 0 && React.createElement(
            'p',
            null,
            'No free agents, everybody is playing!'
        ),
        props.players.length > 0 && React.createElement(
            'button',
            { onClick: props.handleDeletePlayers },
            'Remove All Players'
        ),
        React.createElement(
            'ul',
            null,
            props.players.map(function (player) {
                return React.createElement(Player, { key: player.name, player: player, handleDeletePlayer: props.handleDeletePlayer });
            })
        )
    );
};

var Player = function (_React$Component2) {
    _inherits(Player, _React$Component2);

    function Player(props) {
        _classCallCheck(this, Player);

        var _this2 = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, props));

        // bind the required methods to this


        _this2.deletePlayer = _this2.deletePlayer.bind(_this2);
        return _this2;
    }

    // deletePlayer: used to pass up the player to delete into the handleDeletePlayer() method


    _createClass(Player, [{
        key: 'deletePlayer',
        value: function deletePlayer() {

            // delete the player via the handler method
            this.props.handleDeletePlayer(this.props.player);
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'li',
                null,
                this.props.player.name,
                ' (',
                this.props.player.gender,
                ')',
                React.createElement('br', null),
                React.createElement('br', null),
                React.createElement(
                    'p',
                    null,
                    React.createElement(
                        'strong',
                        null,
                        'About Me:'
                    ),
                    React.createElement('br', null),
                    this.props.player.message
                ),
                React.createElement(
                    'button',
                    { onClick: this.deletePlayer },
                    'Remove'
                )
            );
        }
    }]);

    return Player;
}(React.Component);

var NewFreeAgentForm = function (_React$Component3) {
    _inherits(NewFreeAgentForm, _React$Component3);

    function NewFreeAgentForm(props) {
        _classCallCheck(this, NewFreeAgentForm);

        var _this3 = _possibleConstructorReturn(this, (NewFreeAgentForm.__proto__ || Object.getPrototypeOf(NewFreeAgentForm)).call(this, props));

        _this3.formDidSubmit = _this3.formDidSubmit.bind(_this3);

        // set an error state for form submission
        _this3.state = {
            error: undefined
        };
        return _this3;
    }

    // The form was submitted. We need to wrap the form submission into a function 
    // so that we can attach the form data


    _createClass(NewFreeAgentForm, [{
        key: 'formDidSubmit',
        value: function formDidSubmit(e) {
            e.preventDefault();

            var player = {
                name: e.target.elements.yourName.value.trim(),
                gender: e.target.elements.yourGender.value.trim(),
                message: e.target.elements.yourMessage.value.trim()
            };
            var error = this.props.handleAddPlayer(player);

            // update the state
            this.setState(function () {
                return { error: error };
            });

            if (!error) {
                e.target.elements.yourName.value = '';
                e.target.elements.yourGender.value = 'Male';
                e.target.elements.yourMessage.value = '';
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'h2',
                    null,
                    'Add a New Free Agent'
                ),
                this.state.error && React.createElement(
                    'p',
                    null,
                    this.state.error
                ),
                React.createElement(
                    'form',
                    { onSubmit: this.formDidSubmit },
                    React.createElement(
                        'label',
                        null,
                        'Name: '
                    ),
                    React.createElement('input', { type: 'text', name: 'yourName' }),
                    React.createElement('br', null),
                    React.createElement('br', null),
                    React.createElement(
                        'label',
                        null,
                        'Gender: '
                    ),
                    React.createElement(
                        'select',
                        { name: 'yourGender' },
                        React.createElement(
                            'option',
                            { value: 'Male' },
                            'Male'
                        ),
                        React.createElement(
                            'option',
                            { value: 'Female' },
                            'Female'
                        )
                    ),
                    React.createElement('br', null),
                    React.createElement('br', null),
                    React.createElement(
                        'label',
                        null,
                        'Your Message: '
                    ),
                    React.createElement('br', null),
                    React.createElement('textarea', { name: 'yourMessage', rows: '8', cols: '100' }),
                    React.createElement('br', null),
                    React.createElement('br', null),
                    React.createElement(
                        'button',
                        null,
                        'Submit Your Name'
                    )
                )
            );
        }
    }]);

    return NewFreeAgentForm;
}(React.Component);

ReactDOM.render(React.createElement(FreeAgentTracker, null), document.getElementById('app'));
