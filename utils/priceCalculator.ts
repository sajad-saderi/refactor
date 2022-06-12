export default class PriceCalculator {
  dailyPrice: number;
  constructor(carWorth: number) {
    this.dailyPrice =
      Math.ceil(
        (carWorth < 200000000
          ? carWorth * 0.0022
          : carWorth <= 400000000
          ? carWorth * 0.0019
          : carWorth * 0.0015) / 10
      ) * 10;
  }
  getDailyPrice() {
    return { dailyPrice: this.dailyPrice };
  }
  getWeeklyPrice() {
    return { weeklyPrice: this.dailyPrice * 7 };
  }
  getMonthlyPrice() {
    return { monthlyPrice: this.dailyPrice * 30 };
  }
}
