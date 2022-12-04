import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { XCoinAPI } from './xCoinAPI';
import { Method } from './enum/method';

@Injectable()
export class BithumbService {
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.logger = new Logger(BithumbService.name);
    this.xCoinAPI = new XCoinAPI(
      this.configService.get<string>('CONNECT_KEY'),
      this.configService.get<string>('SECRET_KEY'),
      this.httpService,
    );
  }

  private readonly logger: Logger;
  private readonly xCoinAPI: XCoinAPI;
  //#region PUBLIC API

  /**
   * 현재가 정보 조회 (ALL)
   * 요청 당시 빗썸 거래소 가상자산 현재가 정보를 제공합니다.
   * @param payment_currency 결제 통화(마켓), 입력값 : KRW 혹은 BTC
   */
  async getTickerAll(payment_currency: string = 'KRW'): Promise<any> {
    const res = await this.xCoinAPI.xcoinApiCall(
      Method.Get,
      `/public/ticker/ALL_${payment_currency}`,
    );
    return res;
  }

  /**
   * 현재가 정보 조회 (자산별)
   * 요청 당시 빗썸 거래소 가상자산 현재가 정보를 제공합니다.
   * @param order_currency 주문 통화(코인), ALL(전체), 기본값 : BTC
   * @param payment_currency 결제 통화(마켓), 입력값 : KRW 혹은 BTC
   */
  async getTickerOrder(
    order_currency: string = 'DVI',
    payment_currency: string = 'KRW',
  ): Promise<any> {
    const res = await this.xCoinAPI.xcoinApiCall(
      Method.Get,
      `/public/ticker/${order_currency}_${payment_currency}`,
    );
    return res;
  }

  /**
   * 호가 정보 조회 (ALL)
   * 거래소 호가 정보를 제공합니다.
   * @param payment_currency 결제 통화(마켓), 입력값 : KRW 혹은 BTC
   */
  async getOrderbookAll(payment_currency: string = 'KRW'): Promise<any> {
    const res = await this.xCoinAPI.xcoinApiCall(
      Method.Get,
      `/public/orderbook/ALL_${payment_currency}`,
    );
    return res;
  }

  /**
   * 호가 정보 조회 (자산별)
   * 거래소 호가 정보를 제공합니다.
   * @param order_currency 주문 통화(코인), ALL(전체), 기본값 : BTC
   * @param payment_currency 결제 통화(마켓), 입력값 : KRW 혹은 BTC
   */
  async getOrderbookOrder(
    order_currency: string = 'DVI',
    payment_currency: string = 'KRW',
  ): Promise<any> {
    const res = await this.xCoinAPI.xcoinApiCall(
      Method.Get,
      `/public/orderbook/${order_currency}_${payment_currency}`,
    );
    return res;
  }

  /**
   * 최근 체결 내역
   * 빗썸 거래소 가상자산 거래 체결 완료 내역을 제공합니다.
   * @param order_currency 주문 통화(코인), 기본값 : BTC
   * @param payment_currency 결제 통화(마켓), 입력값 : KRW 혹은 BTC
   */
  async getTransactionHistory(
    order_currency: string = 'DVI',
    payment_currency: string = 'KRW',
  ): Promise<any> {
    const res = await this.xCoinAPI.xcoinApiCall(
      Method.Get,
      `/public/transaction_history/${order_currency}_${payment_currency}`,
    );
    return res;
  }

  /**
   * 입/출금 지원 현황 (ALL)
   * 가상 자산의 입/출금 현황 정보를 제공합니다.
   */
  async getAssetsstatusAll(): Promise<any> {
    const res = await this.xCoinAPI.xcoinApiCall(
      Method.Get,
      `/public/assetsstatus/ALL`,
    );
    return res;
  }

  /**
   * 입/출금 지원 현황 (자산별)
   * 가상 자산의 입/출금 현황 정보를 제공합니다.
   * @param order_currency 주문 통화(코인), ALL(전체), 기본값 : BTC
   */
  async getAssetsstatusOrder(order_currency: string = 'DVI'): Promise<any> {
    const res = await this.xCoinAPI.xcoinApiCall(
      Method.Get,
      `/public/assetsstatus/${order_currency}`,
    );
    return res;
  }

  /**
   * BTCI (빗썸지수)
   * 빗썸 지수 (BTMI,BTAI) 정보를 제공합니다.
   */
  async getBtci(): Promise<any> {
    const res = await this.xCoinAPI.xcoinApiCall(Method.Get, `/public/btci`);
    return res;
  }
  //#endregion

  //#region PRIVATE API (INFO)
  /**
   * 회원 정보 조회
   * 회원 정보 및 코인 거래 수수료 정보를 제공합니다.
   * @param order_currency 주문 통화 (코인)
   * @param payment_currency 결제 통화 (마켓) 입력값 : KRW 혹은 BTC
   */
  async postAccount(
    order_currency: string = 'DVI',
    payment_currency: string = 'KRW',
  ): Promise<any> {
    const res = await this.xCoinAPI.xcoinApiCall(Method.Post, '/info/account', {
      order_currency,
      payment_currency,
    });
    return res;
  }

  /**
   * 보유자산 조회
   * 회원이 보유한 자산 정보를 제공합니다.
   * @param currency 가상자산 영문 코드, ALL(전체), 기본값 : BTC
   */
  async postBalance(currency: string = 'DVI'): Promise<any> {
    const res = await this.xCoinAPI.xcoinApiCall(Method.Post, '/info/balance', {
      currency,
    });
    return res;
  }

  /**
   * 입금지갑 주소 조회
   * 회원의 코인 입금 지갑 주소를 제공합니다.
   * @param currency 가상자산 영문 코드, 기본값 : BTC
   */
  async postWalletAddress(currency: string = 'DVI'): Promise<any> {
    const res = await this.xCoinAPI.xcoinApiCall(
      Method.Post,
      '/info/wallet_address',
      {
        currency,
      },
    );
    return res;
  }

  /**
   * 최근 거래정보 조회
   * 회원의 가상자산 거래 정보를 제공합니다.
   * @param order_currency 주문 통화 (코인)
   * @param payment_currency 결제 통화 (마켓) 입력값 : KRW 혹은 BTC
   */
  async postTicker(
    order_currency: string = 'DVI',
    payment_currency: string = 'KRW',
  ): Promise<any> {
    const res = await this.xCoinAPI.xcoinApiCall(Method.Post, '/info/ticker', {
      order_currency,
      payment_currency,
    });
    return res;
  }

  /**
   * 거래 주문내역 조회
   * 회원의 매수/매도 등록 대기 또는 거래 중 내역 정보를 제공합니다.
   * @param order_id 매수/매도 주문 등록된 주문번호 (입력 시 해당 데이터만 추출)
   * @param type 거래유형 (bid : 매수 ask : 매도)
   * @param count 1~1000 (기본값 : 100)
   * @param after 입력한 시간보다 나중의 데이터 추출 YYYY-MM-DD hh:mm:ss 의 UNIX Timestamp (2014-11-28 16:40:01 = 1417160401000)
   * @param order_currency 주문 통화 (코인)
   * @param payment_currency 결제 통화 (마켓) 입력값 : KRW 혹은 BTC
   */
  async postOrders(
    order_id: string,
    type: string,
    count: number,
    after: number,
    order_currency: string,
    payment_currency: string,
  ): Promise<any> {
    const res = await this.xCoinAPI.xcoinApiCall(Method.Post, '/info/orders', {
      order_id,
      type,
      count,
      after,
      order_currency,
      payment_currency,
    });
    return res;
  }

  /**
   * 거래 주문내역 상세 조회
   * 회원의 매수/매도 체결 내역 상세 정보를 제공합니다.
   * @param order_id 매수/매도 주문 등록된 주문번호 (입력 시 해당 데이터만 추출)
   * @param order_currency 주문 통화 (코인)
   * @param payment_currency 결제 통화 (마켓) 입력값 : KRW 혹은 BTC
   */
  async postOrderDetail(
    order_id: string,
    order_currency: string,
    payment_currency: string,
  ): Promise<any> {
    const res = await this.xCoinAPI.xcoinApiCall(
      Method.Post,
      '/info/order_detail',
      {
        order_id,
        order_currency,
        payment_currency,
      },
    );
    return res;
  }

  /**
   * 거래 체결내역 조회
   * 회원의 거래 완료 내역 정보를 제공합니다.
   * @param offset 0~ (기본값 : 0)
   * @param count 1~50 (기본값 : 20)
   * @param searchGb 0 : 전체, 1 : 매수 완료, 2 : 매도 완료, 3 : 출금 중 4 : 입금, 5 : 출금, 9 : KRW 입금 중
   * @param order_currency 주문 통화 (코인)
   * @param payment_currency 결제 통화 (마켓) 입력값 : KRW 혹은 BTC
   */
  async postUserTransactions(
    offset: number = 0,
    count: number = 10,
    searchGb: number = 0,
    order_currency: string = "DVI",
    payment_currency: string = "KRW",
  ): Promise<any> {
    const res = await this.xCoinAPI.xcoinApiCall(
      Method.Post,
      '/info/user_transactions',
      {
        offset,
        count,
        searchGb,
        order_currency,
        payment_currency,
      },
    );
    return res;
  }
  //#endregion

  //#region PRIVATE API (TRADE)
  /**
   * 지정가 주문하기
   * 지정가 매수/매도 등록 기능을 제공합니다.
   * @param order_currency 주문 통화 (코인)
   * @param payment_currency 결제 통화 (마켓) 입력값 : KRW 혹은 BTC
   * @param units 주문 수량 [최대 주문 금액] 50억 원
   * @param price Currency 거래가
   * @param type 거래유형 (bid : 매수 ask : 매도)
   */
  async postTradePlace(
    order_currency: string,
    payment_currency: string,
    units: number,
    price: number,
    type: string,
  ): Promise<any> {
    const res = await this.xCoinAPI.xcoinApiCall(Method.Post, '/trade/place', {
      order_currency,
      payment_currency,
      units,
      price,
      type,
    });
    return res;
  }

  /**
   * 시장가 매수하기
   * 시장가 매수 기능을 제공합니다.
   * @param units 코인 매수 수량 [최대 주문 금액] 10억 원
   * @param order_currency 주문 통화 (코인)
   * @param payment_currency 결제 통화 (마켓) 입력값 : KRW 혹은 BTC
   */
  async postTradeMarketBuy(
    units: number,
    order_currency: string = "DVI",
    payment_currency: string = "KRW",
  ): Promise<any> {
    const res = await this.xCoinAPI.xcoinApiCall(
      Method.Post,
      '/trade/market_buy',
      {
        units,
        order_currency,
        payment_currency,
      },
    );
    return res;
  }

  /**
   * 시장가 매도하기
   * 시장가 매도 기능을 제공합니다.
   * @param units 코인 매도 수량 [최대 주문 금액] 10억 원
   * @param order_currency 주문 통화 (코인)
   * @param payment_currency 결제 통화 (마켓) 입력값 : KRW 혹은 BTC
   */
  async postTradeMarketSell(
    units: number,
    order_currency: string = "DVI",
    payment_currency: string = "KRW",
  ): Promise<any> {
    const res = await this.xCoinAPI.xcoinApiCall(
      Method.Post,
      '/trade/market_sell',
      {
        units,
        order_currency,
        payment_currency,
      },
    );
    return res;
  }

  /**
   * 자동 주문하기
   * 자동주문 매수 / 매도 등록 기능을 제공합니다.
   * @param order_currency 주문 통화 (코인)
   * @param payment_currency 결제 통화 (마켓) 입력값 : KRW 혹은 BTC
   * @param watch_price 주문 접수가 진행되는 가격 (자동주문시)
   * @param price Currency 거래가
   * @param units 주문 수량 [최대 주문 금액] 50억 원
   * @param type 주문 요청 구분 (bid : 매수 ask : 매도)
   */
  async postTradeStopLimit(
    order_currency: string,
    payment_currency: string,
    watch_price: number,
    price: number,
    units: number,
    type: string,
  ): Promise<any> {
    const res = await this.xCoinAPI.xcoinApiCall(
      Method.Post,
      '/trade/stop_limit',
      {
        order_currency,
        payment_currency,
        watch_price,
        price,
        units,
        type,
      },
    );
    return res;
  }

  /**
   * 주문 취소하기
   * 등록된 매수/매도 주문 취소 기능을 제공합니다.
   * 주문 취소 결과에 따른 취소 완료 개수는 [거래 주문내역 상세 조회]를 통해 확인할 수 있습니다.
   * @param type 거래유형 (bid : 매수 ask : 매도)
   * @param order_id 매수/매도 주문 등록된 주문번호
   * @param order_currency 주문 통화 (코인)
   * @param payment_currency 결제 통화 (마켓) 입력값 : KRW 혹은 BTC
   */
  async postTradeCancel(
    type: string,
    order_id: String,
    order_currency: string,
    payment_currency: string,
  ): Promise<any> {
    const res = await this.xCoinAPI.xcoinApiCall(Method.Post, '/trade/cancel', {
      type,
      order_id,
      order_currency,
      payment_currency,
    });
    return res;
  }
  //#endregion
}
