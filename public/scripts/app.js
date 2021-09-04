'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ActivityTracker = function (_React$Component) {
    _inherits(ActivityTracker, _React$Component);

    function ActivityTracker(props) {
        _classCallCheck(this, ActivityTracker);

        // bind the required methods to this
        var _this = _possibleConstructorReturn(this, (ActivityTracker.__proto__ || Object.getPrototypeOf(ActivityTracker)).call(this, props));

        _this.handleAddActivity = _this.handleAddActivity.bind(_this);
        _this.handleDeleteActivities = _this.handleDeleteActivities.bind(_this);
        _this.handleDeleteActivity = _this.handleDeleteActivity.bind(_this);

        // Set the initial state of the activities here. Even though we're not directly
        // rendering it inside of this component, we will be performing almost all of
        // the functionality of it at this level.
        _this.state = {
            activities: []
        };
        return _this;
    }

    // componentDidMount: we're going to use this to retrieve our activities from local storage


    _createClass(ActivityTracker, [{
        key: 'componentDidMount',
        value: function componentDidMount() {

            try {
                var activityJSON = localStorage.getItem('activities');
                var activities = JSON.parse(activityJSON);

                if (activities) {
                    this.setState(function () {
                        return { activities: activities };
                    });
                }
            } catch (e) {
                // No action required.
            }
        }

        // componentDidUpdate: we're going to use this to save our updated activity state in local storage

    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {

            if (prevState.activities.length !== this.state.activities.length) {

                var activityJSON = JSON.stringify(this.state.activities);
                localStorage.setItem('activities', activityJSON);
            }
        }

        // handleAddActivity: Used to add a new activity to the list of free agents

    }, {
        key: 'handleAddActivity',
        value: function handleAddActivity(activity) {

            if (!activity.name) {
                return 'Please enter a valid activity name.';
            }

            // update the state
            this.setState(function (prevState) {
                return {
                    activities: prevState.activities.concat(activity)
                };
            });
        }

        // handleDeleteActivities: Used to clear all activities from the list

    }, {
        key: 'handleDeleteActivities',
        value: function handleDeleteActivities() {

            // update the state
            this.setState(function (prevState) {
                return {
                    activities: []
                };
            });
        }

        // handleDeleteActivity: Used to remove a specific activity from the list

    }, {
        key: 'handleDeleteActivity',
        value: function handleDeleteActivity(activity) {

            var newActivityList = this.state.activities.filter(function (theActivity) {
                if (theActivity.name == activity.name) {
                    return false;
                } else {
                    return true;
                }
            });

            // update the state
            this.setState(function (prevState) {
                return {
                    activities: newActivityList
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
                    'Activity Tracker'
                ),
                React.createElement(Body, {
                    handleAddActivity: this.handleAddActivity,
                    handleDeleteActivities: this.handleDeleteActivities,
                    handleDeleteActivity: this.handleDeleteActivity,
                    activities: this.state.activities
                })
            );
        }
    }]);

    return ActivityTracker;
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
        React.createElement(ActivitiesList, {
            activities: props.activities,
            handleDeleteActivities: props.handleDeleteActivities,
            handleDeleteActivity: props.handleDeleteActivity
        }),
        React.createElement(NewActivityForm, { handleAddActivity: props.handleAddActivity })
    );
};

var ActivitiesList = function ActivitiesList(props) {
    return React.createElement(
        'div',
        null,
        props.activities.length <= 0 && React.createElement(
            'p',
            null,
            'No activities entered'
        ),
        props.activities.length > 0 && React.createElement(
            'button',
            { onClick: props.handleDeleteActivities },
            'Remove All Activities'
        ),
        React.createElement(
            'ul',
            null,
            props.activities.map(function (activity) {
                return React.createElement(Activity, { key: activity.name, activity: activity, handleDeleteActivity: props.handleDeleteActivity });
            })
        )
    );
};

var Activity = function (_React$Component2) {
    _inherits(Activity, _React$Component2);

    function Activity(props) {
        _classCallCheck(this, Activity);

        var _this2 = _possibleConstructorReturn(this, (Activity.__proto__ || Object.getPrototypeOf(Activity)).call(this, props));

        // bind the required methods to this


        _this2.deleteActivity = _this2.deleteActivity.bind(_this2);
        return _this2;
    }

    // deleteActivity: used to pass up the activity to delete into the handleDeleteActivity() method


    _createClass(Activity, [{
        key: 'deleteActivity',
        value: function deleteActivity() {

            // delete the activity via the handler method
            this.props.handleDeleteActivity(this.props.activity);
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'li',
                null,
                this.props.activity.name,
                ' - ',
                this.props.activity.activity,
                React.createElement('br', null),
                React.createElement(
                    'p',
                    null,
                    React.createElement(
                        'strong',
                        null,
                        'Distance:'
                    ),
                    ' ',
                    this.props.activity.distance
                ),
                React.createElement(
                    'button',
                    { onClick: this.deleteActivity },
                    'Remove'
                )
            );
        }
    }]);

    return Activity;
}(React.Component);

var NewActivityForm = function (_React$Component3) {
    _inherits(NewActivityForm, _React$Component3);

    function NewActivityForm(props) {
        _classCallCheck(this, NewActivityForm);

        var _this3 = _possibleConstructorReturn(this, (NewActivityForm.__proto__ || Object.getPrototypeOf(NewActivityForm)).call(this, props));

        _this3.formDidSubmit = _this3.formDidSubmit.bind(_this3);

        // set an error state for form submission
        _this3.state = {
            error: undefined
        };
        return _this3;
    }

    // The form was submitted. We need to wrap the form submission into a function 
    // so that we can attach the form data


    _createClass(NewActivityForm, [{
        key: 'formDidSubmit',
        value: function formDidSubmit(e) {
            e.preventDefault();

            var activity = {
                name: e.target.elements.yourName.value.trim(),
                activity: e.target.elements.yourActivity.value.trim(),
                distance: e.target.elements.yourDistance.value.trim()
            };
            var error = this.props.handleAddActivity(activity);

            // update the state
            this.setState(function () {
                return { error: error };
            });

            if (!error) {
                e.target.elements.yourName.value = '';
                e.target.elements.yourActivity.value = 'Running';
                e.target.elements.yourDistance.value = '';
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
                    'Add a New Activity'
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
                        'Activity: '
                    ),
                    React.createElement(
                        'select',
                        { name: 'yourActivity' },
                        React.createElement(
                            'option',
                            { value: 'Running' },
                            'Running'
                        ),
                        React.createElement(
                            'option',
                            { value: 'Walking' },
                            'Walking'
                        ),
                        React.createElement(
                            'option',
                            { value: 'Cycling' },
                            'Cycling'
                        ),
                        React.createElement(
                            'option',
                            { value: 'Swimming' },
                            'Swimming'
                        )
                    ),
                    React.createElement('br', null),
                    React.createElement('br', null),
                    React.createElement(
                        'label',
                        null,
                        'Distance: '
                    ),
                    React.createElement('input', { type: 'text', name: 'yourDistance' }),
                    React.createElement('br', null),
                    React.createElement('br', null),
                    React.createElement(
                        'button',
                        null,
                        'Submit Activity'
                    )
                )
            );
        }
    }]);

    return NewActivityForm;
}(React.Component);

ReactDOM.render(React.createElement(ActivityTracker, null), document.getElementById('app'));
