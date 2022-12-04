export class OrderBookDTO {
    // 	결과 상태 코드 (정상: 0000, 그 외 에러 코드 참조)
  status: String;
  // 타임 스탬프 Integer(String)
  timestamp: Number;
  // 주문 통화 (코인)
  order_currency: String;
  // 결제 통화 (마켓)
  payment_currency: String;
  // 매수 요청 내역
  bids: any;
  // 매도 요청 내역
  asks: any;
  // Currency 수량Number (String)
  quantity: Number;
  //Currency 거래가	Number (String)
  price: Number;
}