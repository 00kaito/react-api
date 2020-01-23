import React, {Component} from 'react';
import './App.css';
import { env } from '../env/env';
import UsersTable from './UsersTable';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from "axios";

class App extends Component {
    state = {
        selected: '',
        users: [],
        userId: '',
        name: '',
        surname: '',
        dateOfBirth: '',
        balance: ''
    };

    handleChange = (e) => {
        const value = e.target.value;
        this.setState({
                selected: value
            }
        )
    };

    handleFormChange = (e) => {
        const value = e.target.value;
        this.setState({
                [e.target.name]: value
            }
        )
    };

    getData = (path) => {
        console.log(env.url + ':' + env.port + path)
        axios.get(env.url + ':' + env.port + path)
            .then(res => {
                const users = res.data;
                this.setState({users});
            })
    };

    patchData = (path) => {
        const state = this.state;
        const user = {
            name: state.name,
            surname: state.surname,
            dateOfBirth: state.dateOfBirth,
            balance: state.balance,
        }
        console.log(user)

        axios.patch(env.url + ':' + env.port + path + this.state.userId, {
            name: user.name,
            surname: user.surname,
            dateOfBirth: user.dateOfBirth,
            balance: user.balance,
        })
            .then(res => {
                const user = res.data;
                this.setState({
                    users: [user]
                });
            })
    };

    handleSubmit = () => {
        const option = this.state.selected;
        console.log(option);
        switch (option) {
            case '1':
                this.getData("/users");
                break;
            case '2':
                this.getData("/users/details");
                break;
            case '3':
                this.patchData("/users/");
                break;

            default:
                console.log("wybierz odpowiednia opcje");
        }

    }

    render() {
        return (
            <div className="container">
                <div className="w-100 p-2 d-flex flex-row">
                    <div className="form w-25">
                        <div className="w-100 p-2 d-flex flex-column">
                            <select className="custom-select custom-select-sm"
                                    onChange={this.handleChange}>
                                <option value="0">Choose</option>
                                <option value="1">Users</option>
                                <option value="2">Users Details</option>
                                <option value="3">Edit User</option>
                            </select>
                            <div className={this.state.selected === '3' ? 'form-group' : 'd-none'}>
                                <label htmlFor="formGroupExampleInput">id</label>
                                <input name="userId" type="text" className="form-control" id="userid"
                                       placeholder="id" value={this.state.userId}
                                       onChange={this.handleFormChange}/>

                                <label htmlFor="formGroupExampleInput">Name</label>
                                <input name="name" type="text" className="form-control" id="username"
                                       placeholder="Joe" value={this.state.name}
                                       onChange={this.handleFormChange}/>

                                <label htmlFor="formGroupExampleInput">Surname</label>
                                <input name="surname" type="text" className="form-control" id="usersurname"
                                       placeholder="Doe" value={this.state.surname}
                                       onChange={this.handleFormChange}/>

                                <label htmlFor="formGroupExampleInput">Date of Birth</label>
                                <input name="dateOfBirth" type="date" className="form-control"
                                       id="userbirth"
                                       placeholder="Day of birth" value={this.state.dateOfBirth}
                                       onChange={this.handleFormChange}/>

                                <label htmlFor="formGroupExampleInput">Balance</label>
                                <input name="balance" type="text" className="form-control" id="userbalance"
                                       placeholder="1 000.00" value={this.state.balance}
                                       onChange={this.handleFormChange}/>
                            </div>
                            <button className="m-1 w-50 btn btn-secondary" onClick={this.handleSubmit}>Submit</button>
                        </div>

                    </div>

                    <div className="w-75 d-flex">
                        <UsersTable users={this.state.users}/>
                    </div>

                </div>
            </div>
        );
    }
}

export default App;
