import React, { Component } from 'react';
import ProfileIcon from 'react-icons/lib/md/person-outline';
import ReplyIcon from 'react-icons/lib/md/chat-bubble-outline';
import FavoriteIcon from 'react-icons/lib/md/favorite-outline';
import MessageIcon from 'react-icons/lib/md/mail-outline';
import MasterControlIcon from 'react-icons/lib/md/more-vert';

import './Post.css';

import Edit from './Edit/Edit';

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *APP* COMPONENT

export default class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      showMasterMenu: false
    };

    this.hideEdit = this.hideEdit.bind( this );
    this.showEdit = this.showEdit.bind( this );
    this.toggleMasterMenu = this.toggleMasterMenu.bind( this );
    this.hideMasterMenu = this.hideMasterMenu.bind( this );
  }

  // This puts the post into EDIT mode when the EDIT button is clicked from the drop-down
  showEdit() {
    this.setState({ editing: true, showMasterMenu: false });
  }

  // This puts the post back into normal viewing mode when the CANCEL button is clicked
  // This method is passed down to the <Edit /> component via props
  hideEdit() {
    this.setState({ editing: false });
  }

  // This toggles the drop-down when the three dots in the top right corner of a post are clicked
  toggleMasterMenu() {
    this.setState({ showMasterMenu: !this.state.showMasterMenu });
  }

  // This hides the drop-down when the post is clicked anywhere
  hideMasterMenu() {
    if ( this.state.showMasterMenu === true ) {
      this.setState({ showMasterMenu: false });
    }
  }

  render() {
    const { editing, showMasterMenu } = this.state;
    const { text, date, id, deletePostFn, updatePostFn } = this.props;
  
    return (
      <section className="Post__parent" onClick={ this.hideMasterMenu }>
  
        <div className="Post__master-controls">
          <MasterControlIcon onClick={ this.toggleMasterMenu } />
  
          <div className="Post__master-menu" style={ { display: showMasterMenu ? 'flex' : 'none' } }>
            <span onClick={ this.showEdit }>Edit</span>
            <span onClick={ () => deletePostFn( id ) }>Delete</span> 
</div>
        </div>
  
        <div className="Post__meta-data">
          <div className="Post__profile-picture">
            <ProfileIcon />
          </div>
  
          <span className="Post__name">DevMountain</span>
          <span className="Post__handle">@DevMountain</span>
  
          <span className="Post__date">- { date }</span>
        </div>
  
        <div className="Post__content">
  {
    editing
    ?
      <Edit text={ text }
            id={ id } 
            hideEdit={ this.hideEdit }
            updatePostFn={ updatePostFn }
            deletePostFn={deletePostFn} />
    :
      <span className="Post__text">{ text }</span>
  }
</div>
  
        <div className="Post__user-controls">
          <ReplyIcon className="Post__control-icon" />
          <FavoriteIcon className="Post__control-icon" />
          <MessageIcon className="Post__control-icon" />
        </div>
  
      </section>
    )
  }
}