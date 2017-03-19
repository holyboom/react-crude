import React, {Component} from 'react';

import Searchbox from '../ui/Searchbox';
import ListTable from '../ui/Table';

import '../../../node_modules/normalize.css/normalize.css';
import '../../../src/stylesheet/base/base.css';
import Styles from '../../../src/modules/members/components/css/List.css';

export default class MemberList extends Component {
    render() {
        return (
            <div>
                <div>
                    <h1>Members <span>/</span> <span>List</span></h1>
                </div>
                <Searchbox />
                <div style={{marginTop: '25px'}}>
                    <ListTable />
                </div>
            </div>
        );
    }
}