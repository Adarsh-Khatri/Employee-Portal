import React, { Component } from 'react'
import { deleteApi } from './HttpService'

export default class DeleteStudent extends Component {

    async componentDidMount() {
        const { id } = this.props.match.params;
        await deleteApi(`/svr/employees/${id}`)
        this.props.history.push('/employees');
    }

    render() { return '' }
}
