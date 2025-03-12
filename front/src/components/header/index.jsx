import React from "react";
import './styles.css'

export default function Header(){
    return(
        <header>
            <div className="container_header">
                <div className="title">
                    <h1>Header</h1>    
                </div>

                <div className="nav_area">
                    <span>Create</span>
                    <span>Read</span>
                    <span>Update</span>
                    <span>Delete</span>
                </div>
            </div>
        </header>
        
    )
}