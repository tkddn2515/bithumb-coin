export class UserTransactionDTO {
  // 결과 상태 코드 (정상: 0000, 그 외 에러 코드 참조)	String
  status: String;
  // 검색 구분 (0 : 전체, 1 : 매수 완료, 2 : 매도 완료, 3 : 출금 중 4 : 입금, 5 : 출금, 9 : KRW 입금 중)	Number (String)
  search: Number;
  // 거래 일시 타임 스탬프 YYYY-MM-DD HH:MM:SS	Integer
  transfer_date: Number;
  // 주문 통화 (코인)	String
  order_currency: String;
  // 결제 통화 (마켓)	String
  payment_currency: String;
  // 거래요청 Currency 수량	String
  units: String;
  // 1Currency당 가격	Number (String)
  price: Number;
  // 거래 금액	Number (String)
  amount: Number;
  // 수수료 통화	String
  fee_currency: String;
  // 거래 수수료	Number (String)
  fee: Number;
  // 주문 통화 잔액	Number (String)
  order_balance: Number;
  // 결제 통화 잔액	Number (String)
  payment_balance: Number;
}
