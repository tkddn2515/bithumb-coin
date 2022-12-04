export class InfoTicketDTO {
  // 결과 상태 코드 (정상: 0000, 그 외 에러 코드 참조)	String
  status: String;
  // 주문 통화 (코인)	String
  order_currency: String;
  // 결제 통화 (마켓)	String
  payment_currency: String;
  // 회원 시작 거래가 (최근 24시간)	Number (String)
  opening_price: Number;
  // 회원 마지막 거래가 (최근 24시간)	Number (String)
  closing_price: Number;
  // 회원 최저 거래가 (최근 24시간)	Number (String)
  min_price: Number;
  // 회원 최고 거래가 (최근 24시간)	Number (String)
  max_price: Number;
  // 평균가 (최근 24시간)	Number (String)
  average_price: Number;
  // 거래량 (최근 24시간)	Number (String)
  units_traded: Number;
  // Currency 거래량 (최근 1일)	Number (String)
  volume_1day: Number;
  // Currency 거래량 (최근 7일)	Number (String)
  volume_7day: Number;
  // 최근 24시간 변동가	Number (String)
  fluctate_24H: Number;
  // 최근 24시간 변동률	Number (String)
  fluctate_rate_24H: Number;
  // 타임 스탬프	Integer(String)
  Date: Number;
}
