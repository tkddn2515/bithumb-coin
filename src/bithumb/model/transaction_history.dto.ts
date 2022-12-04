export class TransactionHistoryDTO {
  // 결과 상태 코드 (정상: 0000, 그 외 에러 코드 참조) String
  status: String;
  // 거래 체결 시간 타임 스탬프 (YYYY-MM-DD HH:MM:SS) Integer (String)
  transaction_date: Number;
  // 거래 유형 bid : 매수 ask : 매도 String
  type: String;
  // Currency 거래량 Number (String)
  units_traded: Number;
  // Currency 거래가 Number (String)
  price: Number;
  // 총 거래 금액 Number (String)
  total: Number;
}
