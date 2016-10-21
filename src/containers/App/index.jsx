import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Container } from 'react-grid-system';

import TableMates from 'components/TableMates';
import MATES_RAW_JSON from 'data/mates';
import './style.scss';

injectTapEventPlugin();


export default class App extends React.Component {

    state = {
        mates: [],
    };

    componentDidMount() {
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

    render () {
        return (
            <Container>
                <TableMates mates={this.state.mates} />
            </Container>
        )

    }
}
