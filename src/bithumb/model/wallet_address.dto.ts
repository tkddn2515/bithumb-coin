export class WalletAddressDTO {
  // 결과 상태 코드 (정상: 0000, 그 외 에러 코드 참조)	String
  status: String;
  // 가상자산 지갑 주소	String
  wallet_address: String;
  // Request Parameters 데이터와 동일	String
  currency: String;
}
