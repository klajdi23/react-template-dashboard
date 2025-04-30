import moment from 'moment';
export const dateFormatter = (date: Date): string => {
   return  date?.toLocaleDateString('en-us', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  })
  };
/*
date format : "DD MMM YYYY hh:mm A"
*/
export const formatDateTime = (date: Date |null) =>{
   return moment(date).format("DD MMM YYYY hh:mm A");
}

/*
   date format: "DD MMM YYYY"
*/
export const formatDate = (date: Date | null) =>{
   return moment(date).format("DD MMM YYYY");
}
export const customDateFormatter = (date: Date | null, format: string ) => {  
   return moment(date).format(format ?? "DD MMM YYYY");

}
export const formatDateUri = (date: Date | null) =>{
    return moment(date).format("YYYY-MM-DD");
}

///yyyy-mm-dd
export const formatDateToString = (date: Date | null) => {
   if(!date) return null;
   
   var d = new Date(date),
       month = '' + (d.getMonth() + 1),
       day = '' + d.getDate(),
       year = d.getFullYear();

   if (month.length < 2) 
       month = '0' + month;
   if (day.length < 2) 
       day = '0' + day;

   return [year, month, day].join('-');
}