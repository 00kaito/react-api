import React, {Component} from 'react';

class UsersTable extends Component {

    render() {
        const tableContent = this.props.users.map(
            user =>
            <tr key={user.id}>
                <th scope="row">{user.id}</th>
                <td>{user.name}</td>
                <td>{user.surname}</td>
                {user.dateOfBirth !== undefined ?
                <td>
                    {user.dateOfBirth.day} /
                    {user.dateOfBirth.month} /
                    {user.dateOfBirth.year}
                </td>
                : <td></td>}
                <td>{user.balance != undefined ? (1 * user.balance).toFixed(2) : ''}</td>
            </tr>
        );


        return(
        <table className="table table-dark">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Surname</th>
                <th scope="col">Date Of Birth</th>
                <th scope="col">Account Balance</th>
            </tr>
            </thead>
            <tbody>
            {tableContent}
            </tbody>
        </table>
        )
    }
}

export default UsersTable;