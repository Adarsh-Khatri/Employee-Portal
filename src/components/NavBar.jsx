import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class NavBar2 extends Component {
    render() {
        let departmentsArr = ['Finance', 'HR', 'Technology', 'Marketing', 'Operations'];
        let designationsArr = ['VP', 'Manager', 'Trainee'];
        return (
            <div>
                <nav class="navbar navbar-expand-lg navbar-success bg-success text-dark fs-5 px-4">
                    <div class="container-fluid">
                        <a class="navbar-brand fw-bold fs-4" href="/">EmployeesPortal</a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                <li class="nav-item">
                                    <Link class="nav-link" to="/employees">Employees</Link>
                                </li>
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Departments</a>
                                    <ul class="dropdown-menu bg-warning" aria-labelledby="navbarDropdown">
                                        {
                                            departmentsArr.map(dept =>
                                                <li><Link class="dropdown-item fw-bold text-dark text-center" to={`/employees/department/${dept}`}>{dept}</Link></li>
                                            )
                                        }
                                    </ul>
                                </li>
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Designations</a>
                                    <ul class="dropdown-menu bg-warning" aria-labelledby="navbarDropdown">
                                        {
                                            designationsArr.map(designation =>
                                                <li><Link class="dropdown-item fw-bold text-dark text-center" to={`/employees/designation/${designation}`}>{designation}</Link></li>
                                            )
                                        }
                                    </ul>
                                </li>
                                <li class="nav-item">
                                    <Link class="nav-link" to="/employees/add">New Employees</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}






