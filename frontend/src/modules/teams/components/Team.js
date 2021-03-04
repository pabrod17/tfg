import React from 'react';




const Team = ({team}) => {


    return(
      <div>
            <p  className="encima">
                   {"TEAM --> " + team.teamName}</p>
      </div>
        )
    };

export default Team;