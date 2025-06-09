import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UpdateEmployee from './UpdateEmployee';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

    const token = localStorage.getItem("token");

    // Fetch employees from API
    const fetchEmployees = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:8080/api/employees", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setEmployees(response.data);
        } catch (err) {
            setError("Error fetching employee data");
        } finally {
            setLoading(false);
        }
    };

    // Update employee logic
    const updateEmployee = (employeeId) => {
        setSelectedEmployeeId(employeeId);
        setShowModal(true);
    };

    // Delete employee logic
    const deleteEmployee = async (employeeId) => {
        const confirmed = window.confirm("Are you sure you want to delete this employee?");
        if (confirmed) {
            try {
                await axios.delete(`/api/employees/${employeeId}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                });
                alert("Employee deleted successfully");
                fetchEmployees();
            } catch (error) {
                console.error("Error deleting employee:", error);
                alert("Failed to delete employee");
            }
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleModalClose = () => {
        setShowModal(false);
        setSelectedEmployeeId(null);
    };

    if (loading) return <div className='text-center mt-5'>Loading...</div>;
    if (error) return <div className='alert alert-danger text-center'>{error}</div>;

    return (
        <div className='container mt-5'>
            <h1 className='text-center mb-4'>Employee List</h1>
            <button className='btn btn-primary mb-4' onClick={fetchEmployees}>Refresh Employee List</button>
            {employees.length === 0 ? (
                <p>No Employees found</p>
            ) : (
                <ul className='list-group'>
                    {employees.map((employee) => (
                        <div key={employee.id} className='card mb-3'>
                            <div className='card-body'>
                                <h5 className='card-title'>
                                    {employee.firstName} {employee.lastName}
                                </h5>
                                <p className="mb-2 text-muted">{employee.email}</p>

                                <div className="button-container" style={{ display: 'flex', gap: '10px' }}>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => updateEmployee(employee.id)}
                                    >
                                        Update Employee
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => deleteEmployee(employee.id)}
                                    >
                                        Delete Employee
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </ul>
            )}

            {showModal && (
                <UpdateEmployee
                    employeeId={selectedEmployeeId}
                    onClose={handleModalClose}
                    onUpdate={fetchEmployees}
                />
            )}
        </div>
    );
};

export default EmployeeList;
