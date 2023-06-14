import React, { Component } from 'react';
import OptionsCB from './OptionsCB';
import { get } from './HttpService';
import queryString from 'query-string'
import { Link } from 'react-router-dom';

export default class Employees extends Component {

    state = {
        employeesData: [],
        departmentsArr: ['Finance', 'HR', 'Technology', 'Marketing','Operations'],
        designationsArr: ['VP', 'Manager', 'Trainee'],
        genderArr: ['Male', 'Female'],
        optionscb: {
            gender: '',
            department: '',
            designation: ''
        },

    }

    async fetchData() {
        let { departmentName, designationName } = this.props.match.params;
        let queryParams = this.props.location.search;
        let res;
        if (departmentName) {
            res = await get(`/svr/employees/department/${departmentName}`)
        } else if (designationName) {
            res = await get(`/svr/employees/designation/${designationName}`)
        } else if (queryParams) {
            res = await get(`/svr/employees${queryParams}`)
        } else {
            res = await get(`/svr/employees`)
        }
        this.setState({ employeesData: res.data });
    }

    componentDidMount() {
        this.fetchData()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            console.log('COMPONENT UPDATING');
            this.fetchData()
        }
    }

    sortColFor = (field) => {
        let s1 = this.state;
        if (field == 'empcode' || field == 'salary') {
            s1.employeesData.sort((a, b) => a[field] - b[field])
        } else {
            s1.employeesData.sort((a, b) => a[field].localeCompare(b[field]))
        }
        this.setState(s1)
    }

    callURL = (url, options) => {
        let searchStr = this.makeSearchString(options);
        this.props.history.push({ pathname: url, search: searchStr })
    }

    makeSearchString = (options) => {
        let { gender, department, designation } = options;
        let searchStr = '';
        searchStr = this.addToQueryString(searchStr, 'department', department);
        searchStr = this.addToQueryString(searchStr, 'designation', designation);
        searchStr = this.addToQueryString(searchStr, 'gender', gender);
        console.log(searchStr);
        return searchStr;
    };

    addToQueryString = (str, paramName, paramValue) => {
        return ((paramValue ? str ? `${str}&${paramName}=${paramValue}` :
            `${paramName}=${paramValue}` : str))
    }

    handleOptionChange = (options) => {
        this.setState({ optionscb: options })
        this.callURL(`/employees`, options)
    }

    render() {
        let { employeesData = [], departmentsArr, designationsArr, genderArr, optionscb } = this.state;
        return (
            <div className="container mt-3 mb-5">
                <div className="row">
                    <div className="col-sm-3">
                        <OptionsCB options={optionscb} departmentsArr={departmentsArr} designationsArr={designationsArr} genderArr={genderArr} onOptionChange={this.handleOptionChange} />
                    </div>
                    <div className="col-sm-9  text-center ">
                        <h1 className='fw-bold'>WELCOME TO THE EMPLOYEE PAGE</h1>

                        <div className="row bg-dark text-light">
                            <div className="col-sm-2 border" onClick={() => this.sortColFor('empcode')}>EmpCode</div>
                            <div className="col-sm-2 border" onClick={() => this.sortColFor('name')}>Name</div>
                            <div className="col-sm-2 border" onClick={() => this.sortColFor('department')}>Department</div>
                            <div className="col-sm-2 border" onClick={() => this.sortColFor('designation')}>Designation</div>
                            <div className="col-sm-1 border" onClick={() => this.sortColFor('salary')}>Salary</div>
                            <div className="col-sm-1 border" onClick={() => this.sortColFor('gender')}>Gender</div>
                            <div className="col-sm-1 border"></div>
                            <div className="col-sm-1 border"></div>
                        </div>
                        {
                            employeesData.length === 0 ? <h1 className='fw-bold text-danger my-5'>NO DATA</h1> : (
                                employeesData.map(employee =>
                                    <div className="row" key={employee.empcode}>
                                        <div className="col-sm-2 border">{employee.empcode}</div>
                                        <div className="col-sm-2 border">{employee.name}</div>
                                        <div className="col-sm-2 border">{employee.department}</div>
                                        <div className="col-sm-2 border">{employee.designation}</div>
                                        <div className="col-sm-1 border">{employee.salary}</div>
                                        <div className="col-sm-1 border">{employee.gender}</div>
                                        <div className="col-sm-1 border"><Link className="btn btn-warning btn-sm" to={`/employees/${employee.empcode}/edit`}>Edit</Link></div>
                                        <div className="col-sm-1 border"><Link className="btn btn-danger btn-sm me-4" to={`/employees/${employee.empcode}/delete`}>Delete</Link></div>
                                    </div>
                                )
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}
