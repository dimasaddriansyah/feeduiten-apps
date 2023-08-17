import { React, Component } from 'react'
import { Modal } from 'react-bootstrap';

export default class Modals extends Component {
    constructor() {
        super();
        this.state = {
            show: false,
            category: '',
            description: '',
            nominal: 0,
            date: ''
        }
        this.handleShow = this.handleShow.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleForm = this.handleForm.bind(this)
    }

    handleShow() {
        this.setState({
            show: true,
            category: this.props.category
        })
    }

    handleClose() {
        this.setState({
            show: false
        })
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleForm() {
        const data = {
            category: this.state.category,
            description: this.state.description,
            nominal: parseInt(this.state.nominal),
            date: this.state.date
        }
        this.props.action(data)
        this.setState({
            show: false
        })
    }

    render() {
        return (
            <>
                <button onClick={this.handleShow} className={this.props.variant}>{this.props.text} <i className={this.props.icon}></i></button>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.modalHeading}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control text-capitalize" id="category" name='category' placeholder="Category" value={this.state.category} onChange={this.handleChange} disabled />
                            <label htmlFor="category">Category</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="description" name='description' placeholder="Description" value={this.state.description} onChange={this.handleChange} />
                            <label htmlFor="description">Description</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="number" className="form-control" id="nominal" name='nominal' placeholder="Nominal" value={this.state.nominal} onChange={this.handleChange} />
                            <label htmlFor="nominal">Nominal</label>
                        </div>
                        <div className="form-floating">
                            <input type="date" className="form-control" id="date" name='date' placeholder="Date" value={this.state.date} onChange={this.handleChange} />
                            <label htmlFor="date">Date</label>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className={this.props.variant} onClick={this.handleForm}>Save</button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}
