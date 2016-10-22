import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Grid, Row, Col } from 'react-bootstrap';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import TableMates from 'components/TableMates';
import DialogConfirm from 'components/Dialog/Confirm';
import DialogEdit from 'components/Dialog/Edit';
import DialogCreate from 'components/Dialog/Create';
import MATES_RAW_JSON from 'data/mates';
import './style.scss';

injectTapEventPlugin();


export default class App extends React.Component {

    state = {
        mates: [],
        filterBy: '',
        showModalConfirm: false,
        showModalEdit: false,
        showModalCreate: false,
        itemId: null
    };

    componentDidMount() {
        this.initMates();
    }

    render () {
        const {
            filterBy,
            mates,
            showModalConfirm,
            showModalEdit,
            showModalCreate,
            itemId
        } = this.state;
        return (
            <div>
                <Grid>
                    <Row>
                        <Col sm={4} smOffset={4} >
                            <TextField
                                floatingLabelText="Filter"
                                value={filterBy}
                                onChange={this.onFilterChange}
                                fullWidth={true}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <TableMates
                            onRequestDelete={this.onMateRequestDelete}
                            onRequestEdit={this.onMateRequestEdit}
                            filterBy={filterBy}
                            mates={mates}
                        />
                    </Row>
                </Grid>
                <FloatingActionButton
                    mini={true}
                    style={{'position': 'fixed', 'top': '20px', 'right': '20px'}}
                    onTouchTap={this.openCreateModal}
                >
                    <ContentAdd />
                </FloatingActionButton>
                <DialogConfirm
                    open={showModalConfirm}
                    onClose={this.closeModalConfirm}
                    onConfirm={this.deleteMate}
                    itemId={itemId}
                />
                <DialogEdit
                    open={showModalEdit}
                    onClose={this.closeModalEdit}
                    onSubmit={this.updateMate}
                    model={mates[itemId]}
                />
                <DialogCreate
                    open={showModalCreate}
                    onClose={this.closeModalCreate}
                    onSubmit={this.createMate}
                    model={mates[itemId]}
                />
            </div>
        )
    }

    openCreateModal = () => {
        this.setState({
            showModalCreate: true,
        })
    };

    onMateRequestDelete = (id) => {
        this.setState({
            showModalConfirm: true,
            itemId: id
        })
    };

    onMateRequestEdit = (id) => {
        this.setState({
            showModalEdit: true,
            itemId: id
        })
    };

    updateMate = (mate) => {
        const mates = this.state.mates.slice();
        mates[this.state.itemId] = mate;
        this.setState({
            mates
        })
    };

    createMate = (mate) => {
        const mates = this.state.mates.slice();
        mates.push(mate);
        this.setState({
            mates
        })
    };

    deleteMate = (idx) => {
        const mates = this.state.mates.slice();
        mates.splice(idx, 1);
        this.setState({
            mates
        })
    };

    closeModalConfirm = () => {
        this.setState({
            showModalConfirm: false
        })
    };

    closeModalEdit = () => {
        this.setState({
            showModalEdit: false
        })
    };

    closeModalCreate = () => {
        this.setState({
            showModalCreate: false
        })
    };

    onFilterChange = (e) => {
        this.setState({
            filterBy: e.target.value
        })
    };

    initMates () {
        const mates = MATES_RAW_JSON.map((mate) => {
            return {
                age: mate.age,
                firstName: mate.name.first,
                lastName: mate.name.last,
            }
        });
        this.setState({
            mates
        })
    }
}
