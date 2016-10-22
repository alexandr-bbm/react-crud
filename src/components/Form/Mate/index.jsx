import React, {PropTypes} from 'react';
import Formsy from 'formsy-react';
import {FormsyText} from 'formsy-material-ui/lib';
import RaisedButton from 'material-ui/RaisedButton';

Formsy.addValidationRule('Age', function (values, value) {
    return Number(value) > 0 && Number(value) <= 120;
});

export default class FormMate extends React.Component {

    static propTypes = {
        onValid: PropTypes.func,
        onInvalid: PropTypes.func,
        onValidSubmit: PropTypes.func,
        model: PropTypes.object,
    };

    state = {
        model: this.props.model || {
            firstName: '',
            lastName: '',
            age: '',
        },
        canSubmit: false
    };

    errorMessages = {
        wordsError: 'Please, type correct words.',
        numberError: 'Please, provide a correct age.'
    };

    componentWillReceiveProps (nextProps) {
        if (nextProps.model !== this.state.model) {
            this.setState({model: nextProps.model});
        }
    }

    render () {
        const {model, canSubmit} = this.state;
        const {onValid, onInvalid, onValidSubmit} = this.props;
        const {wordsError, numberError} = this.errorMessages;
        return (
            <Formsy.Form
                onValid={this.enableButton}
                onInvalid={this.disableButton}
                onValidSubmit={onValidSubmit}
            >
                <FormsyText
                    floatingLabelText='First Name'
                    value={model.firstName}
                    name="firstName"
                    fullWidth={true}
                    validations="isWords"
                    validationError={wordsError}
                    required
                    autoComplete="off"
                    updateImmediately
                />
                <FormsyText
                    floatingLabelText='Last Name'
                    value={model.lastName}
                    name="lastName"
                    fullWidth={true}
                    validations="isWords"
                    validationError={wordsError}
                    required
                    autoComplete="off"
                    updateImmediately
                />
                <FormsyText
                    floatingLabelText='Age'
                    name="age"
                    value={model.age}
                    fullWidth={true}
                    validations="Age"
                    validationError={numberError}
                    required
                    autoComplete="off"
                    updateImmediately
                />
                <div style={{marginTop: '15px'}}>
                    <RaisedButton
                        label="Save changes"
                        primary={true}
                        onTouchTap={this.onSubmit}
                        disabled={!canSubmit}
                        type="submit"
                    />
                </div>
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
}
