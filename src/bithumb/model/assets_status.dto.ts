export class AssetsStatus {
  // 결과 상태 코드 (정상: 0000, 그 외 에러 코드 참조)	String
  status: String;
  // 입금 가능 여부 (1:입금가능 / 0:입금불가)	Integer
  deposit_status: Number;
  // 출금 가능 여부 (1:출금가능 / 0:출금불가)	Integer
  withdrawal_status: Number;
}
