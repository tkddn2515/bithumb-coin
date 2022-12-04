export class BtciDTO {
  // 결과 상태 코드 (정상: 0000, 그 외 에러 코드 참조) String
  status: String;
  // Bithumb Altcoin Market Index Array[Object]
  btai: object;
  // Bithumb Market Index Array[Object]
  btmi: object;
  // 시장 기준 지수 String
  market_index: String;
  // 등락폭 String
  width: String;
  // 등락률 String
  rate: String;
  // 타임 스탬프 Integer(String)
  date: Number;
}
