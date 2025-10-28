
import { useRef } from 'react';

import Input from './Input';
import Modal from './Modal';

import './NewGoal.css';

export default function NewGoal({handleAddGoal, onCancel}) {
    const modal = useRef();

    const title = useRef();
    const description = useRef();
    const startdate = useRef();
    const enddate = useRef();

    function handleSave() {
        const enteredTitle = title.current.value;
        const enteredDescription = description.current.value;
        const enteredStartDate = startdate.current.value;
        const enteredEndDate = enddate.current.value;
        if (enteredTitle.trim() === '' || enteredDescription.trim() === '' || enteredStartDate.trim() === '' || enteredEndDate.trim() === '') {
            // show error modal
            modal.current.open();
            return;
        }

        handleAddGoal({
            title: enteredTitle,
            description: enteredDescription,
            startDate: enteredStartDate,
            endDate: enteredEndDate
        });
        
    }

    return (
        <>
            <Modal ref={modal} buttonCaption="Close">
                <h2>
                    Invalid input.
                </h2>
                <p>
                    Oops, looks like you forgot to enter a value.
                </p>
                <p>
                    Pleaee make sure you provide a valid input for every input field.       
                </p>
            </Modal>
            <div className='new-goal'>
                <div className='new-goal__inputs'>
                    <Input type="text" ref={title} label="Title" id="title"/>
                    <Input ref={description} label="Description" textarea id="description"/>
                    <Input type="date" ref={startdate} label="Start Date" id="startdate"/>
                    <Input type="date" ref={enddate} label="Target End Date" id="enddate"/>
                </div>
                <div>
                    <button onClick={onCancel} >Cancel</button> 
                    <button onClick={handleSave} >Save</button>
                </div>
            </div>
        </>
    )
}