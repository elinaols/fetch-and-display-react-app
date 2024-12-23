import React, { useEffect, useState } from "react";

/*
    Using export default to export the FetchRestaurants-function as a component for use in the app
    https://react.dev/learn/importing-and-exporting-components
*/
export default function FetchRestaurants() {
    // Using useState to initialize and manage the state for the restaurants data and handle potential errors
    const [restaurants, setRestaurants] = useState([])
    const [error, setError] = useState(null)

    // Using useEffect to asynchronously fetch data from an external json file.
    useEffect(() => {
        /*
            Using fetch to retrieve data from external json file, update the restaurants state with the response and
            handle potential errors 
        */
        fetch('https://webbkurs.ei.hv.se/~elol0031/JSR200/Checkpoint_2/restaurants.json')
        .then((data) => data.json())
        .then((response) => {
            console.log(response)
            setRestaurants(response)
        })
        .catch((error) => {
            setError(error.message)
        })
    }, [])
    
    // Checks if an error has occurred and displays the error message if true
    if (error) return <p>Fel: {error.message}</p>

    // https://react.dev/learn/rendering-lists
    return (   
        <div className="restaurantList">
            {/*
                Using map to loop through the restaurants array to display the data from the json file
                using dot notation
            */}
            {restaurants.map((restaurant, index) => 
            <div key={index}>
                <h2>{restaurant.name}</h2>
                {/* Provides feedback if the restaurant has a michelin star or not */}
                <p className="michelinStar">{restaurant.michelinStar ? "Den här restaurangen har en michelinstjärna" : "Restaurangen har inte fått någon michelinstjärna ännu"}</p>
                {/* Using dot notation to fetch the restaurants opening hours */}
                <div className="openingHours">
                    <h3>Openinghours</h3>
                    <p><b>Mån:</b> {restaurant.openingHours[0].mon}</p>
                    <p><b>Tis:</b> {restaurant.openingHours[0].tue}</p>
                    <p><b>Ons:</b> {restaurant.openingHours[0].wed}</p>
                    <p><b>Tors:</b> {restaurant.openingHours[0].thu}</p>
                    <p><b>Fre:</b> {restaurant.openingHours[0].fri}</p>
                    <p><b>Lör:</b> {restaurant.openingHours[0].sat}</p>
                    <p><b>Sön:</b> {restaurant.openingHours[0].sun}</p>
                </div>
                <h3>Meny</h3>
                {/* Checks if the restaurant has a michelin star or not - to show different menu options */}
                {restaurant.michelinStar ? (
                    restaurant.menu.map((options, index) => 
                        <div key={index} className="michelinMenu">
                        <p><b>{options.name}</b> - {options.price}</p>
                        <p>{options.description}</p>
                    </div>
                    )
                ) : (
                    restaurant.menu.map((options, index) =>
                        <div key={index} className="normalMenu">
                            {/* 
                                Prevents errors by checking if the array exist before attempting to map through it.
                                This check is required because JavaScript doesn't know in advance what 'options' contains. 
                            */}
                            {options.starters && (
                                options.starters.map((starter, id) =>
                                <div key={id}>
                                    <p><b>{starter.name}</b> - {starter.price} kr</p>
                                    <p>{starter.description}</p>
                                </div>
                            ))}
                            {options.mainCourse && (
                                options.mainCourse.map((main, id) =>
                                <div key={id}>
                                    <p><b>{main.name}</b> - {main.price} kr</p>
                                    <p>{main.description}</p>
                                </div>
                            ))}
                            {options.dessert && (
                                options.dessert.map((dess, id) =>
                                <div key={id}>
                                    <p><b>{dess.name}</b> - {dess.price} kr</p>
                                    <p>{dess.description}</p>
                                </div>
                            ))}
                        </div>
                    )
                )}
            </div>
            )}
        </div>
    )
};