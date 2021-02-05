import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../index.css';
import ReactDOM from 'react-dom';

import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { CustomerService } from '../_services/CustomerService';
//import './DataTableDemo.css';

export default class DataTableScrollDemo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            customers: [],
            virtualCustomers: [],
            inmemoryData: [],
            lazyTotalRecords: 0,
            loading: false,
            virtualLoading: false
        };

        this.customerService = new CustomerService();
        this.nameBodyTemplate = this.nameBodyTemplate.bind(this);
        this.onVirtualScroll = this.onVirtualScroll.bind(this);
    }

    componentDidMount() {
        this.setState({ loading: true, virtualLoading: true });

        this.customerService.getCustomersLarge().then(data => {
            this.setState({
                customers: data,
                loading: false
            });
        });
        this.customerService.getCustomersXLarge().then(data => this.setState({ inmemoryData: data }, this.loadVirtualCustomers));

        this.frozenValue = [
            {
                id: 1255,
                name: "James McAdams",
                country: {
                    name: "United States",
                    code: "us"
                },
                company: "McAdams Consulting Ltd",
                date: "2014-02-13",
                status: "qualified",
                activity: 23,
                representative: {
                    name: "Ioni Bowcher",
                    image: "ionibowcher.png"
                }
            },
            {
                id: 5135,
                name: "Geraldine Bisset",
                country: {
                    name: "France",
                    code: "fr"
                },
                company: "Bisset Group",
                status: "proposal",
                date: "2019-05-05",
                activity: 0,
                representative: {
                    name: "Amy Elsner",
                    image: "amyelsner.png"
                }
            }
        ];
    }

    loadVirtualCustomers() {
        this.setState({
            virtualCustomers: this.loadChunk(0, 40),
            lazyTotalRecords: 500,
            virtualLoading: false
        });
    }

    loadChunk(index, length) {
        let chunk = [];
        for (let i = 0; i < length; i++) {
            chunk[i] = { ...this.state.inmemoryData[i]};
        }

        return chunk;
    }

    onVirtualScroll(event) {
        //for demo purposes keep loading the same dataset
        //in a real production application, this data should come from server by building the query with LazyLoadEvent options
        setTimeout(() => {
            //last chunk
            if (event.first === 480) {
                this.setState({
                    virtualCustomers: this.loadChunk(event.first, 20)
                });
            }
            else {
                this.setState({
                    virtualCustomers: this.loadChunk(event.first, event.rows)
                });
            }
        }, 250);
    }

    loadingText() {
        return <span className="loading-text"></span>;
    }

    nameBodyTemplate(rowData) {
        return <span style={{ fontWeight: '700' }}>{rowData.name}</span>;
    }

    render() {
        return (
            <div className="datatable-scroll-demo">
                <div className="card">
                    <h5>Vertical</h5>
                    <DataTable value={this.state.customers} scrollable scrollHeight="200px" loading={this.state.loading}>
                        <Column field="name" header="Name"></Column>
                        <Column field="country.name" header="Country"></Column>
                        <Column field="representative.name" header="Representative"></Column>
                        <Column field="status" header="Status"></Column>
                    </DataTable>
                </div>

                <div className="card">
                    <h5>Virtual Scroll</h5>
                    <DataTable value={this.state.virtualCustomers} scrollable scrollHeight="200px" lazy rows={20} loading={this.state.virtualLoading}
                        virtualScroll virtualRowHeight={45} onVirtualScroll={this.onVirtualScroll} totalRecords={this.state.lazyTotalRecords}>
                        <Column field="name" header="Name" loadingBody={this.loadingText}></Column>
                        <Column field="country.name" header="Country" loadingBody={this.loadingText}></Column>
                        <Column field="representative.name" header="Representative" loadingBody={this.loadingText}></Column>
                        <Column field="status" header="Status" loadingBody={this.loadingText}></Column>
                    </DataTable>
                </div>

                <div className="card">
                    <h5>Horizontal and Vertical</h5>
                    <DataTable value={this.state.customers} scrollable scrollHeight="200px" style={{ width: '600px' }} loading={this.state.loading}>
                        <Column field="id" header="Id" headerStyle={{ width: '250px' }} columnKey="id"></Column>
                        <Column field="name" header="Name" headerStyle={{ width: '250px' }} columnKey="name"></Column>
                        <Column field="country.name" header="Country" headerStyle={{ width: '250px' }} columnKey="country"></Column>
                        <Column field="date" header="Date" headerStyle={{ width: '250px' }} columnKey="date"></Column>
                        <Column field="company" header="Company" headerStyle={{ width: '250px' }} columnKey="company"></Column>
                        <Column field="status" header="Status" headerStyle={{ width: '250px' }} columnKey="status"></Column>
                        <Column field="activity" header="Activity" headerStyle={{ width: '250px' }} columnKey="activity"></Column>
                        <Column field="representative.name" header="Representative" headerStyle={{ width: '250px' }} columnKey="representative"></Column>
                    </DataTable>
                </div>

                <div className="card">
                    <h5>Frozen Rows</h5>
                    <DataTable value={this.state.customers} frozenValue={this.frozenValue} scrollable scrollHeight="200px" loading={this.state.loading}>
                        <Column field="name" header="Name"></Column>
                        <Column field="country.name" header="Country"></Column>
                        <Column field="representative.name" header="Representative"></Column>
                        <Column field="status" header="Status"></Column>
                    </DataTable>
                </div>

                <div className="card">
                    <h5>Frozen Columns</h5>
                    <DataTable value={this.state.customers} scrollable scrollHeight="200px" frozenWidth="300px" loading={this.state.loading}>
                        <Column field="name" header="Name" body={this.nameBodyTemplate} headerStyle={{ width: '300px' }} columnKey="name" frozen></Column>
                        <Column field="id" header="Id" headerStyle={{ width: '300px' }} columnKey="id"></Column>
                        <Column field="country.name" header="Country" headerStyle={{ width: '300px' }} columnKey="country"></Column>
                        <Column field="date" header="Date" headerStyle={{ width: '300px' }} columnKey="date"></Column>
                        <Column field="company" header="Country" headerStyle={{ width: '300px' }} columnKey="company"></Column>
                        <Column field="status" header="Status" headerStyle={{ width: '300px' }} columnKey="status"></Column>
                        <Column field="activity" header="Activity" headerStyle={{ width: '300px' }} columnKey="activity"></Column>
                        <Column field="representative.name" header="Representative" headerStyle={{ width: '300px' }} columnKey="representative"></Column>
                    </DataTable>
                </div>
            </div>
        );
    }
}
                
const rootElement = document.getElementById("root");
ReactDOM.render(<DataTableScrollDemo />, rootElement);