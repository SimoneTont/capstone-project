import React, { useState } from 'react';
import axios from '../api/axios';

function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSent, setIsSent] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/send-email', formData);

            setFormData({
                name: '',
                email: '',
                message: ''
            });
            setIsSent(true);

        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className='PageDiv'>
            <div className='MyTitle mb-5'>
                <h1>Contact</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Your Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Your Email</label>
                    <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea className="form-control" id="message" name="message" value={formData.message} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn BlueButton">Send</button>
            </form>

            {isSent && (
                <p>Your email has been successfully sent.</p>
            )}
        </div>
    );
}

export default ContactPage;
