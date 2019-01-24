/**
 * api.ts
 * API Model Class.
 */
'use strict';
// Import the dependent interfaces.
import { RequestType } from './Api.enum';
import { RequestInterface } from './Api.interface';

/**
 * API Class.
 * @class APIModel
 */
export class APIModel {
  // convert a response to JSON data
  static getJSON<T>(response: Response): Promise<T> {
    return response.json();
  }

  // perform a request to the server api
  static async requestAPI<T>(path: string, data: RequestInit): Promise<T> {
    // Set the default request headers.
    const defaults: RequestInit = data;

    // Define the api path to be requested.
    path = `${RequestType.URL}${path}`;

    // Perform the fetch of the data.
    return fetch(path, defaults)
      .then(APIModel.getJSON)
      .then((response: {}) => {
        // Return the data in the generic form requested.
        return response as T;
      });
  }

  /**
   * Provides a request wrapper supporting the cancellation of promise streams.
   * @method request
   *
   * @param { Promise<T>} promise - the generic promise.
   *
   * @return RequestInterface<T>
   */
  static request<T>(promise: Promise<T>): RequestInterface<T> {
    // Define the cancellation flag used for determining which promise
    // resolution is used.
    let hasCanceled = false;

    // Return the RequestInterface object with a promise property and cancel
    // function.
    return {
      promise: new Promise((resolve: Function, reject: Function) => {
        promise.then(
          (val: T) => {
            // If cancellation flag has been set to true, we should reject the
            // request. The request rejection ensures a setState operation
            // isn't fired after a component has been unmounted.
            hasCanceled ? reject({ isCanceled: true }) : resolve(val);
          },
          (error: {}) => {
            // @Todo: Introduce an error model to handle errors and submit
            // logs.
            hasCanceled ? reject({ isCanceled: true }) : reject(error);
          },
        );
      }),
      cancel() {
        // Updates the cancellation flag to prevent promises being resolved.
        // With this flag, the promise will be rejected.
        hasCanceled = true;
      },
    };
  }
}
