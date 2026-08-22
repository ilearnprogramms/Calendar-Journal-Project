import { useState } from "react";

interface TextElement {
    /* an object like java representing a "TextElement" that must have the given properties */
    id: number;
    text: string;
    x: number;
    y: number;
}

const days = [
    /* arraylist of days */
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];

function Calendar() {
    const [selectedDay, setSelectedDay] = useState("Monday");
    /*
     selectedDay = current value
     setSelectedDay = function that tells React to replace the current state value
    */

    const [textElements, setTextElements] = useState<TextElement[]>([]);
    /*
     useState = for remembering the data
     TextElement[] = the data is an array of TextElements objects
     ">([])" starts with an empty arraylist for us to fill with TextElement
    */

    function handleDoubleClick(
        event: React.MouseEvent<HTMLDivElement>
    ) {

        const newElement: TextElement = {
            id: Date.now(), 
            /*generates a timestamp that we're using as an id*/
            text: "New text",
            x: event.nativeEvent.offsetX,
            y: event.nativeEvent.offsetY
            /*gives the mouse position relative to the journal area*/
        };

        setTextElements([...textElements, newElement]); /* '...' spread operator (?) */
    }
    
    return (
        <div className="notebook">

            {/* LEFT PAGE */}
            <div className="left-page">
                <h1> August 2026</h1>
                
                <div className="week">
                    <p className="week-title">WEEK 34 · 17 → 23</p>
                    
                    {days.map((day) => (
                        <button
                            key={day}
                            className={`day-button ${
                                selectedDay === day ? "selected" : ""
                            }`}
                            onClick={() => setSelectedDay(day)}
                        >
                            {day}
                        </button>
                    ))}
                </div>
            </div>


            {/* RIGHT PAGE */}
            <div className="right-page">
                <h1>{selectedDay}</h1>
                <p className="date">August 2026</p>

                <div 
                    className="journal-area"
                    onDoubleClick={handleDoubleClick}
                    /*when this div gets double-clicked, calls handleDoubleClick*/
                >
                    <p>Double-click anywhere to add a new text</p>

                    {textElements.map((element) => ( /*for every element in this array, create smth*/
                        <div
                            key={element.id}
                            className="text-element"
                            style={{
                                left: element.x,
                                top: element.y
                            }}
                        >
                            <input 
                                value={element.text}
                                onChange={(event) => {
                                    console.log(event.target.value);
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>              
                    
        </div>
    );

}

export default Calendar;