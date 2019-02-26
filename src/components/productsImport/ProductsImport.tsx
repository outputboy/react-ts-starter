/**
 * OrderImport.tsx
 * Order import component.
 */
'use strict';

// Import the dependent modules
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { connect } from 'react-redux';

// Import the dependent components
import _ from 'lodash';
import ReactFileReader from 'react-file-reader';
import { APIModel } from '../../utils/api/Api.model';

// Import the dependent interfaces
import { ExcelDictionary, ExcelRow } from '../../utils/excel/Excel.interface';
import { ProductsImportPropsInterface, ProductsImportStateInterface } from './ProductsImport.interface';

const base64 = require('base-64');

class ProductsImport extends React.Component<ProductsImportPropsInterface, ProductsImportStateInterface> {
  // constructor
  constructor(props: ProductsImportPropsInterface) {
    super(props);
  }

  // fetch products data
  fetchData = (excelData: ExcelDictionary) => {
    if (this.props.loginDetails) {
      const myHeaders = new Headers();
      const loginDetails = `${this.props.loginDetails.username}:${this.props.loginDetails.password}`;
      const encodeLogin = `Basic ${base64.encode(loginDetails)}`;

      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', encodeLogin);

      // construct body info
      const apiData = { method: 'POST', headers: myHeaders, body: JSON.stringify(excelData) };

      // Request products
      APIModel.request(APIModel.requestAPI('/drupalup/add_product', apiData))
        .promise.then((data: any) => {
          console.log(data);
        })
        .catch((error: {}) => console.log(`Sorry no permission${error}`));
    } else {
      alert('Sorry, please fill in the form.');
    }
  };

  // handle excel upload
  handleFiles = (files: Array<Blob>) => {
    this.readUploadedFileAsText(files).then((result) => {
      if (typeof result === 'string') {
        const allTextLines = result.split(/\r\n|\n/);
        if (
          allTextLines[0].indexOf('sku') === -1 ||
          allTextLines[0].indexOf('price') === -1 ||
          allTextLines[0].indexOf('qty') === -1 ||
          allTextLines[0].indexOf('title') === -1
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
      <Grid container>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant={'title'} gutterBottom>
                Upload Your Products
              </Typography>
              <Typography variant={'subheading'} gutterBottom>
                Please upload Excel csv file only. Fields must include{' '}
              </Typography>
              <Typography gutterBottom>*sku *price *qty *title</Typography>
            </CardContent>
            <CardActions className="card-action">
              <ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'}>
                <Button variant="contained" color="primary">
                  Products Upload
                </Button>
              </ReactFileReader>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (store: any) => {
  return {
    loginDetails: store.loginDetails,
  };
};

export default connect(mapStateToProps)(ProductsImport);
