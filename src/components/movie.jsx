import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Movie extends Component {
    state = {}
    handleSave = () => {
        this.props.history.replace("/movies");
    }
    render() {
        return (
            <React.Fragment>
                <h1>{this.props.match.params.id}</h1>
                <button type="button" className="btn btn-primary" onClick={this.handleSave}>Save</button>
            </React.Fragment>
        );
    }
}
export default Movie;