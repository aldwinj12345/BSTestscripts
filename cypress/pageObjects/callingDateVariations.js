/// <reference types="cypress" />

class GetCurrentDate
{
    TodayDateDDMMYYYY(){
        const currentDate = new Date();
        const day = currentDate.getDate();
  
        // Use the 'short' option to get the abbreviated month
        const month = currentDate.toLocaleString('en-US', { month: 'short' });
  
        const year = currentDate.getFullYear();
  
        const formattedDate = `${day} ${month} ${year}`;
        return formattedDate;
    }
    TodayDateDDMMYYYYNoSpaceInBetween(){
        const currentDate = new Date();
        const day = currentDate.getDate();
  
        // Use the 'short' option to get the abbreviated month
        const month = currentDate.toLocaleString('en-US', { month: 'short' });
  
        const year = currentDate.getFullYear();
  
        const formattedDate = `${day}${month}${year}`;
        return formattedDate;
    }
    TodayDateDDMMYYYYPlus5days() {
        const currentDate = new Date();
        const day = currentDate.getDate() + 5; // Add 5 days to the current day
  
        // Use the 'short' option to get the abbreviated month
        const month = currentDate.toLocaleString('en-US', { month: 'short' });
  
        const year = currentDate.getFullYear();
  
        const formattedDate = `${day} ${month} ${year}`;
        return formattedDate;
    }
    TodayDateMMDDYYYY(){
        const currentDate = new Date();
        const day = currentDate.getDate(); // Add 5 days to the current day
  
        // Use the 'short' option to get the abbreviated month
        const month = currentDate.toLocaleString('en-US', { month: 'short' });
  
        const year = currentDate.getFullYear();
  
        const formattedDate = `${month} ${day}, ${year}`;
        return formattedDate;
    }
    TodayDateYYYYMMDDWithDashandAddZeroIfNeeded(){
        const currentDate = new Date();
        const month = currentDate.getMonth() + 1; // Get the current month (adding 1 because months are zero-indexed)
        const day = currentDate.getDate(); // Get the current day
        const year = currentDate.getFullYear(); // Get the current year
  
        // Function to add leading zero if needed
        function addLeadingZero(value) {
            return value < 10 ? `0${value}` : value;
        }
  
        // Format month, day, and year with leading zeros if necessary
        const formattedMonth = addLeadingZero(month);
        const formattedDay = addLeadingZero(day);
  
        const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;
        return formattedDate;
    }
    TodayDateMMDDYYYY_MonthisinWholeWordandDayiswithTH()
      {
        const currentDate = new Date();
        const day = currentDate.getDate(); // Get the current day
        const monthIndex = currentDate.getMonth(); // Get the current month index (0-11)
        const year = currentDate.getFullYear(); // Get the current year
  
        // Array of month names
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June', 'July',
            'August', 'September', 'October', 'November', 'December'
        ];
  
        // Get the month name based on the month index
        const month = monthNames[monthIndex];
  
        // Function to add suffix to the day
        function getDayWithSuffix(day) {
            if (day >= 11 && day <= 13) {
                return `${day}th`;
            } else {
                const suffixes = { '1': 'st', '2': 'nd', '3': 'rd' };
                const lastDigit = day.toString().slice(-1);
                return `${day}${suffixes[lastDigit] || 'th'}`;
            }
        }
  
        const formattedDay = getDayWithSuffix(day);
  
        const formattedDate = `${month} ${formattedDay} ${year}`;
        return formattedDate;
    }
    TodayDateMMDDYYYY_ShortMonthWord_NoTHonDate(){
        const currentDate = new Date();
        const day = currentDate.getDate(); // Get the current day
        const year = currentDate.getFullYear(); // Get the current year
        const month = currentDate.toLocaleString('en-US', { month: 'short' });
  
        // Function to remove suffix from the day
        function getDayWithoutSuffix(day) {
            return day.toString();
        }
  
        const formattedDay = getDayWithoutSuffix(day);
  
        const formattedDate = `${month} ${formattedDay}, ${year}`;
        return formattedDate;
    }
}
export default GetCurrentDate;