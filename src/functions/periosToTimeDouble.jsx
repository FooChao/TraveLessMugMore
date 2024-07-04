const timeSlots = [
    'Monday, 0800-1000', 'Monday, 0900-1100', 'Monday, 1000-1200', 'Monday, 1100-1300', 'Monday, 1200-1400',
    'Monday, 1300-1500', 'Monday, 1400-1600', 'Monday, 1500-1700', 'Monday, 1600-1800', 'Monday, 1700-1900',
    'Monday, 1800-2000', 'Monday, 1900-2100', 'Monday, 2000-2200',
    'Tuesday, 0800-1000', 'Tuesday, 0900-1100', 'Tuesday, 1000-1200', 'Tuesday, 1100-1300', 'Tuesday, 1200-1400',
    'Tuesday, 1300-1500', 'Tuesday, 1400-1600', 'Tuesday, 1500-1700', 'Tuesday, 1600-1800', 'Tuesday, 1700-1900',
    'Tuesday, 1800-2000', 'Tuesday, 1900-2100', 'Tuesday, 2000-2200',
    'Wednesday, 0800-1000', 'Wednesday, 0900-1100', 'Wednesday, 1000-1200', 'Wednesday, 1100-1300', 'Wednesday, 1200-1400',
    'Wednesday, 1300-1500', 'Wednesday, 1400-1600', 'Wednesday, 1500-1700', 'Wednesday, 1600-1800', 'Wednesday, 1700-1900',
    'Wednesday, 1800-2000', 'Wednesday, 1900-2100', 'Wednesday, 2000-2200',
    'Thursday, 0800-1000', 'Thursday, 0900-1100', 'Thursday, 1000-1200', 'Thursday, 1100-1300', 'Thursday, 1200-1400',
    'Thursday, 1300-1500', 'Thursday, 1400-1600', 'Thursday, 1500-1700', 'Thursday, 1600-1800', 'Thursday, 1700-1900',
    'Thursday, 1800-2000', 'Thursday, 1900-2100', 'Thursday, 2000-2200',
    'Friday, 0800-1000', 'Friday, 0900-1100', 'Friday, 1000-1200', 'Friday, 1100-1300', 'Friday, 1200-1400',
    'Friday, 1300-1500', 'Friday, 1400-1600', 'Friday, 1500-1700', 'Friday, 1600-1800', 'Friday, 1700-1900',
    'Friday, 1800-2000', 'Friday, 1900-2100', 'Friday, 2000-2200'
  ];
  
  const periodToTimeDouble = (period) => {
    return (
      timeSlots[period]
    )
  }
  
  export default periodToTimeDouble;
  
