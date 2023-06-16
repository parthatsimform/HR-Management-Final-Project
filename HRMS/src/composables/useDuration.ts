export const useDuration = () => {
    function calculateDuration(startDate: string, endDate: string): number[] {
        var start = new Date(startDate);
        var end = new Date(endDate);
        var years = end.getUTCFullYear() - start.getUTCFullYear();
        var months = end.getUTCMonth() - start.getUTCMonth();
        var days = end.getUTCDate() - start.getUTCDate();
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