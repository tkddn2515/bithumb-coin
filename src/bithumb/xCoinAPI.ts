import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { HttpException, Logger } from '@nestjs/common';
import * as hmacSHA512 from 'crypto-js/hmac-sha512';
import { Method } from './enum/method';
import * as query_string from 'query-string';

export class XCoinAPI {
  constructor(
    private readonly api_key: String,
    private readonly api_secret: String,
    private readonly httpService: HttpService,
  ) {
    this.apiUrl = 'https://api.bithumb.com';
  }

  private readonly apiUrl: string;

  async xcoinApiCall(
    method: Method,
    endPoint: string,
    params: object = undefined,
  ): Promise<{ status; statusText; data }> {
    let rgParams = {
      // endPoint: endPoint,
    };

    if (params) {
      for (let o in params) {
        rgParams[o] = params[o];
      }
    }

    const api_host = this.apiUrl + endPoint;
    const headers = this._getHttpHeaders(
      endPoint,
      rgParams,
      this.api_key,
      this.api_secret,
    );
    
    let result;

    switch (method) {
      case Method.Get:
        result = await firstValueFrom(
          this.httpService.get(api_host, { headers }),
        );
        break;
      case Method.Post:
        result = await firstValueFrom(
          this.httpService.post(api_host, query_string.stringify(rgParams), { headers })
        );
        break;
    }
    return result.data;
  }

  _getHttpHeaders(endPoint, rgParams, api_key, api_secret) {
    let nNonce = new Date().getTime();
    const requestSignature = `${endPoint}${String.fromCharCode(0)}${query_string.stringify(rgParams)}${String.fromCharCode(0)}${nNonce}`;
    let apiSign = Buffer.from(hmacSHA512(requestSignature, api_secret).toString(), "utf8").toString('base64');
    return {
      'Api-Sign': apiSign,
      'Api-Nonce': nNonce,
      'Api-Key': api_key
    };
  }
}