import React, { useEffect, useState } from "react";

const RecipeName = ({props}) => {
    return (
        <div>
            <img src={props.image}/>
            <span>{props.title}</span>
        </div>
    )
}

export default RecipeName;