import React, {Component} from 'react';

export default class Search extends Component {

  submit(event){
    event.preventDefault();
    let value = this.refs.username.value;
    this.props.searchProfile(value);
    this.refs.username.value ='';
  }

  render(){
    return(
      <div className="search-box">
        <form onSubmit={this.submit.bind(this)}>
          <label><input type="search" ref="username" placeholder="Type username and enter hit hard"/></label>
        </form>
      </div>
    );
  }
}
