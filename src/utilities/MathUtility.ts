
class MathUtility {
    public static readonly calculatePercentage = (value: number, limit: number): number => {
        const percentage = Math.ceil(value * 100 / limit);
        return percentage;
      }
}

export default MathUtility;