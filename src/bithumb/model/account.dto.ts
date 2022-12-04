export class AccountDTO {
  // 결과 상태 코드 (정상: 0000, 그 외 에러 코드 참조)	String
  status: String;
  // 회원가입 일시 타임 스탬프	Integer
  created: Number;
  // 회원 ID	String
  account_id: String;
  // 주문 통화 (코인)	String
  order_currency: String;
  // 결제 통화 (마켓)	String
  payment_currency: String;
  // 거래 수수료율	Number (String)
  trade_fee: Number;
  // 주문 가능 수량	Number (String)
  balance: Number;
}
