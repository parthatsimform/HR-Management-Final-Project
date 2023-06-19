export const useDuration = () => {
    function calculateDuration(startDate: string|Date, endDate: string|Date): number[] {
        const start : Date = new Date(startDate);
        const end : Date = new Date(endDate);
        let years :number = end.getUTCFullYear() - start.getUTCFullYear();
        let months :number = end.getUTCMonth() - start.getUTCMonth();
        let days :number = end.getUTCDate() - start.getUTCDate();
        if (months < 0 || (months === 0 && days < 0)) {
          years--;
          months += 12;
        }
        if (days < 0) {
          var lastMonth = new Date(end.getUTCFullYear(), end.getUTCMonth() - 1, 0);
          days += lastMonth.getUTCDate();
          months--;
        }
        return [years, months, days];
      }
      return {calculateDuration}

}