export class InfoORderDetailDTO {
  // 결과 상태 코드 (정상: 0000, 그 외 에러 코드 참조)	String
  status: String;
  // 주문요청 시간 타임 스탬프	Integer(String)
  order_date: Number;
  // 주문 요청 구분 (bid : 매수 ask : 매도)	String
  type: String;
  // 주문 상태	String
  order_status: String;
  // 주문 통화 (코인)	String
  order_currency: String;
  // 결제 통화 (마켓)	String
  payment_currency: String;
  // 주문 접수가 진행된 가격 (자동주문시)	String
  watch_price: String;
  // 주문요청 호가	Number(String)
  order_price: Number;
  // 주문요청 수량	Number(String)
  order_qty: Number;
  // 취소 일자 타임스탬프	Integer(String)
  cancel_date: Number;
  // 취소 유형	String
  cancel_type: String;
  // 해당주문 체결정보	Array[Object]
  contract: Object;
  // 거래 체결 시간 타임 스탬프(YYYY-MM-DD HH:MM:SS)	Integer(String)
  transaction_date: Number;
  // 1Currency당 체결가	Number (String)
  price: Number;
  // 거래수량	Number (String)
  units: Number;
  // 수수료 통화	String
  fee_currency: String;
  // 거래 수수료	Number (String)
  fee: Number;
  // 체결 금액	Number (String)
  total: Number;
}
