import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UpdateEmployee = ({ employeeId, onClose, onUpdate }) => {
    const [employee, setEmployee] = useState({ firstName: '', lastName: '', email: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`/api/employees/${employeeId}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                });
                setEmployee(response.data);
            } catch (err) {
                setError("Error fetching employee details");
            } finally {
                setLoading(false);
            }
        };

        if (employeeId) {
            fetchEmployee();
        }
    }, [employeeId, token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/employees/${employeeId}`, employee, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });
            alert("Employee updated successfully");
            onUpdate(); // Refresh the employee list
            onClose();  // Close the modal
        } catch (error) {
            console.error("Error updating employee:", error);
            alert("Failed to update employee");
        }
    };

    if (loading) return <div className="text-center mt-5">Loading employee details...</div>;
    if (error) return <div className="alert alert-danger text-center">{error}</div>;

    return (
        <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content p-3">
                    <div className="modal-header">
                        <h5 className="modal-title">Update Employee</h5>
                        <button type="button" className="close" onClick={onClose}>
                            <span>&times;</span>
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>First Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="firstName"
                                    value={employee.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Last Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="lastName"
                                    value={employee.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={employee.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                            <button type="submit" className="btn btn-primary">Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateEmployee;
