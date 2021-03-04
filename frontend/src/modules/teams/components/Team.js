import React from 'react';




const Team = ({team}) => {


  if(team){
    return(
        <a href="/" className="encima color-byTeamName">
        {"TEAM --> " + team.teamName}</a>
    );
  } else{
      return(
          <div class="spinner-border color-byTeamName" role="status">
          <span class="visually-hidden">Loading...</span>
          </div>        
      );
    }
    };

export default Team;