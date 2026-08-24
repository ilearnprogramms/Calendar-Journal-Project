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

    function updateTextElement(
        id: number,
        newText: string
    ) {
        const updatedTextElements = textElements.map((element) => {
    
            if (element.id === id) {
                return {
                    ...element,
                    text: newText
                }; /* if true = make a new text object containing everything the old object had (id and coordinates). just replace the text.*/
            }
                return element;
            });
        setTextElements(updatedTextElements); /*set the state to the new version*/
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
                            <textarea 
                                value={element.text}
                                onChange={(event) => {
                                    updateTextElement(element.id, event.target.value);
                                    /*take this specific/matching element id and change its text to whatever the user just typed.*/
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