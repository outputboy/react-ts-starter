/**
 * OrderImport.tsx
 * Order import component.
 */
'use strict';

// Import the dependent modules
import * as React from 'react';

// Import the dependent components
import _ from 'lodash';
import ReactFileReader from 'react-file-reader';
import { APIModel } from '../../utils/api/Api.model';
import Sidebar from '../sidebar/Sidebar';

// Import the dependent interfaces
import { ExcelDictionary, ExcelRow } from '../../utils/excel/Excel.interface';
import { ProductsImportPropsInterface, ProductsImportStateInterface } from './ProductsImport.interface';
const base64 = require('base-64');

class OrderImport extends React.Component<ProductsImportPropsInterface, ProductsImportStateInterface> {
  // constructor
  constructor(props: ProductsImportPropsInterface) {
    super(props);
  }

  // fetch products data
  fetchData = (excelData: ExcelDictionary) => {
    const myHeaders = new Headers();

    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', 'dsknight@live.com.au');

    // Request products
    fetch(`${APIModel.getServerPath()}/drupalup/add-order`, {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(excelData),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  // handle excel upload
  handleFiles = (files: Array<Blob>) => {
    this.readUploadedFileAsText(files).then((result) => {
      if (typeof result === 'string') {
        const allTextLines = result.split(/\r\n|\n/);
        if (
          allTextLines[0].indexOf('serial_number') === -1 ||
          allTextLines[0].indexOf('first_name') === -1 ||
          allTextLines[0].indexOf('last_name') === -1 ||
          allTextLines[0].indexOf('address1') === -1 ||
          allTextLines[0].indexOf('suburb') === -1 ||
          allTextLines[0].indexOf('state') === -1 ||
          allTextLines[0].indexOf('postcode') === -1 ||
          allTextLines[0].indexOf('telephone') === -1 ||
          allTextLines[0].indexOf('sku') === -1 ||
          allTextLines[0].indexOf('qty') === -1 ||
          allTextLines[0].indexOf('comment') === -1
        ) {
          alert('not enough data');
        } else {
          // Convert csv to array
          const headers = allTextLines[0].split(',');
          const rows: Array<ExcelRow> = [];
          for (let i = 1; i < allTextLines.length; i++) {
            const data = allTextLines[i].split(',');
            if (data.length === headers.length) {
              // declear object with signiture
              const row: ExcelRow = {};
              for (let j = 0; j < headers.length; j++) {
                row[headers[j].trim()] = data[j].trim();
              }
              rows.push(row);
            }
          }

          // Get and group by serial numbers
          const groupedBySerial: ExcelDictionary = _.groupBy(rows, 'serial_number');
          this.fetchData(groupedBySerial);
        }
      } else {
        console.log('Excel not string');
      }
    });
  };

  // Promise read upload excel
  readUploadedFileAsText<T>(inputFile: Array<Blob>): Promise<T> {
    const temporaryFileReader = new FileReader();

    return new Promise((resolve: Function, reject: Function) => {
      temporaryFileReader.onerror = () => {
        temporaryFileReader.abort();
        reject(new DOMException('Problem parsing input file.'));
      };

      temporaryFileReader.onload = () => {
        resolve(temporaryFileReader.result);
      };
      temporaryFileReader.readAsText(inputFile[0]);
    });
  }

  // render all product card
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col m3 s12">
            <Sidebar />
          </div>
          <div className="col m9 s12">
            <div className="card blue-grey darken-1">
              <div className="card-content white-text">
                <span className="card-title">Upload Your Orders</span>
                <p>Please upload Excel csv file only. Fields must include </p>
                <p>
                  *serial_number *first_name *last_name *address1 *suburb *state *postcode *telephone *sku *qty *comment
                </p>
              </div>
              <div className="card-action">
                <ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'}>
                  <button className="blue btn">Upload</button>
                </ReactFileReader>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderImport;
