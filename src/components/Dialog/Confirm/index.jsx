import React, {PropTypes} from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';


export default class DialogConfirm extends React.Component {

    static propTypes = {
        open: PropTypes.bool.isRequired,
        onConfirm: PropTypes.func.isRequired,
        onClose: PropTypes.func.isRequired,
        itemId: PropTypes.string,
    };

    onConfirm = () => {
        const {onConfirm, onClose, itemId} = this.props;
        onConfirm(itemId);
        onClose();
    };

    render () {
        const {open, onClose} = this.props;
        const actions = [
            <FlatButton
                label="Cancel"
                onTouchTap={onClose}
                style={{'marginRight': '15px'}}
            />,
            <RaisedButton
                label="Delete"
                primary={true}
                onTouchTap={this.onConfirm}
            />,
        ];
        return (
            <Dialog
                actions={actions}
                modal={false}
                open={open}
                onRequestClose={onClose}
                contentStyle={{'width': '600px'}}
                title="Are you sure?"
            >
                The action will delete the mate.
            </Dialog>
        )
    }
}
