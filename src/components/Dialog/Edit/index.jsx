import React, {PropTypes} from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

import FormMate from 'components/Form/Mate';

export default class DialogEdit extends React.Component {

    static propTypes = {
        open: PropTypes.bool.isRequired,
        onSubmit: PropTypes.func.isRequired,
        onClose: PropTypes.func.isRequired,
        model: PropTypes.object,
    };

    render () {
        const {model, open, onClose} = this.props;
        const actions = [
            <FlatButton
                label="Cancel"
                onTouchTap={onClose}
                style={{'marginRight': '15px'}}
            />
        ];
        return (
            <Dialog
                actions={actions}
                open={open}
                onRequestClose={onClose}
                title='Update the mate'
                contentStyle={{'width': '600px'}}
                autoScrollBodyContent={true}
            >
                <FormMate
                    model={model}
                    onValid={this.enableButton}
                    onInvalid={this.disableButton}
                    onValidSubmit={this.onSubmit}
                />
            </Dialog>
        )
    }

    onSubmit = (model) => {
        this.props.onSubmit(model);
        this.props.onClose();
    };
}
