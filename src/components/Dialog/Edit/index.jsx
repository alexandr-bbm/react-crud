import React, {PropTypes} from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import Formsy from 'formsy-react';
import { FormsyText } from 'formsy-material-ui/lib';

Formsy.addValidationRule('Age', function (values, value) {
    return Number(value) > 0 && Number(value) <= 120;
});

export default class DialogEdit extends React.Component {

    static propTypes = {
        open: PropTypes.bool.isRequired,
        onSubmit: PropTypes.func.isRequired,
        onClose: PropTypes.func.isRequired,
        initialItem: PropTypes.object,
    };

    state = {
        item: this.props.initialItem,
        canSubmit: false,
    };

    errorMessages = {
        wordsError: 'Please, type correct words.',
        numberError: 'Please, provide a correct age.'
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.initialItem !== this.state.item) {
            this.setState({ item: nextProps.initialItem });
        }
    }

    render () {
        const {open} = this.props;
        const {item, canSubmit} = this.state;
        if (! item) {
            return null;
        }
        const actions = [
            <FlatButton
                label="Cancel"
                onTouchTap={this.onClose}
                style={{'marginRight': '15px'}}
            />,
            <RaisedButton
                label="Save changes"
                primary={true}
                onTouchTap={this.onSubmit}
                disabled={!canSubmit}
            />
        ];
        return (
            <Dialog
                actions={actions}
                open={open}
                onRequestClose={this.onClose}
                title='Update the mate'
                contentStyle={{'width': '600px'}}
                autoScrollBodyContent={true}
            >
                {this.renderForm()}
            </Dialog>
        )
    }

    renderForm () {
        const { item } = this.state;
        const { wordsError, numberError } = this.errorMessages;
        return (
            <Formsy.Form
                onValid={this.enableButton}
                onInvalid={this.disableButton}
                onValidSubmit={this.onSubmit}
            >
                <FormsyText
                    floatingLabelText='First Name'
                    value={item.firstName}
                    name="firstName"
                    onChange={this.onFieldChange}
                    fullWidth={true}
                    validations="isWords"
                    validationError={wordsError}
                    required
                />
                <FormsyText
                    floatingLabelText='Last Name'
                    value={item.lastName}
                    name="lastName"
                    onChange={this.onFieldChange}
                    fullWidth={true}
                    validations="isWords"
                    validationError={wordsError}
                    required
                />
                <FormsyText
                    floatingLabelText='Age'
                    name="age"
                    value={item.age}
                    onChange={this.onFieldChange}
                    fullWidth={true}
                    validations="Age"
                    validationError={numberError}
                    required
                />
            </Formsy.Form>
        )
    }

    enableButton = () => {
        this.setState({
            canSubmit: true,
        });
    };

    disableButton = () => {
        this.setState({
            canSubmit: false,
        });
    };


    onFieldChange = (e) => {
        const prop = e.target.getAttribute('name');
        this.setState({
            item: {
                ...this.state.item,
                [prop]: e.target.value
            }
        })
    };

    onClose = () => {
        this.setState({
            item: this.props.initialItem
        });
        this.props.onClose();
    };

    onSubmit = () => {
        this.props.onSubmit(this.state.item);
        this.props.onClose();
    };
}
