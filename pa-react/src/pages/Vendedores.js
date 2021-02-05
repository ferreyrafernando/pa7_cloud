import ReactDOM from 'react-dom';

import React, { Component } from 'react';
import FooterButtons from '../_components/propios/FooterButtons';
import buttonsJson from "../_helpers/jsondata/buttons-vendedores.json";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { VendedoresService }  from '../_services/VendedoresService';

import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';

import { Toast } from 'primereact/toast';

//export const EmptyPage = () => {
export  class Vendedores extends Component {  
    
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            vendedores: null,
            selectedVendor: null,
        };

        this.columns = [
            { field: 'Codigo', header: 'Codigo' },
            { field: 'Nombre', header: 'NameNombre' },
            { field: 'Sucursal', header: 'Sucursal' },
            { field: 'TeamLeader', header: 'Team Leader' },
            { field: 'Inactivo', header: 'Inactivo' }
        ];

        this.sucursales = [
            { label: 'Casa Central', value: '1' },
            { label: 'Alsina', value: '2' },
            { label: 'Rivadavia', value: '3' }
        ];

        this.teamleaders = [
            { label: 'Team Leader 1', value: '1' },
            { label: 'Team Leader 2', value: '2' },
            { label: 'Team Leader 3', value: '3' }
        ];

        this.editingCellRows = {};
        this.originalRows = {};

        this.vendedoresService = new VendedoresService();

        this.onRowEditInit = this.onRowEditInit.bind(this);
        this.onRowEditCancel = this.onRowEditCancel.bind(this);
        this.onEditorInit = this.onEditorInit.bind(this);
        this.onEditorCancel = this.onEditorCancel.bind(this);
        this.onEditorSubmit = this.onEditorSubmit.bind(this);
        this.statusBodyTemplate = this.statusBodyTemplate.bind(this);
        this.positiveIntegerValidator = this.positiveIntegerValidator.bind(this);
        this.emptyValueValidator = this.emptyValueValidator.bind(this);

        this.onRowSelect = this.onRowSelect.bind(this);
        this.onRowUnselect = this.onRowUnselect.bind(this);
    }

    componentDidMount() {
        this.setState({ loading: true});

        this.fetchVemdedoresData();
    }

    fetchVemdedoresData() {
        //this.productService.getProductsSmall().then(data => this.setState({ [`${productStateKey}`]: data }));

        this.vendedoresService.getVendedores().then(data => 
            this.setState({
                vendedores: data,
                loading: false
            }));

    }

    positiveIntegerValidator(e) {
        const { rowData, field } = e.columnProps;
        return this.isPositiveInteger(rowData[field]);
    }

    emptyValueValidator(e) {
        const { rowData, field } = e.columnProps;
        return rowData[field].trim().length > 0;
    }

    isPositiveInteger(val) {
        let str = String(val);
        str = str.trim();
        if (!str) {
            return false;
        }
        str = str.replace(/^0+/, "") || "0";
        var n = Math.floor(Number(str));
        return n !== Infinity && String(n) === str && n >= 0;
    }

    onEditorInit(e) {
        const { rowIndex: index, field, rowData } = e.columnProps;
        if (!this.editingCellRows[index]) {
            this.editingCellRows[index] = {...rowData};
        }
        this.editingCellRows[index][field] = this.state.vendedores[index][field];
    }

    onEditorCancel(e) {
        const { rowIndex: index, field } = e.columnProps;
        let products = [...this.state.vendedores];
        products[index][field] = this.editingCellRows[index][field];
        delete this.editingCellRows[index][field];

        this.setState({
            products2: products
        });
    }

    onEditorSubmit(e) {
        const { rowIndex: index, field } = e.columnProps;
        delete this.editingCellRows[index][field];
    }


   onRowEditInit(event) {
    this.originalRows[event.index] = { ...this.state.vendedores[event.index] };
    }

    onRowEditCancel(event) {
        let vendors = [...this.state.vendedores];
        vendors[event.index] = this.originalRows[event.index];
        delete this.originalRows[event.index];

        this.setState({ vendedores: vendors });
    }

    onEditorValueChange(productKey, props, value) {
        let updatedProducts = [...props.value];
        updatedProducts[props.rowIndex][props.field] = value;
        this.setState({ [`${productKey}`]: updatedProducts });
    }

    inputTextEditor(productKey, props, field) {
        return <InputText type="text" value={props.rowData[field]} onChange={(e) => this.onEditorValueChange(productKey, props, e.target.value)} />;
    }

   codigoEditor(productKey, props) {
    return this.inputTextEditor(productKey, props, 'Codigo');
    }

    nombreEditor(productKey, props) {
        return this.inputTextEditor(productKey, props, 'Nombre');
    }

    inactiveEditor(productKey, props) {
        return this.inputTextEditor(productKey, props, 'Inactivo');
    }

    sucursalEditor(productKey, props) {
        return (
            <Dropdown value={props.rowData['Sucursal']} options={this.sucursales} optionLabel="label" optionValue="value"
                onChange={(e) => this.onEditorValueChange(productKey, props, e.value)} style={{ width: '100%' }} placeholder="Seleccione Sucursal"
                itemTemplate={(option) => {
                    return <span>{option.label}</span>
                }} />
        );
    }

    teamLeaderEditor(productKey, props) {
        return (
            <Dropdown value={props.rowData['TeamLeader']} options={this.teamleaders} optionLabel="label" optionValue="value"
                onChange={(e) => this.onEditorValueChange(productKey, props, e.value)} style={{ width: '100%' }} placeholder="Seleccione Team Leader"
                itemTemplate={(option) => {
                    return <span>{option.label}</span>
                }} />
        );
    }

    statusBodyTemplate(rowData) {
        //return this.getStatusLabel(rowData.inventoryStatus);
    }

    onRowSelect(event) {
        this.toast.show({ severity: 'info', summary: 'Vendedor Seleccionado', detail: 'Name: ' + event.data.Nombre, life: 3000 });
    }

    onRowUnselect(event) {
       // this.toast.show({ severity: 'warn', summary: 'Vendedor Unselected', detail: 'Name: ' + event.data.Nombre, life: 3000 });
    }

    render() {
    return (
        <div className="p-grid">
            <Toast ref={(el) => this.toast = el} />
            <div className="p-col-12">
                <div className="card">
                    <h2>Vendedores</h2>
                    <p></p>
                    <DataTable value={this.state.vendedores}  scrollable scrollHeight="500px" loading={this.state.loading} className="p-datatable-sm" editMode="row" dataKey="Codigo" onRowEditInit={this.onRowEditInit} onRowEditCancel={this.onRowEditCancel} selection={this.state.selectedVendor} onSelectionChange={e => this.setState({ selectedVendor: e.value })} selectionMode="single">
                        <Column field="Codigo" header="Codigo" editor={(props) => this.codigoEditor('vendedores', props)}></Column>
                        <Column field="Nombre" header="Nombre" editor={(props) => this.nombreEditor('vendedores', props)}></Column>
                        <Column field="Sucursal" header="Sucursal"  editor={(props) => this.sucursalEditor('vendedores', props)}></Column>
                        <Column field="TeamLeader" header="Team Leader"  editor={(props) => this.teamLeaderEditor('vendedores', props)}></Column>
                        <Column field="Inactivo" header="Inactivo" editor={(props) => this.inactiveEditor('vendedores', props)}></Column>
                        <Column rowEditor headerStyle={{ width: '7rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
                    </DataTable>
                    <FooterButtons className="p-mt-6"
                       btns={buttonsJson.buttons}
                     />
                </div>
            </div>
        </div>
    )
   };
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Vendedores />, rootElement);