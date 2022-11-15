﻿import React from 'react';
import { CustomAccordion } from './CustomAccordion';
import { useEffect,useState } from 'react';
import { useAuth0 }
    from "@auth0/auth0-react";
export function StudentAppointments(){
    const { user } = useAuth0();
    const [requests, setRequests] = useState([]);
    const [errorMessage, setError] = useState("");
    const [slot, setSlot] = useState("");
    const [appointments, setAppointments] = useState([]);
    const displayRequests = () => {
        fetch('student/DisplayRequests', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user.sub.substring(6))
        }).then(res => res.json())
            .then(data => {
                if (data != "")setRequests(data);
            });
    }

    const slotChanged = (e) => {
        setSlot(e.target.value);

    }
    const getAppointments = () => {
        fetch('student/GetAppointments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user.sub.substring(6))
        }).then(res => res.json())
            .then(data => {
                if (data != "") setAppointments(data);
            });
    }
    const sendConfirmedSlot = () => {
        if (slot != "") {
            setError("");
            fetch('student/SendConfirmedSlot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(slot)
            }).then(res => res.text())
                .then(data => {
                    setError(data);
                });
        } else {
            setError("A slot must be selected in order to submit it!")
        }
        
    }
    useEffect(() => {
        getAppointments();
        displayRequests();
    }, []);
    return (
        <div>
            <p>You cannot attend any calss without making the payment to the tutor. Pay the tutor an hour before the session otherwise the tutor will not be coming to the session.</p>
            <h3>Upcoming Appointments</h3>
            
            {appointments.map((a, index) =>
                <div key={index}>
                    <CustomAccordion title={a.Date}
                        content={
                            <div>
                                <p>Course {a.Course}</p>
                                <p>Tutor: {a.TutorStud }</p>
                                <p>Paypal link: {a.Paypal}</p>
                                <p>Meeting Link: {a.Zoom}</p>
                            </div>
                        } />
                    <br />
                </div>
            )
            }
            <h3>Appointment Request By Tutor</h3>
            
            {requests.map((r, index) =>
                <div key={index}>
                    <CustomAccordion title={r.Name}
                        content={
                            <div>
                                <p>Course {r.CourseName}</p>
                                <p>Message - {r.Message }</p>
                                <p>Please pick a time slot from below:</p>

                                <p><input type="radio" value={r.Id1} onChange={slotChanged} checked={slot == r.Id1} /> {r.Slot1 }</p>
                                <p><input type="radio" value={r.Id2} onChange={slotChanged} checked={slot == r.Id2} /> {r.Slot2}</p>
                                <p><input type="radio" value={r.Id3} onChange={slotChanged} checked={slot == r.Id3} /> {r.Slot3}</p>
                                <p><input type="radio" value={r.Id4} onChange={slotChanged} checked={slot == r.Id4} /> {r.Slot4}</p>
                                <p><input type="radio" value={r.Id5} onChange={slotChanged} checked={slot == r.Id5} /> {r.Slot5}</p>
                                <button onClick={sendConfirmedSlot}>Send Time Slot to Tutor</button>
                                <p className="text-primary">{errorMessage}</p>
                            </div>
                        } />
                    <br />
                </div>
            )
            }
        </div>
    );
    
}