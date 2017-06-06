import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {memberAddProcess} from '../actions';
import MemberCreate from '../components/Create';
import Loader from 'lib/Loader';
import Notification from 'lib/Notification';
import initialState from '../constants/initialState';

class MemberCreateContainerClass extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        const memberData = this.memberCreateComponentRef.getMemberCreateObj();
        console.log('container memberData', memberData);
        this.props.getMemberCreateObjOnSubmit(memberData);
    }

    showLoader() {
        let shouldShowLoader = this.props.showLoader === true ? <Loader /> : null;

        return shouldShowLoader;
    }

    handleFormValidation() {
        console.log('this.props.emptyInput ====>>>', this.props.emptyInput);
        let errorMessages = [];

        if(this.props.emptyInput !== undefined) {
            this.props.emptyInput.map(el => {
                switch(el) {
                    case 'birthDate':
                        errorMessages.push('Birthdate');
                        break;

                    case 'maritalStatus':
                        errorMessages.push('Marital status');
                        break;

                    case 'bloodGroup':
                        errorMessages.push('Blood group');
                        break;

                    case 'certificateType':
                        errorMessages.push('Certificate type');
                        break;

                    case 'membershipDate':
                        errorMessages.push('Membership date');
                        break;

                    case 'memberImage':
                        errorMessages.push('Photo of the member');
                        break;

                    default:
                        errorMessages;
                }
            });
        }

        return errorMessages;
    }

    showNotification() {
        let formValidationErrorArray = this.handleFormValidation();
        let defaultText = 'Please provide ';
        let displayNotification =  null;

        if (formValidationErrorArray.length > 0) {
            displayNotification = <Notification
                                    notification={defaultText + formValidationErrorArray.join(', ')}
                                />
        }

        return displayNotification;
    }

    componentDidUpdate() {
        if(this.props.fieldReset !== undefined) {
            console.log('componentDidUpdate called');
            this.memberCreateComponentRef.setState(
                initialState
            )
        }
    }

    render() {
        console.log('this.handleFormValidation() ===>>>', this.handleFormValidation());
        return (
            <div>
                <MemberCreate
                    handleSubmit={this.handleSubmit}
                    ref={el => this.memberCreateComponentRef = el}
                />
                {this.showLoader()}
                {this.showNotification()}
            </div>
        );
    }
}

MemberCreateContainerClass.propTypes = {
    getMemberCreateObjOnSubmit: PropTypes.func,
    showLoader: PropTypes.bool,
    emptyInput: PropTypes.any,
    fieldReset: PropTypes.bool
};

const mapStateToProps = (state) => {
    return {
        showLoader: state.addMember.showLoader,
        emptyInput: state.addMember.emptyInput,
        fieldReset: state.addMember.fieldReset
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getMemberCreateObjOnSubmit: memberData => {
            dispatch(memberAddProcess(memberData));
        }
    };
};

const MemberCreateContainer = connect(mapStateToProps, mapDispatchToProps)(MemberCreateContainerClass);

export default MemberCreateContainer;