import React, { Component } from 'react';
import { get, put, post } from './HttpService'

export default class AddEmployee extends Component {

    state = {
        employee: { empcode: '', name: '', department: '', designation: '', salary: '', gender: '' },
        departmentsArr: ['Finance', 'HR', 'Technology', 'Marketing', 'Operations'],
        designationsArr: ['VP', 'Manager', 'Trainee'],
        genderArr: ['Male', 'Female'],
        edit: false,
    }

    async fetchData() {
        const { id } = this.props.match.params;
        if (id) {
            let { data } = await get(`/svr/employees/${id}`)
            this.setState({ employee: data[0], edit: true })
        } else {
            let employee = { empcode: '', name: '', department: '', designation: '', salary: '', gender: '' };
            this.setState({ employee: employee, edit: false })
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            this.fetchData()
        }
    }

    handleChange = ({ currentTarget: input }) => {
        let updatedEmployee = { ...this.state.employee };
        updatedEmployee[input.name] = input.value;
        this.setState({ employee: updatedEmployee });
    }

    async postData(url, obj) {
        let res = await post(url, obj);
        this.props.history.push('/employees')
    }

    async putData(url, obj) {
        let res = await put(url, obj);
        this.props.history.push('/employees')
    }

    handleSubmit = (e) => {
        let { employee, edit } = this.state;
        e.preventDefault();
        edit ? this.putData(`/svr/employees/${employee.empcode}`, employee) : this.postData('/svr/employees', this.state.employee)
    }

    render() {
        let { empcode, name, department, designation, salary, gender } = this.state.employee;
        let { departmentsArr, designationsArr, edit } = this.state;
        return (
            <div className='container my-5'>
                <div className="form-group">
                    <label htmlFor='empcode' className='fw-bold lead'>Empcode</label>
                    <input type="text" className='form-control mb-3' id='empcode' name="empcode" placeholder='Enter Employee Code' value={empcode} disabled={edit} onChange={(e) => this.handleChange(e)} />
                </div>
                <div className="form-group">
                    <label htmlFor='name' className='fw-bold lead'>Name</label>
                    <input type="text" className='form-control mb-3' id='name' name="name" placeholder='Enter Employee Name' value={name} onChange={(e) => this.handleChange(e)} />
                </div>
                <div className="form-group">
                    <label htmlFor='department' className='fw-bold lead'>Choose Department</label>
                    <select className='form-select mb-3' id="department" name="department" value={department} onChange={(e) => this.handleChange(e)}>
                        <option value="" disabled>Select Department</option>
                        {
                            departmentsArr.map(department =>
                                <option value={department}>{department}</option>
                            )
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor='designation' className='fw-bold lead'>Choose Designation</label>
                    <select className='form-select mb-3' id="designation" name="designation" value={designation} onChange={(e) => this.handleChange(e)}>
                        <option value="" disabled>Select Designation</option>
                        {
                            designationsArr.map(designation =>
                                <option value={designation}>{designation}</option>
                            )
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor='salary' className='fw-bold lead'>Salary</label>
                    <input type="number" className='form-control mb-3' id='salary' name="salary" placeholder='Enter Employee Salary' value={salary} onChange={(e) => this.handleChange(e)} />
                </div>
                <div className="form-group mb-3">
                    <label className='fw-bold lead'>Gender</label>
                    <div>
                        <input className='form-check-input form-check-inline' type="radio" id="male" name='gender' value="Male" checked={gender === 'Male'} onChange={(e) => this.handleChange(e)} />
                        <label className='form-check-label' htmlFor="male">Male</label>
                    </div>
                    <div>
                        <input className='form-check-input form-check-inline' type="radio" id="female" name='gender' value="Female" checked={gender === 'Female'} onChange={(e) => this.handleChange(e)} />
                        <label className='form-check-label' htmlFor="female">Female</label>
                    </div>
                </div>
                <button type='button' className='btn btn-primary my-3' onClick={(e) => this.handleSubmit(e)}>Submit</button>
            </div>
        )
    }
}
