import React, { Component, PropTypes } from 'react';

import Spinner from '../../shared/Spinner'

export default class Statuses extends Component {
    state = {
       loading:false,
       statuses: []
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if ( !this.state.loading && this.props.selectedUser !== prevProps.selectedUser) {
            this.fetchStatuses();        
        } 
    }  

    fetchStatuses() {
        if(!this.props.selectedUser) {
            console.log('no user');
            this.setState({ statuses: [] });
            return;
        }
        this.setState({ statuses: [], loading: true });
        fetch(`http://localhost:8000/app/statuses/?screenname=${this.props.selectedUser.screen_name}`)
        .then(response=>response.json())  
        .then(statuses => {
            this.setState({ statuses, loading:false });
        }); 
    }

    render() {
        return (
            <div className="col-sm">
                {this.state.loading && <Spinner/>}
                {!this.state.loading && <div className="card" >
                    <ul className="list-group list-group-flush">
                    {this.state.statuses.map((status) => (<li className="list-group-item" key={status.id}>{status.text}</li>))}
                    </ul>
                </div> 
                }  
            </div>
        );
    }

}