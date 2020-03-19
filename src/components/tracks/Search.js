import React, { Component } from 'react';
import axios from 'axios';
import { Consumer } from '../../context';

class Search extends Component {
    state = {
        trackTitle: ''
    }

    findTrack(dispatch, e){
        e.preventDefault();

        axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=3&page=1&s_track_rating=desc&apikey=b11f990eb0c25b04664249f6bd590479`)
            .then(res => {
                dispatch({
                    type: 'SEARCH_TRACKS',
                    payload: res.data.message.body.track_list
                });
            })
            .catch(err=>console.log(err))
        
            this.setState({trackTitle: ''})
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <Consumer>
                { value => {
                    const { dispatch } = value;

                    return (
                        <div className="card card-body mb-4 p-4">
                             <h1 className="display-4 text-center">
                                 <i className="fas fa-music"></i> Search for a song
                             </h1>
                             <p className="lead text-center">Get the lyric</p>
                             <form onSubmit={this.findTrack.bind(this, dispatch)}>
                                 <div className="form-group">
                                     <input 
                                        type="text" 
                                        className="form-control form-control-lg" 
                                        placeholder="Song Title" 
                                        name="trackTitle" 
                                        value={this.state.trackTitle} 
                                        onChange={this.onChange} 
                                    />
                                 </div>
                                 <button 
                                    className="btn btn-primary btn-lg btn-block mb-5" 
                                    type="submit"
                                 >
                                     Get Track Lyric
                                 </button>
                             </form>
                        </div>
                    );
                }}
            </Consumer>
        )
    }
}


export default Search;