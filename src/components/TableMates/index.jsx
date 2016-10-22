import React, { PropTypes } from 'react';
import Reactable, { unsafe } from 'reactable';
import './style.scss';

const Table = Reactable.Table,
      Thead = Reactable.Thead,
      Th = Reactable.Th,
      Tr = Reactable.Tr,
      Td = Reactable.Td;

export default class TableMates extends React.Component {
    render () {
        return (
            <Table className="table-mates"
                   filterable={['firstName', 'lastName', 'age']}
                   noDataText="No results."
                   filterBy={this.props.filterBy}
                   hideFilterInput
            >
                <Thead>
                <Th column="number" className="">#</Th>
                <Th column="firstName">First Name</Th>
                <Th column="lastName">Last Name</Th>
                <Th column="age">Age</Th>
                <Th column="actions">Actions</Th>
                </Thead>
                {
                    this.props.mates.map((mate, idx) =>
                        <Tr key={idx}>
                            <Td column="number">{idx + 1}</Td>
                            <Td column="firstName">{mate.firstName}</Td>
                            <Td column="lastName">{mate.lastName}</Td>
                            <Td column="age">{mate.age}</Td>
                            <Td column="actions">
                                <div>
                                    <a href="#" data-id={idx} onClick={this.onRequestEdit}>
                                        Edit
                                    </a>
                                    &nbsp;
                                    <a href="#" data-id={idx} onClick={this.onRequestDelete}>
                                        Delete
                                    </a>
                                </div>
                            </Td>
                        </Tr>
                    )
                }
            </Table>
        );
    }
    onRequestDelete = (e) => {
        this.props.onRequestDelete(e.target.getAttribute('data-id'));
    };
    onRequestEdit = (e) => {
        this.props.onRequestEdit(e.target.getAttribute('data-id'));
    }
}

TableMates.propTypes = {
    mates: PropTypes.array.isRequired,
    onRequestDelete: PropTypes.func.isRequired,
    onRequestEdit: PropTypes.func.isRequired,
};


