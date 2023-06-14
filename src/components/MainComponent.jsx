import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import NavBar from './NavBar';
import Employees from './Employees';
import AddEmployee from './AddEmployee';
import DeleteEmployee from './DeleteEmployee';

export default class MainComponent extends Component {

    render() {
        return (
            <>
                <div className="container-fluid">
                    <NavBar />
                    <Switch>

                        <Route path='/employees/department/:departmentName' component={Employees} />

                        <Route path='/employees/designation/:designationName' component={Employees} />

                        <Route path='/employees/:id/delete' component={DeleteEmployee} />

                        <Route path='/employees/add' component={AddEmployee} />

                        <Route path='/employees/:id/edit' component={AddEmployee} />

                        <Route path='/employees' component={Employees} />

                        <Redirect from="/" to='/employees' />

                    </Switch>

                </div>
            </>

        )
    }
}

