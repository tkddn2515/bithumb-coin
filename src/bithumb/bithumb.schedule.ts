import { Injectable } from '@nestjs/common';
import { Cron, Interval } from '@nestjs/schedule';
import { BithumbService } from './bithumb.service';

@Injectable()
export class BithumbSchedule {
  constructor(private readonly bithumbServece: BithumbService) { 
    this.maxPrice = 25.05;
    this.handleInterval();
  }

  @Interval('getBithumbAllCurrencyData', 1000)
  async handleInterval() {
    await this.main();
  }

  /** 최고가 */
  maxPrice: number;

  async main(order_currency = "DVI") {
    // dvi 현재가 받아오기
    const order = await this.bithumbServece.getTickerOrder(order_currency);
    const nowPrice = order["data"]["closing_price"];
    console.log("nowPrice", nowPrice, "maxPrice", this.maxPrice);
    if(nowPrice == undefined) {
      return;
    }
    if(this.maxPrice == undefined) {
      this.maxPrice = nowPrice;
      return;
    } 

    // 현재 dvi 보유 수량 가져오기
    const balance = await this.bithumbServece.postBalance(order_currency);
    const totalKRW = balance["data"]["total_krw"];
    const totalToken = balance["data"][`total_${order_currency.toLowerCase()}`];
    console.log("totalKRW", totalKRW, "totalToken", totalToken);
    
    if(nowPrice > this.maxPrice) { // 현재가가 이전 최대가보다 높을 시
      const prevmax = this.maxPrice;
      // 만약 2퍼 이상 상승했을때 매수가 안되어있으면 매수
      const percent = (nowPrice - prevmax) * 100 / this.maxPrice;
      if(percent > 2) { // 매수가 안되어있으면 매수
        this.maxPrice = nowPrice;
        if(totalToken == 0) {
          const units = Math.ceil((totalKRW / nowPrice));
          console.log(`${nowPrice} krw에 ${units}개 매수 시도`);
          await this.bithumbServece.postTradeMarketBuy(units);
          console.log(`${nowPrice} krw에 ${units}개 매수`);
        }
      }
    } else { // 현재가가 이전 최대가보다 낮을 시
      // 만약 3퍼 이상으로 떨어졌다면 매도
      const percent = (this.maxPrice - nowPrice) * 100 / this.maxPrice;
      if(percent > 3) {
        this.maxPrice = nowPrice;
        if(totalToken > 0) {
          console.log(`${nowPrice} krw에 ${totalToken}개 매도 시도`);
          await this.bithumbServece.postTradeMarketSell(totalToken);
          console.log(`${nowPrice} krw에 ${totalToken}개 매도`);
        }
      }
    }
    
  }
}
