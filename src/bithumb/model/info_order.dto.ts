export class InfoOrderDTO {
    // 	결과 상태 코드 (정상: 0000, 그 외 에러 코드 참조)	String
    status: String;
    // 	주문 통화 (코인)	String
    order_currency: String;
    // 	결제 통화 (마켓)	String
    payment_currency: String;
    // 	매수/매도 주문 등록된 주문번호	String
    order_id: String;
    // 	주문일시 타임 스탬프	Integer
    order_date: Number;
    // 	주문 요청 구분 (bid : 매수 ask : 매도)	String
    type: String;
    // 	주문 접수가 진행되는 가격 (자동주문시)	String
    watch_price: String;
    // 	거래요청 Currency	String
    units: String;
    // 	주문 체결 잔액	Number (String)
    units_remaining: Number;
    // 	1Currency당 주문 가격	Number (String)
    price: Number;
}