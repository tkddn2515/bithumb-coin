export class TicketsDTO {
  /** 결과 상태 코드 (정상: 0000, 그 외 에러 코드 참조) */
  status: String;
  /** 데이터 */
  data: Ticket[];
  /** 타임 스탬프 */
  date: Number;
}

export class TicketDTO {
  /** 결과 상태 코드 (정상: 0000, 그 외 에러 코드 참조) */
  status: String;
  /** 데이터 */
  data: Ticket;
  /** 타임 스탬프 */
  date: Number;
}

class Ticket {
  /** 시가 00시 기준 */
  opening_price: Number;
  /** 종가 00시 기준 */
  closing_price: Number;
  /** 저가 00시 기준 */
  min_price: Number;
  /** 고가 00시 기준 */
  max_price: Number;
  /** 거래량 00시 기준 */
  units_traded: Number;
  /** 거래금액 00시 기준 */
  acc_trade_value: Number;
  /** 전일종가 */
  prev_closing_price: Number;
  /** 최근 24시간 거래량 */
  units_traded_24H: Number;
  /** 최근 24시간 거래금액 */
  acc_trade_value_24H: Number;
  /** 최근 24시간 변동가 */
  fluctate_24H: Number;
  /** 최근 24시간 변동률 */
  fluctate_rate_24H: Number;
}
