/**
 * Created by sergey on 07.03.15.
 */
//var $ = require('jquery');
var React = require('react');
var a = require('./api/api');

var Hello = React.createClass({
    render: function() {
        return (<div> hello world 1v 1 1!!! </div>)
    }
});

React.render(<Hello />, document.body);