import React, { PropTypes } from 'react';
import Reactable from 'reactable';
import './style.scss';

const Table = Reactable.Table,
      Thead = Reactable.Thead,
      Th = Reactable.Th;

export default class TableMates extends React.Component {
    render () {
        return (
            <Table className="table-mates"
                   data={this.props.mates}
                   sortable={true}
                   filterable={['firstName', 'lastName', 'age']}
                   defaultSort={{column: 'lastName'}}
                   noDataText="No results."
            >
                <Thead>
                <Th column="number">#</Th>
                <Th column="firstName">First Name</Th>
                <Th column="lastName">Last Name</Th>
                <Th column="age">Age</Th>
                <Th>Actions</Th>
                </Thead>
            </Table>
        );
    }
}

TableMates.propTypes = {
  mates: PropTypes.array.isRequired
};


